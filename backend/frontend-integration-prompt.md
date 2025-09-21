# Next.js TypeScript Frontend Integration Prompt for Prince Kumar's AI Chatbot

## Overview
Create a complete chatbot integration for your Next.js TypeScript portfolio website that connects to the AI backend API at `/api/chatbot`. The chatbot should provide a seamless user experience with real-time messaging, personalized responses, and interactive suggestions.

## API Endpoint Details
- **URL**: `http://localhost:8000/api/chatbot` (or your production URL)
- **Method**: POST
- **Content-Type**: application/json

### Request Format
```typescript
interface ChatbotRequest {
  message: string;
  userId: string;
  context?: {
    name?: string;
    interests?: string[];
    previous_interactions?: number;
    last_visit?: string;
  };
}
```

### Response Format
```typescript
interface ChatbotResponse {
  reply: string;
  suggestions: string[];
  ownerTone: 'friendly_welcoming' | 'professional_helpful' | 'curious_helpful' | 'apologetic_helpful';
  metadata?: {
    timestamp: string;
    user_id: string;
    intent_detected: string;
    personalization_applied: boolean;
    response_type: string;
    owner_info: {
      name: string;
      title: string;
    };
  };
}
```

## Required Components to Build

### 1. TypeScript Interfaces
Create a `types/chatbot.ts` file with:
- `ChatbotRequest` interface
- `ChatbotResponse` interface
- `ChatMessage` interface for UI state
- `UserContext` interface
- `OwnerTone` type union

### 2. API Service
Create a `services/chatbotService.ts` file with:
- `sendMessage()` function that calls the API
- Error handling for network issues
- Request/response transformation
- Loading states management

### 3. Chat UI Components
Create these React components:

#### `components/chatbot/ChatInterface.tsx`
- Main chat container with message list
- Input field with send button
- Loading indicators
- Error handling display

#### `components/chatbot/MessageBubble.tsx`
- Individual message display
- Different styling for user vs bot messages
- Owner tone-based styling
- Timestamp display

#### `components/chatbot/SuggestionButtons.tsx`
- Display suggestion buttons
- Click handlers to send suggestions as messages
- Responsive design for mobile

#### `components/chatbot/ChatHeader.tsx`
- Prince Kumar's avatar and name
- Online status indicator
- Minimize/maximize controls

### 4. State Management
Use React Context or Zustand for:
- Chat messages array
- Current user context
- Loading states
- Error states
- User preferences

### 5. Styling Requirements
- Modern, clean design matching your portfolio
- Responsive layout (mobile-first)
- Smooth animations for message appearance
- Different message bubble styles based on `ownerTone`
- Prince Kumar's branding colors
- Typing indicator animation

## Implementation Details

### Chat Message Structure
```typescript
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  ownerTone?: OwnerTone;
  suggestions?: string[];
  metadata?: any;
}
```

### User Context Management
- Store user ID in localStorage/sessionStorage
- Track user interactions for personalization
- Update context based on user behavior
- Handle new vs returning users

### API Integration Features
- Debounced input to avoid excessive API calls
- Retry logic for failed requests
- Offline handling with cached responses
- Rate limiting protection

### UI/UX Features
- Auto-scroll to latest message
- Message timestamps
- Typing indicators
- Smooth animations
- Keyboard shortcuts (Enter to send, Escape to close)
- Mobile-optimized touch interactions

## Sample Implementation Structure

```
src/
├── components/
│   └── chatbot/
│       ├── ChatInterface.tsx
│       ├── MessageBubble.tsx
│       ├── SuggestionButtons.tsx
│       ├── ChatHeader.tsx
│       └── index.ts
├── services/
│   └── chatbotService.ts
├── types/
│   └── chatbot.ts
├── hooks/
│   └── useChatbot.ts
├── context/
│   └── ChatContext.tsx
└── styles/
    └── chatbot.module.css
```

## Key Features to Implement

### 1. Real-time Chat Experience
- Instant message sending
- Smooth message animations
- Auto-scroll behavior
- Message status indicators

### 2. Personalization
- Welcome message for new users
- Personalized greetings for returning users
- Context-aware suggestions
- User preference storage

### 3. Error Handling
- Network error messages
- API error responses
- Fallback messages
- Retry mechanisms

### 4. Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

### 5. Performance
- Message virtualization for long chats
- Lazy loading of components
- Optimized re-renders
- Memory management

## Sample Usage in Your Portfolio

```tsx
// pages/index.tsx or your main page
import { ChatInterface } from '@/components/chatbot';

export default function HomePage() {
  return (
    <div>
      {/* Your existing portfolio content */}
      
      {/* Floating chatbot button */}
      <ChatInterface 
        userId="portfolio_visitor"
        context={{
          name: "Portfolio Visitor",
          interests: ["web development", "data visualization"]
        }}
      />
    </div>
  );
}
```

## Styling Guidelines

### Color Scheme
- Primary: Your brand colors
- Bot messages: Subtle background with Prince Kumar's signature
- User messages: Clean, minimal design
- Suggestions: Interactive, hover-friendly

### Typography
- Bot messages: Professional, readable font
- User messages: Clean, modern font
- Suggestions: Clear, actionable text

### Animations
- Message slide-in from appropriate side
- Suggestion button hover effects
- Typing indicator pulse
- Smooth transitions between states

## Testing Requirements

### Unit Tests
- API service functions
- Component rendering
- State management
- Error handling

### Integration Tests
- Full chat flow
- API integration
- User context updates
- Suggestion interactions

### E2E Tests
- Complete user journey
- Mobile responsiveness
- Error scenarios
- Performance under load

## Deployment Considerations

- Environment variables for API URL
- CORS configuration
- Error monitoring (Sentry, etc.)
- Analytics integration
- Performance monitoring

## Future Enhancements Ready

The implementation should be modular to easily add:
- Voice message support
- File upload capabilities
- Chat history persistence
- Advanced AI features
- Multi-language support
- Chat export functionality

## Success Criteria

✅ Chatbot loads and connects to API successfully
✅ Messages send and receive in real-time
✅ Suggestions work and update chat
✅ Responsive design works on all devices
✅ Error states are handled gracefully
✅ User context personalizes experience
✅ Performance is smooth and fast
✅ Accessibility standards are met
✅ Code is clean, typed, and maintainable

## Additional Notes

- Use Prince Kumar's actual photo for the bot avatar
- Include his title "Systems Thinker & Dashboard Designer"
- Match the chatbot's personality to your brand
- Consider adding a "Powered by AI" indicator
- Implement proper loading states for better UX
- Add sound effects for message notifications (optional)
- Consider dark/light theme support

This implementation will create a professional, engaging chatbot that represents you perfectly on your portfolio website while providing an excellent user experience for visitors.
