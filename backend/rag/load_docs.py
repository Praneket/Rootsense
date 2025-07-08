from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

def load_pdfs():
    loader = PyPDFLoader("data/agricultural_docs/Onion_Guide.pdf")
    docs = loader.load()
    vectordb = Chroma.from_documents(docs, HuggingFaceEmbeddings(), persist_directory="rag_db")
    vectordb.persist()
