// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgents } from '../redux/agentsSlice';
import type { RootState } from '../redux/store';
import AgentCard from '../components/AgentCard';
import type { Agent } from '../types/agent';

export default function Dashboard() {
  const dispatch = useDispatch();
  const agents = useSelector((state: RootState) => state.agents.list);

  useEffect(() => {
    const mockAgents: Agent[] = [
      { id: '1', name: 'Agent Alpha', status: 'running' },
      { id: '2', name: 'Agent Beta', status: 'idle' },
      { id: '3', name: 'Agent Gamma', status: 'error' },
    ];
    dispatch(setAgents(mockAgents));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Agent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} name={agent.name} status={agent.status} />
        ))}
      </div>
    </div>
  );
}
