import threading
from fastapi import FastAPI

from app.core.config import APP_NAME, HOST, PORT
from app.core.session import cleanup_loop
from fastapi.middleware.cors import CORSMiddleware

from app.routes import chat, health, session, admin, projects, blogs

import dotenv

dotenv.load_dotenv()

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev
        "http://127.0.0.1:3000",
        "http://localhost:5173",   # Vite dev
        "http://127.0.0.1:5173",
        "http://localhost:8080",   # Alternative dev
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],         # IMPORTANT: allows OPTIONS
    allow_headers=["*"],
)

# Routers
app.include_router(chat.router)

# /health -> return the health status
app.include_router(health.router)



@app.on_event("startup")
def startup():
    threading.Thread(target=cleanup_loop, daemon=True).start()

    print(f"{APP_NAME} running at http://{HOST}:{PORT}")

@app.get("/")
def read_root():
    return {"message": f"Welcome to {APP_NAME}!", 
            "status": "running" , 
            "version": "1.0.0",
            "Hint": "Access the admin UI at /admin"
            }


