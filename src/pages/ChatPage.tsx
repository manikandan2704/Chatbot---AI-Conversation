import React from 'react';
import { useChat } from '../contexts/ChatContext';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';

const ChatPage: React.FC = () => {
  const { sendMessage, isTyping } = useChat();

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatPage;