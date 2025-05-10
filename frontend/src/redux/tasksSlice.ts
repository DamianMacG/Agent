// src/redux/tasksSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
};

interface TasksState {
  list: Task[];
}

const initialState: TasksState = {
  list: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.list = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
