import os
import time
from typing import List, Optional
from pinecone import Pinecone, ServerlessSpec, NotFoundException
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.schema import Document
from ..config import settings

class VectorStoreError(Exception):
    """Custom exception for vector store operations."""
    pass

def initialize_pinecone():
    """Initialize Pinecone client with proper error handling."""
    if not settings.PINECONE_API_KEY:
        raise VectorStoreError("Pinecone API key is not configured")
    
    try:
        return Pinecone(api_key=settings.PINECONE_API_KEY)
    except Exception as e:
        raise VectorStoreError(f"Failed to initialize Pinecone: {str(e)}")

def create_pinecone_index(pc, index_name: str, dimension: int):
    """Create a new Pinecone index if it doesn't exist."""
    try:
        if index_name not in pc.list_indexes().names():
            pc.create_index(
                name=index_name,
                dimension=dimension,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region=settings.PINECONE_ENVIRONMENT
                )
            )
            # Wait for index to be ready
            time.sleep(10)  # Give Pinecone time to initialize the index
    except Exception as e:
        raise VectorStoreError(f"Failed to create Pinecone index: {str(e)}")

def get_embeddings():
    """Initialize Google's Gemini embeddings."""
    if not settings.GEMINI_API_KEY:
        raise VectorStoreError("Gemini API key is not configured")
    
    try:
        return GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=settings.GEMINI_API_KEY
        )
    except Exception as e:
        raise VectorStoreError(f"Failed to initialize embeddings: {str(e)}")

def get_vectorstore(docs: List[Document]):
    """Get or create a Pinecone vector store with the given documents.
    
    Args:
        docs: List of documents to add to the vector store
        
    Returns:
        PineconeVectorStore: Initialized vector store
        
    Raises:
        VectorStoreError: If there's an error initializing the vector store
    """
    try:
        # Initialize Pinecone
        pc = initialize_pinecone()
        
        # Create index if it doesn't exist
        create_pinecone_index(pc, settings.PINECONE_INDEX_NAME, 768)  # 768 is Gemini's embedding dimension
        
        # Initialize embeddings
        embeddings = get_embeddings()
        
        # Create or load the vector store
        vectorstore = PineconeVectorStore.from_documents(
            documents=docs,
            embedding=embeddings,
            index_name=settings.PINECONE_INDEX_NAME
        )
        
        return vectorstore
        
    except Exception as e:
        raise VectorStoreError(f"Failed to initialize vector store: {str(e)}")
    print("\033[92mEmbeddings created successfully.\033[0m")

    # ✅ Correct LangChain PineconeVectorStore usage
    vectorstore = PineconeVectorStore.from_documents(
        documents=docs,
        embedding=embeddings,
        index_name=index_name,
        pinecone_api_key=api_key
    )

    print("\033[92mVectorstore created and documents added successfully.\033[0m")
    return vectorstore
