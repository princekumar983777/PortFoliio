import uvicorn
from app.core.config import HOST, PORT

if __name__ == "__main__":
    uvicorn.run("api.main:app", host=HOST, port=PORT, reload=True) 
