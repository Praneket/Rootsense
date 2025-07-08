from backend.rag.retriever import get_crop_info


def solve_crop_issue(subproblem):
    info = get_crop_info(subproblem)
    return f"Crop solution: Based on documents, {info}"
