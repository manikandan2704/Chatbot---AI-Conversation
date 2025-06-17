import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    category: 'General',
    prompts: [
      'Tell me a joke',
      'What\'s the weather like?',
      'Explain quantum physics in simple terms',
      'Give me a motivational quote'
    ]
  },
  {
    category: 'Writing',
    prompts: [
      'Help me write a professional email',
      'Create a story about adventure',
      'Write a product description',
      'Draft a thank you note'
    ]
  },
  {
    category: 'Learning',
    prompts: [
      'Teach me about machine learning',
      'Explain the solar system',
      'What is blockchain technology?',
      'How does photosynthesis work?'
    ]
  },
  {
    category: 'Creative',
    prompts: [
      'Generate creative writing prompts',
      'Suggest a recipe for dinner',
      'Plan a weekend activity',
      'Create a workout routine'
    ]
  }
];

const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelectTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full"
        title="Prompt templates"
      >
        <BookOpen className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Quick Templates
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            <div className="flex space-x-1 mb-3">
              {templates.map((template) => (
                <button
                  key={template.category}
                  onClick={() => setSelectedCategory(template.category)}
                  className={`
                    px-3 py-1 text-xs rounded-full transition-colors
                    ${selectedCategory === template.category
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {template.category}
                </button>
              ))}
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto">
              {templates
                .find(t => t.category === selectedCategory)
                ?.prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelectTemplate(prompt);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptTemplates;