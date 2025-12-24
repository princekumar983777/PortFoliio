import os
import time
import threading
from datetime import datetime, timedelta
from typing import Dict, Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

from app.utils.genai import OptimizedRAGChat

# =====================================================
# ENV & CONFIG
# =====================================================

load_dotenv()

APP_NAME = "RAG Chat Backend"
SESSION_EXPIRY_DAYS = 1
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "127.0.0.1")

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

# =====================================================
# VECTOR STORE SETUP
# =====================================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

pc = Pinecone(api_key=PINECONE_API_KEY)

vectorstore = PineconeVectorStore(
    embedding=embeddings,
    index_name=PINECONE_INDEX_NAME
)

# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(title=APP_NAME)

# =====================================================
# SESSION STORE
# =====================================================

sessions: Dict[str, Dict[str, Any]] = {}
session_lock = threading.Lock()

# =====================================================
# SCHEMAS
# =====================================================

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    session_expires_at: str


# =====================================================
# SESSION CLEANUP
# =====================================================

def cleanup_expired_sessions():
    current_time = datetime.now()
    expired = []

    with session_lock:
        for session_id, data in sessions.items():
            if current_time - data["created_at"] > timedelta(days=SESSION_EXPIRY_DAYS):
                expired.append(session_id)

        for sid in expired:
            del sessions[sid]

    if expired:
        print(f"[CLEANUP] Removed {len(expired)} expired sessions")


def cleanup_loop():
    while True:
        cleanup_expired_sessions()
        time.sleep(3600)  # every hour


# =====================================================
# APP EVENTS
# =====================================================

@app.on_event("startup")
def on_startup():
    threading.Thread(target=cleanup_loop, daemon=True).start()

    base_url = f"http://{HOST}:{PORT}"

    print("\n" + "=" * 50)
    print(f"🚀 {APP_NAME} STARTED")
    print("=" * 50)
    print(f"📍 Base URL     : {base_url}")
    print(f"💬 Chat API     : {base_url}/chat")
    print(f"❤️ Health Check : {base_url}/health")
    print(f"📦 Sessions TTL : {SESSION_EXPIRY_DAYS} day(s)")
    print("=" * 50 + "\n")


@app.on_event("shutdown")
def on_shutdown():
    print("🛑 Backend shutting down...")


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "active_sessions": len(sessions)
    }


# =====================================================
# CHAT ENDPOINT
# =====================================================

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    current_time = datetime.now()

    with session_lock:
        if req.session_id in sessions:
            created_at = sessions[req.session_id]["created_at"]
            if current_time - created_at > timedelta(days=SESSION_EXPIRY_DAYS):
                del sessions[req.session_id]
                raise HTTPException(
                    status_code=410,
                    detail="Session expired"
                )
        else:
            sessions[req.session_id] = {
                "created_at": current_time,
                "chat_instance": OptimizedRAGChat(vectorstore)
            }

        chat_instance = sessions[req.session_id]["chat_instance"]

    try:
        response_text = chat_instance.get_rag_response(req.message)
        expires_at = sessions[req.session_id]["created_at"] + timedelta(days=SESSION_EXPIRY_DAYS)

        return ChatResponse(
            reply=response_text,
            session_expires_at=expires_at.isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =====================================================
# SESSION UTILITIES
# =====================================================

@app.get("/session/{session_id}")
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


@app.delete("/session/{session_id}")
def delete_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    del sessions[session_id]
    return {"message": "Session deleted"}


@app.post("/sessions/cleanup")
def manual_cleanup():
    cleanup_expired_sessions()
    return {"message": "Cleanup completed"}
