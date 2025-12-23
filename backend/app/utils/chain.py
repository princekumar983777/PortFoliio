from typing import Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
from langchain.schema import BaseRetriever
from langchain_core.runnables import Runnable, RunnableConfig
from langchain.callbacks.manager import CallbackManagerForRetrieverRun
from langchain_core.callbacks.manager import CallbackManagerForChainRun
from langchain_core.outputs import LLMResult

from ..config import settings

class RAGChainError(Exception):
    """Custom exception for RAG chain operations."""
    pass

def build_rag_chain(vectorstore: BaseRetriever) -> Runnable:
    """Build a RAG (Retrieval-Augmented Generation) chain.
    
    Args:
        vectorstore: Vector store to use for retrieval
        
    Returns:
        A runnable RAG chain
        
    Raises:
        RAGChainError: If there's an error building the chain
    """
    try:
        # Initialize the language model
        llm = ChatGoogleGenerativeAI(
            model=settings.MODEL_NAME,
            temperature=settings.TEMPERATURE,
            google_api_key=settings.GEMINI_API_KEY
        )

        # Configure the retriever
        retriever = vectorstore.as_retriever(
            search_kwargs={"k": settings.TOP_K_RESULTS}
        )

        # Enhanced prompt template
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a helpful, accurate, and factual AI assistant. Use the context provided to answer the question at the end. 
            If you don't know the answer, just say that you don't know, don't try to make up an answer.
            
            Context:
            {context}
            
            Previous conversation:
            {chat_history}
            
            Question: {input}
            
            Answer the question based on the context above. If the context doesn't contain relevant information, 
            say "I don't have enough information to answer that question."""
            )
        ])

        # Create the document chain
        document_chain = create_stuff_documents_chain(
            llm=llm,
            prompt=prompt,
        )

        # Step 2: Build the RAG chain (replacement for ConversationalRetrievalChain)
        rag_chain = create_retrieval_chain(
            retriever=retriever,
            combine_documents_chain=document_chain
        )

        return rag_chain
    except Exception as e:
        raise RAGChainError("Error building RAG chain") from e
