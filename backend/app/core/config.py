import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "RAG Chat Backend"
SESSION_EXPIRY_DAYS = 1

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8000))

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

UPDATE_EMBEDDINGS_PASSWORD = os.getenv("UPDATE_EMBEDDINGS_PASSWORD")


ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "password")
ADMIN_SESSION_TTL_MINUTES = int(os.getenv("ADMIN_SESSION_TTL_MINUTES", 30))