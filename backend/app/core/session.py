import time
import threading
from datetime import datetime, timedelta
from typing import Dict, Any

from app.core.config import SESSION_EXPIRY_DAYS
from app.utils.genai import OptimizedRAGChat
from app.db.load_vectorstore import vectorstore

sessions: Dict[str, Dict[str, Any]] = {}
session_lock = threading.Lock()


def get_or_create_session(session_id: str):
    current_time = datetime.now()

    with session_lock:
        if session_id in sessions:
            created_at = sessions[session_id]["created_at"]
            if current_time - created_at > timedelta(days=SESSION_EXPIRY_DAYS):
                del sessions[session_id]
                return None
        else:
            sessions[session_id] = {
                "created_at": current_time,
                "chat_instance": OptimizedRAGChat(vectorstore)
            }

        return sessions[session_id]


def cleanup_expired_sessions():
    now = datetime.now()
    expired = []

    with session_lock:
        for sid, data in sessions.items():
            if now - data["created_at"] > timedelta(days=SESSION_EXPIRY_DAYS):
                expired.append(sid)

        for sid in expired:
            del sessions[sid]


def cleanup_loop():
    while True:
        cleanup_expired_sessions()
        time.sleep(3600)
