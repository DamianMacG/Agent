// src/components/AgentCard.tsx
type AgentCardProps = {
  name: string;
  status: 'idle' | 'running' | 'error';
};

const statusColors = {
  idle: 'bg-gray-300',
  running: 'bg-green-400',
  error: 'bg-red-400',
};

export default function AgentCard({ name, status }: AgentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <span className={`px-3 py-1 text-sm rounded-full text-white ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
