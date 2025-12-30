from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    session_expires_at: str

class blogPosts(BaseModel):
    id: int
    title: str
    excerpt: str
    date: str
    readTime: str
    category: str

class Projects(BaseModel):
    id: int
    title: str
    description: str
    techStack: list[str]
    github: str
    live: str
    image: str