import os
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def get_vectorstore(docs):
    # Load Pinecone API key
    api_key = os.getenv("PINECONE_API_KEY")
    # print("api_key:", api_key)

    pc = Pinecone(api_key=api_key)

    # Load index name
    index_name = os.getenv("PINECONE_INDEX_NAME")
    print("pinecone_index_name:", index_name)

    # ✅ Gemini embedding dimension
    EMBEDDING_DIM = 768

    # Create index if not exists
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=EMBEDDING_DIM,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region=os.getenv("PINECONE_ENVIRONMENT")
            )
        )
        print("\033[93mIndex created.\033[0m")

    # Connect to index
    index = pc.Index(index_name)
    print("\033[92mConnected to Vector DB\033[0m")

    # ✅ Gemini embeddings
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001"
    )
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
