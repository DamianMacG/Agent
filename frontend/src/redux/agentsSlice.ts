// src/redux/agentsSlice.ts
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
  },
});

export const { setAgents, addAgent } = agentsSlice.actions;
export default agentsSlice.reducer;
