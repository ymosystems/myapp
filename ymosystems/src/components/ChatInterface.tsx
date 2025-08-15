import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot, User, Activity } from 'lucide-react';
import { Agent, ChatMessage } from '../types';
import { useTranslation } from '../utils/translations';

interface ChatInterfaceProps {
  agent: Agent;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onBack: () => void;
  language: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  agent,
  messages,
  onSendMessage,
  onBack,
  language
}) => {
  const { t } = useTranslation(language);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-800/50 border border-gray-700/50 rounded overflow-hidden backdrop-blur-sm">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 rounded transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center">
            <Bot className="w-6 h-6 text-green-400" />
          </div>
          
          <div>
            <h2 className="font-light text-white font-mono">{agent.name}</h2>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                agent.status === 'active' ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm text-gray-400 font-light font-mono">{agent.role}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Activity className="w-4 h-4" />
            <span className="font-light font-mono">{t('accuracy')}: {Math.round(agent.performance.accuracy)}%</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-16 h-16 text-green-400/60 mb-4" />
            <h3 className="text-lg font-light text-gray-300 mb-2 font-mono">
              {t('start_conversation')} {agent.name}
            </h3>
            <p className="text-gray-400 max-w-md font-light font-mono">
              {t('specializes_in')} {agent.role.toLowerCase()}. {t('ask_questions')}
            </p>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'agent' && (
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-green-400" />
                  </div>
                )}
                
                <div className={`max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'order-1' : 'order-2'
                }`}>
                  <div className={`px-4 py-3 rounded ${
                    message.sender === 'user'
                      ? 'bg-green-500/20 text-green-400 ml-auto border border-green-500/50'
                      : 'bg-gray-700/50 text-gray-300 border border-gray-600/50'
                  }`}>
                    <p className="text-sm leading-relaxed font-light font-mono">{message.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 font-mono ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-600/50 border border-gray-500/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`${t('message_placeholder')} ${agent.name}...`}
            className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors font-light font-mono"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 disabled:bg-gray-600/50 disabled:cursor-not-allowed text-green-400 disabled:text-gray-500 font-light rounded border border-green-500/50 disabled:border-gray-600/50 transition-all duration-200 flex items-center space-x-2 font-mono hover:shadow-lg hover:shadow-green-500/20"
          >
            <Send className="w-4 h-4" />
            <span>{t('send')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;