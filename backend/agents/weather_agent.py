from backend.tools.weather_api import get_weather_info

def solve_weather_issue(subproblem):
    info = get_weather_info(subproblem)
    return {
        "agent": "Weather Agent",
        "response": f"Weather Insight: {info}",
        "confidence": 0.76
    }
