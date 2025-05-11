import type { Task } from '../types/task';

type TaskPanelProps = {
  task: Task;
};

const statusColors = {
  pending: 'bg-yellow-300',
  in_progress: 'bg-blue-400',
  done: 'bg-green-400',
};

/**
 * Displays a task card with title and status badge.
 * Used to visualise task status in the dashboard.
 */
export default function TaskPanel({ task }: TaskPanelProps) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">{task.title}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${statusColors[task.status]}`}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
