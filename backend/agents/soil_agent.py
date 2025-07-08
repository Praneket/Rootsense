from backend.rag.retriever import get_soil_info

def solve_soil_issue(subproblem):
    info = get_soil_info(subproblem)
    return {
        "agent": "Soil Agent",
        "response": f"Soil Analysis: {info}",
        "confidence": 0.82  # Mock score, we'll improve later
    }
