from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta

from app.core.session import sessions
from app.core.config import SESSION_EXPIRY_DAYS

router = APIRouter(prefix="/session", tags=["Session"])


@router.get("/{session_id}")
def get_session_info(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    data = sessions[session_id]
    expires_at = data["created_at"] + timedelta(days=SESSION_EXPIRY_DAYS)

    return {
        "session_id": session_id,
        "created_at": data["created_at"],
        "expires_at": expires_at,
        "is_expired": datetime.now() > expires_at
    }


@router.delete("/{session_id}")
def delete_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    del sessions[session_id]
    return {"message": "Session deleted"}
