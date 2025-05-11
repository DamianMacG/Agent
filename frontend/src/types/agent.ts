// src/types/agent.ts


export type Agent = {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'error';
  role: string;
  goal: string;
};
