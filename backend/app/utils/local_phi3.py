import requests
from app.data.prompts import system_prompt

class OptimizedRAGChat:
    def __init__(self, vectorstore, model="phi3"):
        self.vectorstore = vectorstore
        self.model = model
        self.ollama_url = "http://localhost:11434/api/generate"

    def get_rag_response(self, user_query):
        # Step 1: Search the vector store
        search_results = self.vectorstore.similarity_search(user_query, k=3)

        # Step 2: Extract retrieved context
        context = "\n\n".join([doc.page_content for doc in search_results])

        # Step 3: Construct RAG prompt (Phi-3 friendly)
        prompt = f"""
{system_prompt}

You are given retrieved context from a knowledge base.
Answer the question using ONLY this context.
If the answer is not present, say "I don't know".

RETRIEVED CONTEXT:
{context}

QUESTION:
{user_query}

ANSWER:
"""

        # Step 4: Call Ollama (Phi-3)
        payload = {
            "model": self.model,
            "prompt": prompt,
            "temperature": 0.2,
            "top_p": 0.9,
            "stream": False
        }

        response = requests.post(self.ollama_url, json=payload)
        response.raise_for_status()

        return response.json()["response"]
