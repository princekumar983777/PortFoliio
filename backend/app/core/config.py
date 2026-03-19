from pathlib import Path
from dotenv import dotenv_values

APP_NAME = "RAG Chat Backend"
SESSION_EXPIRY_MINUTES = 30
SESSION_EXPIRY_DAYS = 1

_ENV_PATH = Path(__file__).resolve().parents[2] / ".env"
_ENV = dotenv_values(_ENV_PATH) if _ENV_PATH.exists() else {}

def _get(key: str, default=None):
    val = _ENV.get(key)
    return default if val in (None, "") else val

HOST = _get("HOST", "127.0.0.1")
PORT = int(_get("PORT", 8000))

PINECONE_API_KEY = _get("PINECONE_API_KEY")
PINECONE_INDEX_NAME = _get("PINECONE_INDEX_NAME")

GEMINI_API_KEY_1 = _get("GEMINI_API_KEY_1")
GEMINI_API_KEY_2 = _get("GEMINI_API_KEY_2")

UPDATE_EMBEDDINGS_PASSWORD = _get("UPDATE_EMBEDDINGS_PASSWORD")

ADMIN_USERNAME = _get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = _get("ADMIN_PASSWORD", "password")
ADMIN_SESSION_TTL_MINUTES = int(_get("ADMIN_SESSION_TTL_MINUTES", 30))