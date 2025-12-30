from fastapi import APIRouter
from datetime import datetime
from app.core.session import sessions

router = APIRouter(tags=["Blogs"])


blogPosts = [
    {
        "id": 1,
        "title": "Building Scalable ML Pipelines in Production",
        "excerpt": "A deep dive into designing and implementing machine learning pipelines that can handle real-world scale, with practical tips from production deployments.",
        "date": "Dec 20, 2024",
        "readTime": "8 min read",
        "category": "Machine Learning",
    },
    {
        "id": 2,
        "title": "From Mechanical Engineering to AI: My Journey",
        "excerpt": "Sharing my unconventional path from designing mechanical systems to building intelligent software systems, and the lessons learned along the way.",
        "date": "Dec 15, 2024",
        "readTime": "6 min read",
        "category": "Career",
    },
    {
        "id": 3,
        "title": "Understanding Transformer Architectures",
        "excerpt": "Breaking down the transformer architecture that powers modern NLP, with intuitive explanations and code examples for practitioners.",
        "date": "Dec 10, 2024",
        "readTime": "12 min read",
        "category": "Deep Learning",
    },
    {
        "id": 4,
        "title": "Optimizing Backend Performance with Go",
        "excerpt": "Practical strategies for building high-performance backend services in Go, including concurrency patterns and memory optimization techniques.",
        "date": "Dec 5, 2024",
        "readTime": "10 min read",
        "category": "Backend",
    },
]

@router.get("/blogs")
def get_blogs():
    return blogPosts