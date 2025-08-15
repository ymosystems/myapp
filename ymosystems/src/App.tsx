import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AgentManagement from './components/AgentManagement';
import ChatInterface from './components/ChatInterface';
import { Agent, ChatMessage, SystemStats } from './types';
import { generateMockAgents, generateMockStats } from './utils/mockData';
import { useTranslation, languages } from './utils/translations';

function App() {
  const [language, setLanguage] = useState<string>('ru');
  const { t } = useTranslation(language);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'management' | 'chat'>('dashboard');
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [messages, setMessages] = useState<{ [agentId: string]: ChatMessage[] }>({});

  useEffect(() => {
    // Initialize with mock data
    const mockAgents = generateMockAgents(language);
    setAgents(mockAgents);
    setSystemStats(generateMockStats());

    // Initialize empty message arrays for each agent
    const initialMessages: { [agentId: string]: ChatMessage[] } = {};
    mockAgents.forEach(agent => {
      initialMessages[agent.id] = [];
    });
    setMessages(initialMessages);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        performance: {
          ...agent.performance,
          efficiency: Math.max(0, Math.min(100, agent.performance.efficiency + (Math.random() - 0.5) * 2)),
          accuracy: Math.max(0, Math.min(100, agent.performance.accuracy + (Math.random() - 0.5) * 2)),
        }
      })));
      setSystemStats(generateMockStats());
    }, 3000);

    return () => clearInterval(interval);
  }, [language]);

  const addAgent = (agent: Agent) => {
    setAgents(prev => [...prev, agent]);
    setMessages(prev => ({ ...prev, [agent.id]: [] }));
  };

  const removeAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    setMessages(prev => {
      const { [agentId]: removed, ...rest } = prev;
      return rest;
    });
    if (selectedAgent?.id === agentId) {
      setSelectedAgent(null);
      setActiveView('dashboard');
    }
  };

  const updateAgent = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    ));
  };

  const sendMessage = (agentId: string, message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [agentId]: [...(prev[agentId] || []), newMessage]
    }));

    // Simulate AI response
    setTimeout(() => {
      const responses = language === 'ru' ? [
        "Я обрабатываю ваш запрос и анализирую паттерны данных.",
        "Основываясь на моих обучающих данных, вот мой анализ ситуации.",
        "Я завершил задачу и сгенерировал следующие выводы.",
        "Позвольте мне найти наиболее релевантную информацию, используя мою базу знаний.",
        "Я сотрудничаю с другими агентами, чтобы предоставить вам исчерпывающий ответ.",
      ] : [
        "I'm processing your request and analyzing the data patterns.",
        "Based on my training data, here's my analysis of the situation.",
        "I've completed the task and generated the following insights.",
        "Let me search for the most relevant information using my knowledge base.",
        "I'm collaborating with other agents to provide you with a comprehensive answer.",
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages(prev => ({
        ...prev,
        [agentId]: [...(prev[agentId] || []), aiResponse]
      }));
    }, 1000 + Math.random() * 2000);
  };

  const openChat = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveView('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-sm shadow-lg shadow-green-400/50"></div>
              </div>
              <h1 className="text-2xl font-light text-white tracking-wide font-mono">{t('ai_agent_hub')}</h1>
              <span className="text-sm text-green-400/80 font-light font-mono">{t('core_management_center')}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded px-3 py-1 text-sm text-gray-300 focus:outline-none focus:border-green-500/50 pr-8 font-mono"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400/60 pointer-events-none" />
              </div>
              
              <nav className="flex items-center space-x-1">
              {[
                  { id: 'dashboard', label: t('dashboard') },
                  { id: 'management', label: t('management') },
                  { id: 'chat', label: t('agent_chat') }
              ].map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => setActiveView(nav.id as any)}
                    className={`px-4 py-2 rounded font-light transition-all duration-200 font-mono ${
                    activeView === nav.id
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20'
                        : 'text-gray-400 hover:text-green-400 hover:bg-gray-800/50'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
            </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === 'dashboard' && (
          <Dashboard 
            agents={agents}
            systemStats={systemStats}
            onOpenChat={openChat}
            onManageAgents={() => setActiveView('management')}
            language={language}
          />
        )}

        {activeView === 'management' && (
          <AgentManagement
            agents={agents}
            onAddAgent={addAgent}
            onRemoveAgent={removeAgent}
            onUpdateAgent={updateAgent}
            language={language}
          />
        )}

        {activeView === 'chat' && selectedAgent && (
          <ChatInterface
            agent={selectedAgent}
            messages={messages[selectedAgent.id] || []}
            onSendMessage={(message) => sendMessage(selectedAgent.id, message)}
            onBack={() => setActiveView('dashboard')}
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default App;