import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Agent } from '../types/agent';

interface AgentsState {
  list: Agent[];
}

const initialState: AgentsState = {
  list: [],
};

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents(state, action: PayloadAction<Agent[]>) {
      state.list = action.payload;
    },
    addAgent(state, action: PayloadAction<Agent>) {
      state.list.push(action.payload);
    },
    updateAgent(state, action: PayloadAction<Agent>) {
      const idx = state.list.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    deleteAgent(state, action: PayloadAction<string>) {
      state.list = state.list.filter(a => a.id !== action.payload);
    },
  },
});

export const { setAgents, addAgent, updateAgent, deleteAgent } = agentsSlice.actions;
export default agentsSlice.reducer;
