from fastapi import APIRouter
from datetime import datetime
from app.core.session import sessions

router = APIRouter(tags=["Projects"])


# this come from database in real scenario
projects = [
    {
        "id": 1,
        "title": "AI-Powered Analytics Platform",
        "description": "A comprehensive analytics dashboard leveraging machine learning to provide predictive insights and real-time data visualization for enterprise clients.",
        "techStack": ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
        "github": "https://github.com",
        "live": "https://example.com",
        "image": "gradient-1",
    },
    {
        "id": 2,
        "title": "Autonomous Drone Navigation",
        "description": "Computer vision system for autonomous drone navigation using deep learning models for obstacle detection and path planning in complex environments.",
        "techStack": ["Python", "PyTorch", "OpenCV", "ROS", "C++"],
        "github": "https://github.com",
        "live": "https://example.com",
        "image": "gradient-2",
    },
    {
        "id": 3,
        "title": "Real-time Data Pipeline",
        "description": "Scalable data processing pipeline handling millions of events per second with fault-tolerant architecture and automated monitoring.",
        "techStack": ["Apache Kafka", "Spark", "Kubernetes", "Go", "Redis"],
        "github": "https://github.com",
        "live": "https://example.com",
        "image": "gradient-3",
    },
    {
        "id": 4,
        "title": "NLP Research Assistant",
        "description": "An intelligent research assistant that summarizes academic papers, extracts key insights, and generates literature reviews using transformer models.",
        "techStack": ["Python", "Transformers", "LangChain", "Neo4j", "FastAPI"],
        "github": "https://github.com",
        "live": "https://example.com",
        "image": "gradient-4",
    },
]

@router.get("/projects")
def get_projects():
    return projects
