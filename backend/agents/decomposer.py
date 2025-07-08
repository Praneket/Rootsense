from langchain_community.llms import Ollama

llm = Ollama(model="phi")

def decompose_problem(problem):
    prompt = f"Break down this farmer problem into subtasks: '{problem}'"
    return llm.invoke(prompt)
