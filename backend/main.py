from fastapi import FastAPI
from pydantic import BaseModel
from .agents.coordinator import process_query  # ✅ Make sure this import exists!

app = FastAPI()

class FarmerQuery(BaseModel):
    question: str

@app.post("/ask")
async def ask_ai(query: FarmerQuery):
    try:
        result = process_query(query.question)
        return {"solution": result}
    except Exception as e:
        return {"error": str(e)}
