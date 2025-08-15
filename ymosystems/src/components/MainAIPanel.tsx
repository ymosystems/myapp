import React from 'react';
import { Crown, Activity, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { Agent, SystemStats } from '../types';
import { useTranslation } from '../utils/translations';

interface MainAIPanelProps {
  agent: Agent;
  systemStats: SystemStats | null;
  language: string;
}

const MainAIPanel: React.FC<MainAIPanelProps> = ({ agent, systemStats, language }) => {
  const { t } = useTranslation(language);
  const healthLevel = systemStats?.systemHealth || 0;
  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const insights = [
    t('insight_1'),
    t('insight_2'),
    t('insight_3'),
    t('insight_4'),
  ];

  return (
    <div className="bg-gray-800/50 border-2 border-green-500/50 rounded p-6 shadow-lg shadow-green-500/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center">
            <Crown className="w-6 h-6 text-green-400 shadow-lg shadow-green-400/50" />
          </div>
          <div>
            <h2 className="text-xl font-thin text-white flex items-center space-x-2 font-mono">
              <span>{agent.name}</span>
              <span className="text-green-400 text-sm font-light">[{t('supervisor')}]</span>
            </h2>
            <p className="text-gray-400 font-light font-mono">{agent.role}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-light uppercase tracking-wide font-mono">{t('system_health')}</p>
            <p className={`text-2xl font-bold ${getHealthColor(healthLevel)}`}>
              {healthLevel}%
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${agent.status === 'active' ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-400'}`}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Performance Overview */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded p-4">
          <h3 className="text-sm font-light text-gray-300 mb-3 flex items-center uppercase tracking-wide font-mono">
            <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
            {t('performance_overview')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('accuracy')}</span>
              <span className="text-xs text-green-400 font-mono">{Math.round(agent.performance.accuracy)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('efficiency')}</span>
              <span className="text-xs text-blue-400 font-mono">{Math.round(agent.performance.efficiency)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('value')}</span>
              <span className="text-xs text-purple-400 font-mono">{Math.round(agent.performance.value)}%</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded p-4">
          <h3 className="text-sm font-light text-gray-300 mb-3 flex items-center uppercase tracking-wide font-mono">
            <Shield className="w-4 h-4 mr-2 text-cyan-400" />
            {t('system_status')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('agents_online')}</span>
              <span className="text-xs text-cyan-400 font-mono">{systemStats?.activeAgents || 0}/{systemStats?.totalAgents || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('tasks_running')}</span>
              <span className="text-xs text-cyan-400 font-mono">{Math.floor(Math.random() * 10) + 5}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500 font-light font-mono">{t('uptime')}</span>
              <span className="text-xs text-cyan-400 font-mono">{systemStats?.uptime || '24h 15m'}</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded p-4">
          <h3 className="text-sm font-light text-gray-300 mb-3 flex items-center uppercase tracking-wide font-mono">
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
            {t('system_alerts')}
          </h3>
          <div className="space-y-2">
            <div className="text-xs text-green-400 font-light font-mono">{t('all_systems_operational')}</div>
            <div className="text-xs text-yellow-400 font-light font-mono">{t('training_recommended')}</div>
            <div className="text-xs text-blue-400 font-light font-mono">{t('performance_optimized')}</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded p-4">
        <h3 className="text-sm font-light text-gray-300 mb-3 flex items-center uppercase tracking-wide font-mono">
          <Activity className="w-4 h-4 mr-2 text-green-400" />
          {t('ai_supervisor_insights')}
        </h3>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div key={index} className="text-sm text-gray-300 flex items-start space-x-2 font-light font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0 shadow-lg shadow-green-400/50"></div>
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainAIPanel;