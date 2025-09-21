#!/usr/bin/env python3
"""
Test script for the Prince Kumar AI Chatbot API
This script demonstrates how to interact with the chatbot endpoint
"""

import requests
import json

# API endpoint
BASE_URL = "http://localhost:8000"
CHATBOT_ENDPOINT = f"{BASE_URL}/api/chatbot"

def test_chatbot():
    """Test the chatbot with various sample messages"""
    
    # Test cases
    test_cases = [
        {
            "message": "Hi there!",
            "userId": "test_user_1",
            "context": {"name": "Alice", "interests": ["data visualization"]}
        },
        {
            "message": "What do you do?",
            "userId": "test_user_2",
            "context": None
        },
        {
            "message": "Can you help me build a dashboard?",
            "userId": "test_user_3",
            "context": {"name": "Bob", "previous_interactions": 2}
        },
        {
            "message": "Show me your recent work",
            "userId": "test_user_4",
            "context": None
        },
        {
            "message": "What tools do you recommend for analytics?",
            "userId": "test_user_5",
            "context": {"interests": ["analytics", "tools"]}
        }
    ]
    
    print("🤖 Testing Prince Kumar's AI Chatbot API")
    print("=" * 50)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📝 Test Case {i}:")
        print(f"Message: '{test_case['message']}'")
        print(f"User ID: {test_case['userId']}")
        if test_case['context']:
            print(f"Context: {test_case['context']}")
        
        try:
            response = requests.post(
                CHATBOT_ENDPOINT,
                json=test_case,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Response:")
                print(f"   Reply: {data['reply']}")
                print(f"   Tone: {data['ownerTone']}")
                print(f"   Suggestions: {data['suggestions']}")
                if data.get('metadata'):
                    print(f"   Intent: {data['metadata'].get('intent_detected', 'unknown')}")
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Connection Error: Make sure the server is running on localhost:8000")
            break
        except Exception as e:
            print(f"❌ Unexpected Error: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 Testing complete!")

if __name__ == "__main__":
    test_chatbot()
