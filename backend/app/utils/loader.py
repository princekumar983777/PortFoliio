import os
from typing import List, Optional
from pathlib import Path
from langchain.schema import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import (
    TextLoader,
    PyPDFLoader,
    Docx2txtLoader,
    UnstructuredMarkdownLoader,
    UnstructuredFileLoader
)
from ..config import settings

SUPPORTED_EXTENSIONS = {
    '.txt': TextLoader,
    '.pdf': PyPDFLoader,
    '.docx': Docx2txtLoader,
    '.md': UnstructuredMarkdownLoader,
}

class UnsupportedFileTypeError(ValueError):
    """Raised when an unsupported file type is encountered."""
    pass

def get_loader(file_path: str):
    """Get the appropriate loader for the given file extension."""
    ext = Path(file_path).suffix.lower()
    if ext in SUPPORTED_EXTENSIONS:
        return SUPPORTED_EXTENSIONS[ext]
    return UnstructuredFileLoader  # Fallback to unstructured loader

def load_docs(file_path: str) -> List[Document]:
    """Load and split documents from a file.
    
    Args:
        file_path: Path to the file to load
        
    Returns:
        List of document chunks
        
    Raises:
        FileNotFoundError: If the file doesn't exist
        UnsupportedFileTypeError: If the file type is not supported
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    try:
        # Get the appropriate loader
        loader_class = get_loader(file_path)
        loader = loader_class(file_path, encoding="utf-8")
        
        # Load the documents
        docs = loader.load()
        
        # Split documents into chunks
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )
        
        return splitter.split_documents(docs)
        
    except Exception as e:
        raise Exception(f"Error loading documents: {str(e)}")
