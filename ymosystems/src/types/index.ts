export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  apiKey: string;
  status: 'active' | 'idle' | 'error' | 'training';
  performance: {
    accuracy: number;
    efficiency: number;
    uniqueness: number;
    value: number;
    demand: number;
  };
  lastActivity: Date;
  lastTraining: Date;
  totalTasks: number;
  successRate: number;
  type: 'search' | 'crew' | 'custom' | 'supervisor';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export interface SystemStats {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  avgPerformance: number;
  systemHealth: number;
  uptime: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}