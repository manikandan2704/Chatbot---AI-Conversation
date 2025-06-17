import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, isBot?: boolean) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text: string, isBot = false) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const simulateBotResponse = async (userMessage: string): Promise<string> => {
    // Mock bot responses - replace with actual API call
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's what I think...",
      "Great point! From my perspective...",
      "I can help you with that. Here's my suggestion...",
      "That's a complex topic. Let me break it down for you...",
      "I see what you mean. Here's how I would approach that...",
      "Excellent question! Based on what I know...",
      "I appreciate you asking that. Here's my take...",
    ];
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return "Hello there! It's great to meet you. What would you like to chat about today?";
    }
    
    if (userMessage.toLowerCase().includes('help')) {
      return "I'm here to help! You can ask me questions, have a conversation, or try using voice input by clicking the microphone button. What do you need assistance with?";
    }
    
    if (userMessage.toLowerCase().includes('weather')) {
      return "I don't have access to real-time weather data, but I'd be happy to discuss weather patterns, climate, or help you find weather resources!";
    }
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "Your message was: '" + userMessage + "'. How else can I assist you?";
  };

  const sendMessage = async (text: string) => {
    // Add user message
    addMessage(text, false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(async () => {
      const response = await simulateBotResponse(text);
      setIsTyping(false);
      addMessage(response, true);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      addMessage, 
      clearMessages, 
      isTyping, 
      setIsTyping, 
      sendMessage 
    }}>
      {children}
    </ChatContext.Provider>
  );
};