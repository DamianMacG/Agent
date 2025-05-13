import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { updateAgent, deleteAgent } from '../redux/agentsSlice';
import { useState } from 'react';

export default function AgentConfig() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) =>
    state.agents.list.find(a => a.id === agentId)
  );

  const [form, setForm] = useState({
    name: agent?.name || '',
    role: agent?.role || '',
    goal: agent?.goal || '',
  });

  if (!agent) return <div>Agent not found.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateAgent({ ...agent, ...form }));
    navigate('/'); // or show a toast
  };

  const handleDelete = () => {
    dispatch(deleteAgent(agent.id));
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Agent</h2>
      <label className="block mb-2">Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <label className="block mb-2">Role</label>
      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <label className="block mb-2">Goal</label>
      <input
        name="goal"
        value={form.goal}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
          Save
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>
          Delete
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
}