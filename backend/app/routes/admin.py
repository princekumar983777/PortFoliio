from fastapi import APIRouter, HTTPException
from app.core.config import UPDATE_EMBEDDINGS_PASSWORD

router = APIRouter(tags=["Admin"])


@router.post("/update_vectorstore")
def update_vectorstore(password: str):
    if password != UPDATE_EMBEDDINGS_PASSWORD:
        raise HTTPException(status_code=403, detail="Unauthorized")

    from app.utils.loader import load_docs
    from app.db.Update_Vectorstore import update_vectorstore

    docs = load_docs("data/portfolio.txt")
    update_vectorstore(docs, embedding_dim=384)

    return {"message": "Vector store updated successfully"}
