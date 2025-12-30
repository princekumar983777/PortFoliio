import os
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def update_vectorstore(docs , embedding_dim: int =384):
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    # Load index name
    index_name = os.getenv("PINECONE_INDEX_NAME")
    print("pinecone_index_name:", index_name)

    # Delete existing index if it exists to recreate with correct dimension
    if index_name in pc.list_indexes().names():
        pc.delete_index(index_name)
        print("\033[93mExisting index deleted.\033[0m")

    pc.create_index(
        name=index_name,
        dimension=embedding_dim,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region=os.getenv("PINECONE_ENVIRONMENT")
        )
    )
