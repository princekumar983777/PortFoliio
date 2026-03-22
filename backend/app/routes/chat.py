from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.core.config import GEMINI_API_KEY_1, SYSTEM_INSTRUSCTION
from google import genai
from google.genai import types

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not GEMINI_API_KEY_1:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY_1 not configured")

    client = genai.Client(api_key=GEMINI_API_KEY_1)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUSCTION,
        ),
        contents=req.message,
    )

    return ChatResponse(
        query=req.message,
        reply=response.text,
    )


    