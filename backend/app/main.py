 import threading
from fastapi import FastAPI

from app.core.config import APP_NAME, HOST, PORT
from app.core.session import cleanup_loop
from fastapi.middleware.cors import CORSMiddleware

from app.routes import chat, health, session, admin , ui , projects, blogs

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],         # IMPORTANT: allows OPTIONS
    allow_headers=["*"],
)

# Routers
app.include_router(ui.router)
app.include_router(chat.router)
app.include_router(health.router)
app.include_router(session.router)
app.include_router(admin.router)
app.include_router(projects.router)
app.include_router(blogs.router)


@app.on_event("startup")
def startup():
    threading.Thread(target=cleanup_loop, daemon=True).start()

    print(f"🚀 {APP_NAME} running at http://{HOST}:{PORT}")

@app.get("/")
def read_root():
    return {"message": f"Welcome to {APP_NAME}!", 
            "status": "running" , 
            "version": "1.0.0",
            "Hint": "Access the admin UI at /admin"
            }

