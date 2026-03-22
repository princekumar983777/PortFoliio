import dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.core.config import APP_NAME, HOST, PORT, GEMINI_API_KEY_1, SYSTEM_INSTRUSCTION

dotenv.load_dotenv()

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080","http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173" , "https://port-foliio-khaki.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    query: str
    reply: str


@app.get("/")
def read_root():
    return {"message": f"Welcome to {APP_NAME}!", "status": "running", "version": "1.0.0"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        if not GEMINI_API_KEY_1:
            return ChatResponse(query=req.message, reply=f"Echo: {req.message}")

        from google import genai
        from google.genai import types

        client = genai.Client(api_key=GEMINI_API_KEY_1)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(system_instruction=SYSTEM_INSTRUSCTION),
            contents=req.message,
        )

        return ChatResponse(query=req.message, reply=response.text or "No response from model")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)
