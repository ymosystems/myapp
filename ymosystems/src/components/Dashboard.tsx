import React from 'react';
import { Activity, Brain, TrendingUp, Shield, Plus, Users } from 'lucide-react';
import AgentCard from './AgentCard';
import MainAIPanel from './MainAIPanel';
import MetricsPanel from './MetricsPanel';
import { Agent, SystemStats } from '../types';
import { useTranslation } from '../utils/translations';

interface DashboardProps {
  agents: Agent[];
  systemStats: SystemStats | null;
  onOpenChat: (agent: Agent) => void;
  onManageAgents: () => void;
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ agents, systemStats, onOpenChat, onManageAgents, language }) => {
  const { t } = useTranslation(language);
  const mainAgent = agents.find(agent => agent.type === 'supervisor');
  const regularAgents = agents.filter(agent => agent.type !== 'supervisor');

  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: t('total_agents'),
            value: systemStats?.totalAgents || 0,
            icon: Users,
            color: 'bg-green-500/20 border-green-500/50',
            trend: '+12%'
          },
          {
            title: t('active_now'),
            value: systemStats?.activeAgents || 0,
            icon: Activity,
            color: 'bg-blue-500/20 border-blue-500/50',
            trend: '+5%'
          },
          {
            title: t('tasks_completed'),
            value: systemStats?.totalTasks || 0,
            icon: TrendingUp,
            color: 'bg-purple-500/20 border-purple-500/50',
            trend: '+28%'
          },
          {
            title: t('system_health'),
            value: `${systemStats?.systemHealth || 0}%`,
            icon: Shield,
            color: 'bg-cyan-500/20 border-cyan-500/50',
            trend: '+2%'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-light uppercase tracking-wide font-mono">{stat.title}</p>
                <p className="text-3xl font-thin text-white mt-2 font-mono">{stat.value}</p>
                <p className="text-green-400 text-xs mt-2 font-light font-mono">{stat.trend}</p>
              </div>
              <div className={`w-12 h-12 rounded border ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main AI Agent Panel */}
      {mainAgent && (
        <MainAIPanel agent={mainAgent} systemStats={systemStats} language={language} />
      )}

      {/* Performance Metrics */}
      <MetricsPanel agents={regularAgents} language={language} />

      {/* Agent Grid */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-thin text-white font-mono">{t('connected_agents')}</h2>
          <p className="text-gray-400 mt-1 font-light font-mono">{t('manage_ai_workforce')}</p>
        </div>
        
        <button
          onClick={onManageAgents}
          className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-light rounded border border-green-500/50 transition-all duration-200 font-mono hover:shadow-lg hover:shadow-green-500/20"
        >
          <Plus className="w-4 h-4 inline-block mr-2" />
          {t('add_new_agent')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularAgents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onChat={() => onOpenChat(agent)}
            onEdit={() => onManageAgents()}
            language={language}
          />
        ))}
        
        {regularAgents.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Brain className="w-16 h-16 text-green-400/60 mb-4" />
            <h3 className="text-xl font-light text-gray-300 mb-2 font-mono">{t('no_agents_connected')}</h3>
            <p className="text-gray-400 mb-6 max-w-md font-light font-mono">
              {t('start_building_workforce')}
            </p>
            <button
              onClick={onManageAgents}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-light rounded border border-green-500/50 transition-all duration-200 font-mono hover:shadow-lg hover:shadow-green-500/20"
            >
              {t('add_first_agent')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;