from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import json
import re
from datetime import datetime

app = FastAPI(title="Prince Kumar's AI Backend", version="1.0.0")

# Request and Response Models
class ChatbotRequest(BaseModel):
    message: str = Field(..., description="User's message to the chatbot", min_length=1, max_length=1000)
    userId: str = Field(..., description="Unique identifier for the user")
    context: Optional[Dict[str, Any]] = Field(None, description="Optional context data about the user")

class ChatbotResponse(BaseModel):
    reply: str = Field(..., description="The chatbot's response message")
    suggestions: List[str] = Field(..., description="Suggested follow-up questions or actions")
    ownerTone: str = Field(..., description="The tone/personality of the response")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata for the frontend")

# Prince Kumar's Profile and Context
PRINCE_PROFILE = {
    "name": "Prince Kumar",
    "title": "Systems Thinker & Dashboard Designer",
    "expertise": [
        "Structuring operational data",
        "Building analytical tools",
        "Creating interactive dashboards",
        "Data visualization",
        "Process optimization",
        "System architecture"
    ],
    "personality_traits": [
        "friendly",
        "professional",
        "solution-oriented",
        "detail-focused",
        "collaborative"
    ],
    "greeting_style": "Hi, I'm Prince Kumar. How can I help you today?",
    "signature_phrases": [
        "Let me help you structure that data",
        "I can show you how to build that dashboard",
        "Here's a practical solution for you",
        "Let's break this down systematically"
    ]
}

# Sample user data for personalization (in production, this would come from a database)
SAMPLE_USER_DATA = {
    "user123": {
        "name": "John",
        "previous_interactions": 3,
        "interests": ["data visualization", "dashboards"],
        "last_visit": "2024-01-15"
    },
    "user456": {
        "name": "Sarah",
        "previous_interactions": 1,
        "interests": ["analytics", "tools"],
        "last_visit": "2024-01-14"
    }
}

# Common query patterns and responses
COMMON_QUERIES = {
    "what_do_you_do": {
        "patterns": ["what do you do", "tell me about yourself", "who are you", "your work"],
        "response": "I'm Prince Kumar, a systems thinker and dashboard designer. I specialize in helping people structure operational data, build analytical tools, and create interactive dashboards that make complex information easy to understand and act upon.",
        "suggestions": ["Can you help me build a dashboard?", "Show me your recent work", "What tools do you recommend?"]
    },
    "dashboard_help": {
        "patterns": ["build a dashboard", "create dashboard", "dashboard help", "analytics dashboard"],
        "response": "Absolutely! I'd love to help you build a dashboard. I can guide you through structuring your data, choosing the right visualization types, and creating an intuitive interface. What kind of data are you working with?",
        "suggestions": ["What data sources do you recommend?", "Show me dashboard examples", "How do I get started?"]
    },
    "recent_work": {
        "patterns": ["recent work", "show me your work", "portfolio", "examples", "projects"],
        "response": "I've been working on several exciting projects recently! I've built operational dashboards for e-commerce analytics, created data visualization tools for healthcare metrics, and designed interactive reports for financial tracking. Would you like to see specific examples?",
        "suggestions": ["Show me e-commerce examples", "Tell me about healthcare projects", "What's your process?"]
    },
    "tools_recommendation": {
        "patterns": ["tools", "recommendations", "what tools", "software", "platforms"],
        "response": "I work with a variety of tools depending on the project needs. For dashboards, I often use Tableau, Power BI, or custom web applications. For data processing, I prefer Python with pandas and SQL. For visualization, I love D3.js and Chart.js. What specific use case are you thinking about?",
        "suggestions": ["Which is better: Tableau or Power BI?", "Show me Python examples", "What about web-based solutions?"]
    },
    "process_help": {
        "patterns": ["process", "how do you", "methodology", "approach", "steps"],
        "response": "My approach is systematic and user-focused. I start by understanding your data structure and business goals, then design the information architecture, create wireframes, and build iteratively with user feedback. The key is making complex data accessible and actionable.",
        "suggestions": ["Walk me through a project", "How do you handle user feedback?", "What about data quality?"]
    }
}

def get_user_personalization(user_id: str) -> Dict[str, Any]:
    """Get user personalization data"""
    return SAMPLE_USER_DATA.get(user_id, {
        "name": "there",
        "previous_interactions": 0,
        "interests": [],
        "last_visit": None
    })

def detect_query_intent(message: str) -> str:
    """Detect the intent of the user's message"""
    message_lower = message.lower()
    
    for intent, data in COMMON_QUERIES.items():
        for pattern in data["patterns"]:
            if pattern in message_lower:
                return intent
    
    return "general"

