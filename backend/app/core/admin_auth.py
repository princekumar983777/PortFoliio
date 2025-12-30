from datetime import datetime, timedelta
from typing import Optional
from fastapi import Request

from app.core.config import (
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_SESSION_TTL_MINUTES
)

ADMIN_COOKIE = "admin_session"


def authenticate(username: str, password: str) -> bool:
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD


def create_admin_session(response):
    expiry = datetime.utcnow() + timedelta(minutes=ADMIN_SESSION_TTL_MINUTES)
    response.set_cookie(
        ADMIN_COOKIE,
        value=expiry.isoformat(),
        httponly=True
    )


def is_admin_logged_in(request: Request) -> bool:
    cookie = request.cookies.get(ADMIN_COOKIE)
    if not cookie:
        return False

    try:
        expiry = datetime.fromisoformat(cookie)
        return datetime.utcnow() < expiry
    except Exception:
        return False
