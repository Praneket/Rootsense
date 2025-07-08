from backend.agents.decomposer import decompose_problem
from backend.agents.crop_agent import solve_crop_issue
from backend.agents.soil_agent import solve_soil_issue
from backend.agents.weather_agent import solve_weather_issue
from backend.agents.market_agent import solve_market_issue
from backend.agents.evaluator import evaluate_solutions

def process_query(query):
    sub_tasks_text = decompose_problem(query)
    parts = sub_tasks_text.lower().split('\n')

    solutions = []
    for part in parts:
        if "crop" in part or "disease" in part or "leaves" in part:
            solutions.append(solve_crop_issue(part))
        elif "soil" in part or "nutrient" in part:
            solutions.append(solve_soil_issue(part))
        elif "weather" in part or "climate" in part or "rain" in part:
            solutions.append(solve_weather_issue(part))
        elif "cost" in part or "price" in part or "treatment" in part:
            solutions.append(solve_market_issue(part))
        else:
            solutions.append({
                "agent": "Unknown Agent",
                "response": f"Could not determine agent for: {part}",
                "confidence": 0.4
            })

    evaluation = evaluate_solutions(solutions)

    return {
        "best_suggestion": evaluation["best"]["response"],
        "summary": evaluation["summary"]
    }
