import type { Agent } from '../types/agent';

type AgentCardProps = Agent & {
  onRunTask?: (agentId: string) => void;
};

export default function AgentCard({ id, name, status, role, goal, onRunTask }: AgentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full text-white ${
          status === 'running' ? 'bg-blue-500' :
          status === 'idle' ? 'bg-gray-400' : 'bg-red-500'
        }`}>
          {status}
        </span>
      </div>
      <div className="text-sm text-gray-700 mb-1"><strong>Role:</strong> {role}</div>
      <div className="text-sm text-gray-700 mb-2"><strong>Goal:</strong> {goal}</div>
      {onRunTask && (
        <button
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
          onClick={() => onRunTask(id)}
        >
          Run Task
        </button>
      )}
    </div>
  );
}