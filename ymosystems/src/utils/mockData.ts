import { Agent, SystemStats } from '../types';

export const generateMockAgents = (language: string = 'ru'): Agent[] => {
  const agentData = {
    ru: {
      supervisor: {
        name: 'АРИЯ-X1',
        role: 'Супервизор ИИ-Системы',
        description: 'Главный ИИ-агент, отвечающий за мониторинг всех системных операций, оптимизацию производительности и стратегическое принятие решений во всей экосистеме ИИ.',
      },
      search: {
        name: 'ДатаХантер Про',
        role: 'Специалист по Исследованиям',
        description: 'Продвинутый поисковый агент на базе Brave Search API. Специализируется на сборе данных в реальном времени, маркетинговых исследованиях и конкурентной разведке.',
      },
      crew: {
        name: 'ТаскФорс Альфа',
        role: 'Многоагентный Оркестратор',
        description: 'Агент координации на базе CrewAI, который управляет сложными многоэтапными рабочими процессами и оркестрирует команды специализированных агентов.',
      },
      financial: {
        name: 'КвантАналитик',
        role: 'Эксперт по Финансовому Анализу',
        description: 'Специально обученный агент финансового анализа, специализирующийся на рыночных трендах, оценке рисков и рекомендациях по инвестиционным стратегиям.',
      },
      creative: {
        name: 'КреативДвижок',
        role: 'Специалист по Генерации Контента',
        description: 'Продвинутый агент создания контента, сосредоточенный на генерации высококачественных маркетинговых материалов, технической документации и креативного письма.',
      }
    },
    en: {
      supervisor: {
        name: 'ARIA-X1',
        role: 'AI System Supervisor',
        description: 'Main AI Agent responsible for monitoring all system operations, performance optimization, and strategic decision making across the entire AI ecosystem.',
      },
      search: {
        name: 'DataHunter Pro',
        role: 'Research Specialist',
        description: 'Advanced search agent powered by Brave Search API. Specializes in real-time data gathering, market research, and competitive intelligence.',
      },
      crew: {
        name: 'TaskForce Alpha',
        role: 'Multi-Agent Orchestrator',
        description: 'CrewAI-powered coordination agent that manages complex multi-step workflows and orchestrates teams of specialized agents.',
      },
      financial: {
        name: 'QuantAnalyst',
        role: 'Financial Analysis Expert',
        description: 'Custom-trained financial analysis agent specializing in market trends, risk assessment, and investment strategy recommendations.',
      },
      creative: {
        name: 'CreativeEngine',
        role: 'Content Generation Specialist',
        description: 'Advanced content creation agent focused on generating high-quality marketing materials, technical documentation, and creative writing.',
      }
    }
  };

  const data = agentData[language] || agentData['en'];

  return [
    {
      id: 'supervisor-001',
      name: data.supervisor.name,
      role: data.supervisor.role,
      description: data.supervisor.description,
      apiKey: 'sup_xk7m9n2p4q8w1e5r7t9y',
      status: 'active',
      type: 'supervisor',
      performance: {
        accuracy: 97.8,
        efficiency: 94.2,
        uniqueness: 89.5,
        value: 98.1,
        demand: 95.7,
      },
      lastActivity: new Date(),
      lastTraining: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalTasks: 1247,
      successRate: 97.3,
    },
    {
      id: 'search-001',
      name: data.search.name,
      role: data.search.role,
      description: data.search.description,
      apiKey: 'brave_api_key_xk7m9n2p4q',
      status: 'active',
      type: 'search',
      performance: {
        accuracy: 92.5,
        efficiency: 88.7,
        uniqueness: 85.3,
        value: 91.8,
        demand: 87.4,
      },
      lastActivity: new Date(Date.now() - 5 * 60 * 1000),
      lastTraining: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalTasks: 342,
      successRate: 91.2,
    },
    {
      id: 'crew-001',
      name: data.crew.name,
      role: data.crew.role,
      description: data.crew.description,
      apiKey: 'crew_api_key_m8n2p5q7w9e',
      status: 'active',
      type: 'crew',
      performance: {
        accuracy: 89.3,
        efficiency: 91.6,
        uniqueness: 87.9,
        value: 93.2,
        demand: 89.8,
      },
      lastActivity: new Date(Date.now() - 12 * 60 * 1000),
      lastTraining: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      totalTasks: 156,
      successRate: 88.7,
    },
    {
      id: 'custom-001',
      name: data.financial.name,
      role: data.financial.role,
      description: data.financial.description,
      apiKey: 'custom_fin_api_p9q2w5e8r1t',
      status: 'idle',
      type: 'custom',
      performance: {
        accuracy: 94.1,
        efficiency: 86.3,
        uniqueness: 92.7,
        value: 89.5,
        demand: 84.2,
      },
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      lastTraining: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      totalTasks: 89,
      successRate: 93.8,
    },
    {
      id: 'custom-002',
      name: data.creative.name,
      role: data.creative.role,
      description: data.creative.description,
      apiKey: 'custom_content_api_w3e6r9t2y',
      status: 'training',
      type: 'custom',
      performance: {
        accuracy: 87.6,
        efficiency: 92.4,
        uniqueness: 95.8,
        value: 86.9,
        demand: 91.3,
      },
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      lastTraining: new Date(),
      totalTasks: 234,
      successRate: 89.4,
    },
  ];
};

export const generateMockStats = (): SystemStats => {
  return {
    totalAgents: 5,
    activeAgents: 4,
    totalTasks: 2068,
    avgPerformance: 91.2,
    systemHealth: 94 + Math.random() * 6,
    uptime: '24h 37m',
  };
};