import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgents, addAgent } from '../redux/agentsSlice';
import { setTasks } from '../redux/tasksSlice';
import type { RootState } from '../redux/store';
import AgentCard from '../components/AgentCard';
import Spinner from '../components/UI/Spinner';
import TaskPanel from '../components/TaskPanel';
import AddAgentModal from '../components/AddAgentModal';
import type { Agent } from '../types/agent';
import toast, {Toaster} from 'react-hot-toast';
import { fetchAgents, fetchTasks } from '../services/api';

export default function Dashboard() {
  const dispatch = useDispatch();

  // Select agents and tasks from the Redux store
  const agents = useSelector((state: RootState) => state.agents.list);
  const tasks = useSelector((state: RootState) => state.tasks.list);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  setLoading(true);
  setError(null);
  Promise.all([fetchAgents(), fetchTasks()])
    .then(([agents, tasks]) => {
      dispatch(setAgents(agents));
      dispatch(setTasks(tasks));
      setLoading(false);
    })
    .catch(() => {
      setError('Failed to load data.');
      setLoading(false);
    });
}, [dispatch]);

  const handleCreateAgent = (agent: { name: string; role: string; goal: string }) => {
    try{
    // Generate a unique id for the new agent (for demo purposes)
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: agent.name,
      status: 'idle', // default status
      role: agent.role,
      goal: agent.goal,
    };
    dispatch(addAgent(newAgent));
    setModalOpen(false);
    toast.success('Agent created successfully!');
  } catch {
    toast.error('Failed to create agent. Please try again.');
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right"/>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Agent Dashboard</h1>

    {/* Error message */}
    {error && (
      <div className="mb-4 text-center text-red-600 font-semibold">
        {error}
      </div>
    )}

      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Agent
        </button>
      </div>

      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateAgent}
      />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No agents yet. Add one!</div>
            ) : (
              agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  id={agent.id}
                  name={agent.name}
                  status={agent.status}
                  role={agent.role}
                  goal={agent.goal}
                />
              ))
            )}
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No tasks yet.</div>
            ) : (
              tasks.map((task) => (
                <TaskPanel key={task.id} task={task} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}