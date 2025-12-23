from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_classic.prompts import ChatPromptTemplate

def build_rag_chain(vectorstore):
    # Gemini LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-pro",
        temperature=0.2
    )

    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Prompt template
    prompt = ChatPromptTemplate.from_template("""
    You are a helpful assistant. Use the context below to answer the question.

    Context:
    {context}

    Question:
    {input}

    Answer:
    """)

    # Step 1: Combine retrieved docs into a single prompt
    document_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=prompt
    )

    # Step 2: Build the RAG chain (replacement for ConversationalRetrievalChain)
    rag_chain = create_retrieval_chain(
        retriever=retriever,
        combine_documents_chain=document_chain
    )

    return rag_chain
