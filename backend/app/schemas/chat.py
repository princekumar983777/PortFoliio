from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    query: str
    reply: str

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