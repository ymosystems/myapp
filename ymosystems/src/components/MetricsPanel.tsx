import React from 'react';
import { BarChart3, TrendingUp, Zap } from 'lucide-react';
import { Agent } from '../types';
import { useTranslation } from '../utils/translations';

interface MetricsPanelProps {
  agents: Agent[];
  language: string;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ agents, language }) => {
  const { t } = useTranslation(language);
  const avgPerformance = {
    accuracy: agents.reduce((acc, agent) => acc + agent.performance.accuracy, 0) / (agents.length || 1),
    efficiency: agents.reduce((acc, agent) => acc + agent.performance.efficiency, 0) / (agents.length || 1),
    value: agents.reduce((acc, agent) => acc + agent.performance.value, 0) / (agents.length || 1),
    demand: agents.reduce((acc, agent) => acc + agent.performance.demand, 0) / (agents.length || 1),
  };

  const metrics = [
    { name: t('accuracy'), value: avgPerformance.accuracy, color: 'bg-green-500/20 border-green-500/50', icon: TrendingUp },
    { name: t('efficiency'), value: avgPerformance.efficiency, color: 'bg-blue-500/20 border-blue-500/50', icon: Zap },
    { name: t('value'), value: avgPerformance.value, color: 'bg-purple-500/20 border-purple-500/50', icon: BarChart3 },
    { name: t('demand'), value: avgPerformance.demand, color: 'bg-cyan-500/20 border-cyan-500/50', icon: TrendingUp },
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded p-6 backdrop-blur-sm">
      <h2 className="text-xl font-thin text-white mb-6 flex items-center font-mono">
        <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
        {t('fleet_performance_metrics')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const iconColors = ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-cyan-400'];
          return (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className={`w-12 h-12 ${metric.color} border rounded flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${iconColors[index]}`} />
                </div>
              </div>
              
              <h3 className="text-sm font-light text-gray-400 mb-2 uppercase tracking-wide font-mono">{metric.name}</h3>
              <p className={`text-2xl font-thin mb-2 font-mono ${iconColors[index]}`}>{Math.round(metric.value)}%</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-700/50 rounded-full h-1">
                <div 
                  className={`${metric.color.split(' ')[0].replace('/20', '/60')} h-1 rounded-full transition-all duration-300 shadow-lg`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance trends */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-light text-white mb-4 font-mono">{t('performance_trends')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded p-3">
            <span className="text-green-400 font-light font-mono">↗ +12.5%</span>
            <span className="text-gray-300 ml-2 font-light font-mono">{t('overall_efficiency_week')}</span>
          </div>
          <div className="bg-gray-900/50 border border-gray-700/50 rounded p-3">
            <span className="text-blue-400 font-light font-mono">↗ +8.2%</span>
            <span className="text-gray-300 ml-2 font-light font-mono">{t('task_completion_rate')}</span>
          </div>
          <div className="bg-gray-900/50 border border-gray-700/50 rounded p-3">
            <span className="text-purple-400 font-light font-mono">↗ +15.7%</span>
            <span className="text-gray-300 ml-2 font-light font-mono">{t('agent_response_accuracy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;