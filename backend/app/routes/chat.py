from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta

from app.schemas.chat import ChatRequest, ChatResponse
from app.core.session import get_or_create_session, add_message
from app.core.config import SESSION_EXPIRY_MINUTES

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.options("", status_code=200)
def chat_options():
    """Handle CORS preflight requests for chat endpoint."""
    return {"message": "OK"}


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    # Validate session (middleware-like validation)
    session = get_or_create_session(req.session_id)
    if not session:
        raise HTTPException(status_code=410, detail="Session expired")

    try:
        # Add user message to history
        add_message(req.session_id, "user", req.message)
        
        # Get response from chat instance, passing conversation history for better RAG
        reply = session["chat_instance"].get_rag_response(req.message, session["messages"])
        
        # Add assistant response to history
        add_message(req.session_id, "assistant", reply)
        
        # Calculate expiry time
        expires_at = session["last_activity"] + timedelta(minutes=SESSION_EXPIRY_MINUTES)

        return ChatResponse(
            reply=reply,
            session_expires_at=expires_at.isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
