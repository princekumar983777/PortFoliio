from google import genai
from app.data.prompts import system_prompt
from google.genai import types

class OptimizedRAGChat:
    def __init__(self , vectorstore):
        self.vectorstore = vectorstore
        self.client = genai.Client()
        self.chat = None
        self.initialize_chat()

    def initialize_chat(self):
        """Initialize Gemini chat with role definition only"""
        self.chat = self.client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                temperature=0.2,
                top_p=0.9,
                max_output_tokens=264,
            )
        )

        # System message with role definition only
        self.chat.send_message(system_prompt)

    def get_rag_response(self, user_query):
        # Step 1: Search the vector store for relevant documents
        search_results = self.vectorstore.similarity_search(user_query, k=3)

        # Step 2: Extract the content from search results
        context = "\n\n".join([doc.page_content for doc in search_results])

        # Step 3: Create a message that includes ONLY the retrieved context
        enhanced_query = f"""Here are relevant excerpts from my knowledge base for this question:

RETRIEVED CONTEXT:
{context}

QUESTION: {user_query}

Please answer based on the retrieved context above. Be specific and use the information provided."""

        # Step 4: Send to Gemini chat and get response
        response = self.chat.send_message(enhanced_query)

        return response.text
