import time
import threading
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional

from app.core.config import SESSION_EXPIRY_MINUTES
from app.db.load_vectorstore import get_vectorstore, get_vectorstore_init_error

# In-memory session store (replace with Redis later)
# To use Redis: import redis; redis_client = redis.Redis(); sessions = redis_client
sessions: Dict[str, Dict[str, Any]] = {}
session_lock = threading.Lock()


def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    """Retrieve a session if it exists and hasn't expired."""
    with session_lock:
        if session_id not in sessions:
            return None
        session = sessions[session_id]
        if datetime.now() - session["last_activity"] > timedelta(minutes=SESSION_EXPIRY_MINUTES):
            del sessions[session_id]
            return None
        return session


def create_session(session_id: str) -> Dict[str, Any]:
    """Create a new session with initialized chat instance and empty messages."""
    vectorstore = get_vectorstore()
    
    session = {
        "created_at": datetime.now(),
        "last_activity": datetime.now(),
        "chat_instance": None,  # Will be set below
        "messages": []  # List of {"role": "user"|"assistant", "content": str}
    }
    
    if vectorstore is None:
        # Fallback: create a simple chat instance that doesn't use vectorstore
        try:
            from app.utils.simple_chat import SimpleChat
            session["chat_instance"] = SimpleChat()
        except Exception as e:
            raise RuntimeError(f"Vectorstore not configured and fallback chat failed: {e}")
    else:
        try:
            from app.utils.genai import OptimizedRAGChat
            session["chat_instance"] = OptimizedRAGChat(vectorstore)
        except Exception as e:
            raise RuntimeError(
                "LLM client not installed. Install optional deps (e.g. google-genai) to use /chat."
            ) from e
    
    with session_lock:
        sessions[session_id] = session
    return session
    with session_lock:
        sessions[session_id] = session
    return session


def add_message(session_id: str, role: str, content: str):
    """Add a message to the session's conversation history."""
    with session_lock:
        if session_id in sessions:
            sessions[session_id]["messages"].append({"role": role, "content": content})
            sessions[session_id]["last_activity"] = datetime.now()


def get_or_create_session(session_id: str) -> Optional[Dict[str, Any]]:
    """Get existing session or create new one. Updates last_activity."""
    session = get_session(session_id)
    if session:
        session["last_activity"] = datetime.now()
        return session
    else:
        return create_session(session_id)


def cleanup_expired_sessions():
    now = datetime.now()
    expired = []

    with session_lock:
        for sid, data in sessions.items():
            if now - data["last_activity"] > timedelta(minutes=SESSION_EXPIRY_MINUTES):
                expired.append(sid)

        for sid in expired:
            del sessions[sid]


def cleanup_loop():
    while True:
        cleanup_expired_sessions()
        time.sleep(300)  # Check every 5 minutes
