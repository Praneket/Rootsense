from backend.tools.search_tool import search_market_prices

def solve_market_issue(subproblem):
    info = search_market_prices(subproblem)
    return {
        "agent": "Market Agent",
        "response": f"Market Advice: {info}",
        "confidence": 0.71
    }
