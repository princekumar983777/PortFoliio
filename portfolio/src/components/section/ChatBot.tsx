import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 I'm H's portfolio assistant. How can I help you today?",
    isBot: true,
  },
];

const botResponses: Record<string, string> = {
  skills:
    "H specializes in AI/ML, Backend Development, and Data Science. Key technologies include Python, TensorFlow, PyTorch, Go, and various cloud platforms.",
  experience:
    "H has 5+ years of experience, transitioning from Mechanical Engineering to AI/ML and software development. This unique background brings a structured, analytical approach to problem-solving.",
  projects:
    "Check out the Projects section for detailed showcases! Highlights include an AI-powered analytics platform, autonomous drone navigation system, and scalable data pipelines.",
  contact:
    "The best way to reach H is through the contact form in the Hire Me section, or via email at hello@hhaldiya.com. H is currently available for new opportunities!",
  availability:
    "H is currently open for freelance projects, consulting, and full-time opportunities. Feel free to reach out!",
  default:
    "I can help you learn about H's skills, experience, projects, or how to get in touch. What would you like to know?",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("skill") || lowerMessage.includes("tech")) {
      return botResponses.skills;
    }
    if (lowerMessage.includes("experience") || lowerMessage.includes("background")) {
      return botResponses.experience;
    }
    if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      return botResponses.projects;
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("hire") || lowerMessage.includes("email")) {
      return botResponses.contact;
    }
    if (lowerMessage.includes("available") || lowerMessage.includes("opportunity")) {
      return botResponses.availability;
    }
    return botResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`chatbot-button ${isOpen ? "scale-0" : "scale-100"}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[28rem] glass-card flex flex-col z-50 animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                H
              </div>
              <div>
                <h4 className="font-semibold text-sm">Portfolio Assistant</h4>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-colors"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
