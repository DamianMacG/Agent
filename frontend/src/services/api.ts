import type { Agent } from '../types/agent';
import type { Task } from '../types/task';

export async function fetchAgents(): Promise<Agent[]> {
  // Replace with real API call later
  return [
    { id: '1', name: 'Agent Alpha', status: 'running', role: 'Researcher', goal: 'Find insights' },
    { id: '2', name: 'Agent Beta', status: 'idle', role: 'Writer', goal: 'Draft report' },
    { id: '3', name: 'Agent Gamma', status: 'error', role: 'Coder', goal: 'Fix bugs' },
  ];
}

export async function fetchTasks(): Promise<Task[]> {
  return [
    { id: '101', title: 'Generate Summary Report', status: 'pending' },
    { id: '102', title: 'Refactor Agent Logic', status: 'in_progress' },
    { id: '103', title: 'Push Deployment', status: 'done' },
  ];
}