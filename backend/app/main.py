from fastapi import FastAPI

from pydantic import BaseModel
from utils.loader import load_docs
from db.vectorstore import get_vectorstore
from utils.chain import build_rag_chain
import os 
import dotenv
dotenv.load_dotenv()

app = FastAPI()

# Load + Upload to Pinecone ONCE
docs = load_docs("data/prince_rag_knowledge_base.txt")
print("Data Loaded Succesfully.")
vectorstore = get_vectorstore(docs)
print("\033[91mVectorstore created successfully.\033[0m")
rag_chain = build_rag_chain(vectorstore)
print("\033[92mChain build Successfully.\033[0m")
# Session memory (refresh = new session)
sessions = {}

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):

    if req.session_id not in sessions:
        sessions[req.session_id] = []

    chat_history = sessions[req.session_id]

    result = rag_chain({
        "question": req.message,
        "chat_history": chat_history
    })

    answer = result["answer"]

    chat_history.append((req.message, answer))

    return {"reply": answer}
