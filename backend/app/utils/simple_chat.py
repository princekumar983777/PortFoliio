class SimpleChat:
    """Fallback chat implementation when vectorstore is not available."""

    def __init__(self):
        self.responses = {
            "skills": "H specializes in AI/ML, Backend Development, and Data Science. Key technologies include Python, TensorFlow, PyTorch, Go, and various cloud platforms.",
            "experience": "H has 5+ years of experience, transitioning from Mechanical Engineering to AI/ML and software development. This unique background brings a structured, analytical approach to problem-solving.",
            "projects": "Check out the Projects section for detailed showcases! Highlights include an AI-powered analytics platform, autonomous drone navigation system, and scalable data pipelines.",
            "contact": "The best way to reach H is through the contact form in the Hire Me section, or via email at hello@hhaldiya.com. H is currently available for new opportunities!",
            "availability": "H is currently open for freelance projects, consulting, and full-time opportunities. Feel free to reach out!",
            "default": "I can help you learn about H's skills, experience, projects, or how to get in touch. What would you like to know?",
        }

    def get_rag_response(self, user_query, conversation_history=None):
        """Simple keyword-based response system."""
        query_lower = user_query.lower()

        if any(word in query_lower for word in ["skill", "tech", "technology"]):
            return self.responses["skills"]
        elif any(word in query_lower for word in ["experience", "background", "work"]):
            return self.responses["experience"]
        elif any(word in query_lower for word in ["project", "work", "portfolio"]):
            return self.responses["projects"]
        elif any(word in query_lower for word in ["contact", "hire", "email", "reach"]):
            return self.responses["contact"]
        elif any(word in query_lower for word in ["available", "opportunity", "job"]):
            return self.responses["availability"]
        else:
            return self.responses["default"]