def generate_personalized_greeting(user_data: Dict[str, Any]) -> str:
    """Generate a personalized greeting based on user data"""
    name = user_data.get("name", "there")
    interactions = user_data.get("previous_interactions", 0)
    
    if interactions == 0:
        return f"Hi {name}! I'm Prince Kumar. Welcome! How can I help you today?"
    elif interactions < 3:
        return f"Hi {name}! Great to see you again. What can I help you with today?"
    else:
        return f"Hey {name}! Welcome back. Ready to tackle another data challenge together?"

def generate_suggestions(intent: str, user_data: Dict[str, Any]) -> List[str]:
    """Generate contextual suggestions based on intent and user data"""
    if intent in COMMON_QUERIES:
        base_suggestions = COMMON_QUERIES[intent]["suggestions"]
    else:
        base_suggestions = [
            "What do you do?",
            "Can you help me build a dashboard?",
            "Show me your recent work",
            "What tools do you recommend?"
        ]
    
    # Add personalized suggestions based on user interests
    interests = user_data.get("interests", [])
    if "data visualization" in interests:
        base_suggestions.append("Show me visualization examples")
    if "analytics" in interests:
        base_suggestions.append("Help me with analytics setup")
    
    return base_suggestions[:4]  # Limit to 4 suggestions

def generate_response(message: str, user_data: Dict[str, Any]) -> Dict[str, Any]:
    """Generate the main response based on message and user data"""
    intent = detect_query_intent(message)
    
    # Handle greetings
    if any(greeting in message.lower() for greeting in ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]):
        reply = generate_personalized_greeting(user_data)
        suggestions = generate_suggestions("general", user_data)
        return {
            "reply": reply,
            "suggestions": suggestions,
            "ownerTone": "friendly_welcoming"
        }
    
    # Handle specific intents
    if intent in COMMON_QUERIES:
        query_data = COMMON_QUERIES[intent]
        reply = query_data["response"]
        suggestions = generate_suggestions(intent, user_data)
        return {
            "reply": reply,
            "suggestions": suggestions,
            "ownerTone": "professional_helpful"
        }
    
    # Handle general queries
    name = user_data.get("name", "there")
    reply = f"Thanks for your message, {name}! I'm here to help you with data structuring, dashboard design, and building analytical tools. Could you tell me more about what you're looking to accomplish? I'd love to provide some practical guidance."
    suggestions = generate_suggestions("general", user_data)
    
    return {
        "reply": reply,
        "suggestions": suggestions,
        "ownerTone": "curious_helpful"
    }

@app.get("/")
def read_root():
    return {"message": "Prince Kumar's AI Backend is running...", "version": "1.0.0"}

@app.post("/api/chatbot", response_model=ChatbotResponse)
def chatbot_endpoint(request: ChatbotRequest):
    """
    AI Chatbot endpoint that responds as Prince Kumar, systems thinker and dashboard designer.
    
    This endpoint provides personalized responses based on user data and context,
    offering help with data structuring, dashboard design, and analytical tools.
    """
    try:
        # Validate input
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if not request.userId.strip():
            raise HTTPException(status_code=400, detail="User ID is required")
        
        # Get user personalization data
        user_data = get_user_personalization(request.userId)
        
        # Merge with provided context if available
        if request.context:
            user_data.update(request.context)
        
        # Generate response
        response_data = generate_response(request.message, user_data)
        
        # Add metadata for frontend
        metadata = {
            "timestamp": datetime.now().isoformat(),
            "user_id": request.userId,
            "intent_detected": detect_query_intent(request.message),
            "personalization_applied": bool(user_data.get("name") != "there"),
            "response_type": "chatbot",
            "owner_info": {
                "name": PRINCE_PROFILE["name"],
                "title": PRINCE_PROFILE["title"]
            }
        }
        
        return ChatbotResponse(
            reply=response_data["reply"],
            suggestions=response_data["suggestions"],
            ownerTone=response_data["ownerTone"],
            metadata=metadata
        )
        
    except HTTPException:
        raise
    except Exception as e:
        # Fallback response for unexpected errors
        return ChatbotResponse(
            reply="I apologize, but I'm experiencing some technical difficulties. Please try again in a moment, and I'll be happy to help you with your data and dashboard needs!",
            suggestions=[
                "What do you do?",
                "Can you help me build a dashboard?",
                "Show me your recent work"
            ],
            ownerTone="apologetic_helpful",
            metadata={
                "timestamp": datetime.now().isoformat(),
                "error": "internal_error",
                "fallback_response": True
            }
        )

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Prince Kumar's AI Backend"}

# Example AI route (keeping existing functionality)
@app.post("/summarize")
def summarize(text: str):
    return {"summary": text[:50] + "..."}
