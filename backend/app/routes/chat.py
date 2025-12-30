from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta

from app.schemas.chat import ChatRequest, ChatResponse
from app.core.session import get_or_create_session, sessions
from app.core.config import SESSION_EXPIRY_DAYS

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    session = get_or_create_session(req.session_id)

    if not session:
        raise HTTPException(status_code=410, detail="Session expired")

    try:
        reply = session["chat_instance"].get_rag_response(req.message)
        expires_at = session["created_at"] + timedelta(days=SESSION_EXPIRY_DAYS)

        return ChatResponse(
            reply=reply,
            session_expires_at=expires_at.isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
