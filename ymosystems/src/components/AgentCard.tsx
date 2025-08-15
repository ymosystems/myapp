import React from 'react';
import { MessageCircle, Settings, Activity, TrendingUp, Brain, Search, Users } from 'lucide-react';
import { Agent } from '../types';
import { useTranslation } from '../utils/translations';

interface AgentCardProps {
  agent: Agent;
  onChat: () => void;
  onEdit: () => void;
  language: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onChat, onEdit, language }) => {
  const { t } = useTranslation(language);
  
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-400 shadow-lg shadow-green-400/50';
      case 'idle': return 'bg-yellow-400 shadow-lg shadow-yellow-400/50';
      case 'error': return 'bg-red-400 shadow-lg shadow-red-400/50';
      case 'training': return 'bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50';
      default: return 'bg-gray-400 shadow-lg shadow-gray-400/50';
    }
  };

  const getTypeIcon = (type: Agent['type']) => {
    switch (type) {
      case 'search': return Search;
      case 'crew': return Users;
      case 'custom': return Brain;
      case 'supervisor': return Activity;
      default: return Brain;
    }
  };

  const TypeIcon = getTypeIcon(agent.type);

  return (
    <div className="group relative bg-gray-800/50 border border-gray-700/50 rounded p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 backdrop-blur-sm hover:border-green-500/30">
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
        <span className="text-xs text-gray-400 capitalize font-light font-mono">{t(agent.status)}</span>
      </div>

      {/* Agent info */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center">
            <TypeIcon className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-light text-white group-hover:text-green-400 transition-colors font-mono">
              {agent.name}
            </h3>
            <p className="text-sm text-gray-400 font-light font-mono">{agent.role}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 line-clamp-2 font-light">
          {agent.description}
        </p>
      </div>

      {/* Performance metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { label: t('accuracy'), value: agent.performance.accuracy, color: 'text-green-400' },
          { label: t('efficiency'), value: agent.performance.efficiency, color: 'text-blue-400' },
          { label: t('value'), value: agent.performance.value, color: 'text-purple-400' },
          { label: t('demand'), value: agent.performance.demand, color: 'text-cyan-400' }
        ].map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-gray-500 font-light uppercase tracking-wide font-mono">{metric.label}</p>
            <p className={`font-light text-lg font-mono ${metric.color}`}>{Math.round(metric.value)}%</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-light font-mono">
        <span>{t('tasks')}: {agent.totalTasks}</span>
        <span>{t('success')}: {agent.successRate}%</span>
      </div>

      {/* Last activity */}
      <p className="text-xs text-gray-500 mb-4 font-light font-mono">
        {t('last_active')}: {agent.lastActivity.toLocaleDateString()}
      </p>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onChat}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-light rounded border border-green-500/50 transition-all duration-200 font-mono hover:shadow-lg hover:shadow-green-500/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t('chat')}</span>
        </button>
        
        <button
          onClick={onEdit}
          className="px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-gray-300 rounded border border-gray-600/50 transition-all duration-200"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AgentCard;