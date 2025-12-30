import os
from google import genai
from google.genai import types
from app.data.prompts import system_prompt


class OptimizedRAGChat:
    def __init__(self, vectorstore):
        self.vectorstore = vectorstore

        # API keys
        self.api_keys = [
            os.getenv("GEMINI_API_KEY_1"),
            os.getenv("GEMINI_API_KEY_2"),
        ]

        self.current_key_index = 0
        self.client = None
        self.chat = None

        self._initialize_client()

    # ------------------ Init ------------------

    def _initialize_client(self):
        """Create client with current API key"""
        self.client = genai.Client(
            api_key=self.api_keys[self.current_key_index]
        )
        self._initialize_chat()

    def _initialize_chat(self):
        self.chat = self.client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                temperature=0.2,
                top_p=0.9,
                max_output_tokens=264,
            )
        )
        self.chat.send_message(system_prompt)

    # ------------------ Key Rotation ------------------

    def _switch_api_key(self):
        self.current_key_index = (self.current_key_index + 1) % len(self.api_keys)
        self._initialize_client()

    # ------------------ RAG Call ------------------

    def get_rag_response(self, user_query):
        search_results = self.vectorstore.similarity_search(user_query, k=3)
        context = "\n\n".join(doc.page_content for doc in search_results)

        enhanced_query = f"""
RETRIEVED CONTEXT:
{context}

QUESTION: {user_query}

Answer only using the retrieved context.
"""

        for _ in range(len(self.api_keys)):
            try:
                response = self.chat.send_message(enhanced_query)
                return response.text
            except Exception as e:
                if "quota" in str(e).lower() or "rate" in str(e).lower():
                    self._switch_api_key()
                else:
                    raise e

        return "All Gemini API keys are rate-limited. Try again later."
