import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import VoiceInput from './VoiceInput';
import PromptTemplates from './PromptTemplates';
import ChatExport from './ChatExport';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || disabled) return;

    onSendMessage(message);
    setMessageHistory(prev => [message, ...prev].slice(0, 50)); // Keep last 50 messages
    setMessage('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'ArrowUp' && messageHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, messageHistory.length - 1);
      setHistoryIndex(newIndex);
      setMessage(messageHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setMessage(newIndex === -1 ? '' : messageHistory[newIndex]);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setMessage(transcript);
    // Auto-focus textarea after voice input
    textareaRef.current?.focus();
  };

  const handleTemplateSelect = (template: string) => {
    setMessage(template);
    textareaRef.current?.focus();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="
                w-full resize-none border border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 pr-12
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none
                dark:focus:border-blue-400 dark:focus:ring-blue-400
                max-h-32 min-h-[48px]
              "
              rows={1}
              disabled={disabled}
            />
            {messageHistory.length > 0 && historyIndex >= 0 && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                <button
                  onClick={() => {
                    const newIndex = Math.min(historyIndex + 1, messageHistory.length - 1);
                    setHistoryIndex(newIndex);
                    setMessage(messageHistory[newIndex]);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={historyIndex >= messageHistory.length - 1}
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    const newIndex = Math.max(historyIndex - 1, -1);
                    setHistoryIndex(newIndex);
                    setMessage(newIndex === -1 ? '' : messageHistory[newIndex]);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={historyIndex <= 0}
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <VoiceInput onTranscript={handleVoiceTranscript} />
            <PromptTemplates onSelectTemplate={handleTemplateSelect} />
            <ChatExport />
            
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className="p-3 rounded-full"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {messageHistory.length > 0 && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Use ↑↓ arrows to navigate message history
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;