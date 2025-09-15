from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI Backend is running..."}

# Example AI route
@app.post("/summarize")
def summarize(text: str):
    return {"summary": text[:50] + "..."}
