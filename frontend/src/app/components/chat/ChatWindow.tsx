"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Prince, a frontend engineer. Ask me anything about my work, skills, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Great to meet you! I'm Prince, a frontend engineer passionate about building modern web experiences. How can I help you today?";
    }
    
    // Skills questions
    if (message.includes("skill") || message.includes("technolog") || message.includes("what can you do")) {
      return "I specialize in React, Next.js, TypeScript, and Tailwind CSS. I also work with Node.js, testing frameworks like Vitest/Jest, and focus on performance optimization. I love creating smooth UX with thoughtful animations and AI integration!";
    }
    
    // Project questions
    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "I've built several projects including an AI-powered portfolio (this one!), realtime dashboards with WebSocket integration, and design systems. Check out my projects page to see more details and live demos!";
    }
    
    // Experience questions
    if (message.includes("experience") || message.includes("background") || message.includes("about")) {
      return "I'm a frontend engineer focused on building fast, accessible interfaces. I care about performance budgets, clean abstractions, and maintainable systems. Outside of work, I enjoy tinkering with design systems and mentoring developers.";
    }
    
    // Contact questions
    if (message.includes("contact") || message.includes("reach") || message.includes("email")) {
      return "You can reach me at hello@example.com, or connect with me on LinkedIn and GitHub. I'm always open to discussing new opportunities and collaborations!";
    }
    
    // AI/Technology questions
    if (message.includes("ai") || message.includes("artificial intelligence")) {
      return "I'm passionate about integrating AI into web applications to enhance user experiences. This chat widget is a great example of how AI can make websites more interactive and engaging!";
    }
    
    // Default response
    return "That's interesting! I'd love to tell you more about my work. You can ask me about my skills, projects, experience, or how to contact me. What would you like to know?";
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-20 right-4 w-80 h-96 sm:w-80 sm:h-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
        >
          <ChatHeader onClose={onClose} />
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
