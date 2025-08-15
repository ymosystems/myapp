import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Key, Search, Users, Brain, Crown } from 'lucide-react';
import { Agent } from '../types';
import { useTranslation } from '../utils/translations';

interface AgentManagementProps {
  agents: Agent[];
  onAddAgent: (agent: Agent) => void;
  onRemoveAgent: (agentId: string) => void;
  onUpdateAgent: (agent: Agent) => void;
  language: string;
}

const AgentManagement: React.FC<AgentManagementProps> = ({
  agents,
  onAddAgent,
  onRemoveAgent,
  onUpdateAgent,
  language
}) => {
  const { t } = useTranslation(language);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    apiKey: '',
    type: 'custom' as Agent['type']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAgent) {
      onUpdateAgent({
        ...editingAgent,
        ...formData,
        performance: editingAgent.performance,
        status: editingAgent.status,
        lastActivity: editingAgent.lastActivity,
        lastTraining: editingAgent.lastTraining,
        totalTasks: editingAgent.totalTasks,
        successRate: editingAgent.successRate
      });
      setEditingAgent(null);
    } else {
      const newAgent: Agent = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        performance: {
          accuracy: 85 + Math.random() * 10,
          efficiency: 80 + Math.random() * 15,
          uniqueness: 75 + Math.random() * 20,
          value: 90 + Math.random() * 10,
          demand: 70 + Math.random() * 25,
        },
        lastActivity: new Date(),
        lastTraining: new Date(),
        totalTasks: Math.floor(Math.random() * 100) + 50,
        successRate: 85 + Math.random() * 10,
      };
      onAddAgent(newAgent);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      description: '',
      apiKey: '',
      type: 'custom'
    });
    setShowAddForm(false);
    setEditingAgent(null);
  };

  const startEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      role: agent.role,
      description: agent.description,
      apiKey: agent.apiKey,
      type: agent.type
    });
    setShowAddForm(true);
  };

  const getTypeIcon = (type: Agent['type']) => {
    switch (type) {
      case 'search': return Search;
      case 'crew': return Users;
      case 'supervisor': return Crown;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-thin text-white font-mono">{t('agent_management')}</h1>
          <p className="text-gray-400 mt-2 font-light font-mono">{t('configure_manage_workforce')}</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-light rounded border border-green-500/50 transition-all duration-200 flex items-center space-x-2 font-mono hover:shadow-lg hover:shadow-green-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>{t('add_new_agent_btn')}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded p-6 backdrop-blur-sm">
          <h2 className="text-xl font-light text-white mb-6 font-mono">
            {editingAgent ? t('edit_agent') : t('add_new_agent_form')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 uppercase tracking-wide font-mono">{t('agent_name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors font-light font-mono"
                  placeholder="например, ИИ Аналитик Данных"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 uppercase tracking-wide font-mono">{t('role')}</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors font-light font-mono"
                  placeholder="например, Специалист по Исследованиям"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 uppercase tracking-wide font-mono">{t('agent_type')}</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Agent['type'] })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded text-white focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors font-light font-mono"
                >
                  <option value="custom">{t('custom_agent')}</option>
                  <option value="search">{t('search_agent')}</option>
                  <option value="crew">{t('crewai_agent')}</option>
                  <option value="supervisor">{t('supervisor_agent')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-300 mb-2 flex items-center uppercase tracking-wide font-mono">
                  <Key className="w-4 h-4 mr-2" />
                  {t('api_key')}
                </label>
                <input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors font-light font-mono"
                  placeholder="Введите API ключ..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-gray-300 mb-2 uppercase tracking-wide font-mono">{t('description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-colors resize-none font-light font-mono"
                placeholder="Опишите возможности и назначение агента..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-gray-300 font-light rounded border border-gray-600/50 transition-colors font-mono"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-light rounded border border-green-500/50 transition-all duration-200 font-mono hover:shadow-lg hover:shadow-green-500/20"
              >
                {editingAgent ? t('update_agent') : t('create_agent')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Agent List */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-gray-700/50">
          <h2 className="text-lg font-light text-white font-mono">{t('connected_agents_count')} ({agents.length})</h2>
        </div>
        
        <div className="divide-y divide-gray-700/50">
          {agents.map(agent => {
            const TypeIcon = getTypeIcon(agent.type);
            return (
              <div key={agent.id} className="px-6 py-4 hover:bg-gray-700/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-green-400" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-light text-white font-mono">{agent.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                          agent.status === 'idle' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                          agent.status === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        }`}>
                          {t(agent.status)}
                        </span>
                        {agent.type === 'supervisor' && (
                          <Crown className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 font-light font-mono">{agent.role}</p>
                      <p className="text-xs text-gray-500 mt-1 font-light">{agent.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-400 font-light font-mono">
                        {t('accuracy')}: <span className="text-green-400">{Math.round(agent.performance.accuracy)}%</span>
                      </p>
                      <p className="text-xs text-gray-500 font-light font-mono">
                        {agent.totalTasks} {t('tasks').toLowerCase()}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => startEdit(agent)}
                      className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 rounded transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onRemoveAgent(agent.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-700/50 rounded transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {agents.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Brain className="w-12 h-12 text-green-400/60 mx-auto mb-4" />
              <p className="text-gray-400 font-light font-mono">{t('no_agents_configured')}</p>
              <p className="text-sm text-gray-500 mt-1 font-light font-mono">{t('click_add_to_start')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;