from fastapi import APIRouter
from datetime import datetime
from app.core.session import sessions

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "active_sessions": len(sessions)
    }
