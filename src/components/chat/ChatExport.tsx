import React, { useState } from 'react';
import { Download, FileText, Database } from 'lucide-react';
import Button from '../ui/Button';
import { useChat } from '../../contexts/ChatContext';

const ChatExport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages } = useChat();

  const exportAsText = () => {
    const content = messages
      .map(msg => `[${msg.timestamp.toLocaleString()}] ${msg.isBot ? 'Bot' : 'You'}: ${msg.text}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportAsJSON = () => {
    const content = JSON.stringify(messages, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full"
        title="Export chat"
      >
        <Download className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <button
              onClick={exportAsText}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Export as TXT</span>
            </button>
            <button
              onClick={exportAsJSON}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <Database className="w-4 h-4" />
              <span>Export as JSON</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatExport;