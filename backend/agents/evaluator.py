def evaluate_solutions(solutions):
    sorted_solutions = sorted(solutions, key=lambda x: x["confidence"], reverse=True)
    best = sorted_solutions[0]
    summary = "\n".join([f"{s['agent']}: {s['response']}" for s in sorted_solutions])
    return {
        "best": best,
        "summary": summary
    }
