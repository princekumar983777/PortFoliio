from __future__ import annotations

from typing import Optional, Any

from app.core.config import PINECONE_API_KEY, PINECONE_INDEX_NAME

_vectorstore: Optional[Any] = None
_vectorstore_init_error: Optional[Exception] = None


def get_vectorstore() -> Optional[Any]:
    """
    Lazy initializer so the server can start without Pinecone/HF deps configured.

    Returns:
        - vectorstore instance when configured correctly
        - None when not configured (missing env vars) or when init failed
    """
    global _vectorstore, _vectorstore_init_error

    if _vectorstore is not None:
        return _vectorstore

    if _vectorstore_init_error is not None:
        return None

    if not PINECONE_API_KEY or not PINECONE_INDEX_NAME:
        _vectorstore_init_error = ValueError(
            "Missing PINECONE_API_KEY or PINECONE_INDEX_NAME in backend/.env"
        )
        return None

    try:
        from pinecone import Pinecone
        from langchain_pinecone import PineconeVectorStore
        from langchain_huggingface import HuggingFaceEmbeddings

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        _ = Pinecone(api_key=PINECONE_API_KEY)

        _vectorstore = PineconeVectorStore(
            embedding=embeddings,
            index_name=PINECONE_INDEX_NAME,
        )
        return _vectorstore
    except Exception as e:
        _vectorstore_init_error = e
        return None


def get_vectorstore_init_error() -> Optional[Exception]:
    return _vectorstore_init_error
