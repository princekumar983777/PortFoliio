from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

from app.core.config import (
    PINECONE_API_KEY,
    PINECONE_INDEX_NAME
)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

pc = Pinecone(api_key=PINECONE_API_KEY)

vectorstore = PineconeVectorStore(
    embedding=embeddings,
    index_name=PINECONE_INDEX_NAME
)
