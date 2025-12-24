import pinecone 
from langchain_pinecone import oinecncevectorstore 

def load_vecotrstore():

    results = index.query(vector=query_embedding[0], top_k=3, include_metadata=True)

