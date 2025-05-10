import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgents } from '../redux/agentsSlice';
import { setTasks } from '../redux/tasksSlice';
import type { RootState } from '../redux/store';
import AgentCard from '../components/AgentCard';
import Spinner from '../components/UI/Spinner';
import TaskPanel from '../components/TaskPanel';
import type { Agent } from '../types/agent';
import type { Task } from '../types/task';

export default function Dashboard() {
  const dispatch = useDispatch();

  // Select agents and tasks from the Redux store
  const agents = useSelector((state: RootState) => state.agents.list);
  const tasks = useSelector((state: RootState) => state.tasks.list);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fake data for agents
      const mockAgents: Agent[] = [
        { id: '1', name: 'Agent Alpha', status: 'running' },
        { id: '2', name: 'Agent Beta', status: 'idle' },
        { id: '3', name: 'Agent Gamma', status: 'error' },
      ];

      // Fake data for tasks
      const mockTasks: Task[] = [
        { id: '101', title: 'Generate Summary Report', status: 'pending' },
        { id: '102', title: 'Refactor Agent Logic', status: 'in_progress' },
        { id: '103', title: 'Push Deployment', status: 'done' },
      ];

      dispatch(setAgents(mockAgents));
      dispatch(setTasks(mockTasks));
      setLoading(false);
    }, 1000); // simulate API call delay

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Agent Dashboard</h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} name={agent.name} status={agent.status} />
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <TaskPanel key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

