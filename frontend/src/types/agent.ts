// src/types/agent.ts

export type AgentStatus = 'idle' | 'running' | 'error';

export type Agent = {
  id: string;
  name: string;
  status: AgentStatus;
};
