import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AgentCard from '../components/AgentCard';
import type { Agent } from '../types/agent';

const agent: Agent = {
  id: '1',
  name: 'Test Agent',
  status: 'idle',
  role: 'Tester',
  goal: 'Test things',
};

test('renders agent info', () => {
  render(
    <MemoryRouter>
      <AgentCard {...agent} />
    </MemoryRouter>
  );
  expect(screen.getByText('Test Agent')).toBeInTheDocument();
  expect(screen.getByText('idle')).toBeInTheDocument();
  expect(screen.getByText('Tester')).toBeInTheDocument();
  expect(screen.getByText('Test things')).toBeInTheDocument();
});

test('calls onRunTask when button clicked', () => {
  const onRunTask = jest.fn() as (agentId: string) => void;
  render(
    <MemoryRouter>
      <AgentCard {...agent} onRunTask={onRunTask} />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Run Task'));
  expect(onRunTask).toHaveBeenCalledWith('1');
});