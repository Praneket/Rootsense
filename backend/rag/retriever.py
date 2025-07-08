from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = Chroma(persist_directory="rag_db", embedding_function=embedding)

def get_crop_info(query):
    docs = db.similarity_search(query)
    return docs[0].page_content if docs else "No relevant crop data found."

def get_soil_info(query):
    docs = db.similarity_search(query)
    return docs[0].page_content if docs else "No relevant soil data found."
