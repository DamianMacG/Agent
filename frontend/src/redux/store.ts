// src/redux/store.ts

// Import Redux Toolkit's configureStore to create a Redux store with built-in good defaults
import { configureStore } from '@reduxjs/toolkit';

// Import the slice reducers that manage state for agents and tasks
import agentsReducer from './agentsSlice';
import tasksReducer from './tasksSlice';

// Create and export the Redux store
// This sets up the root reducer with two slices: 'agents' and 'tasks'
export const store = configureStore({
  reducer: {
    agents: agentsReducer, // Manages state for agent data
    tasks: tasksReducer,   // Manages state for task data
  },
});

// Type helper to get the full state object shape
// Use this in useSelector for proper typing of Redux state
export type RootState = ReturnType<typeof store.getState>;

// Type helper for the dispatch function with proper typing
// Use this in useDispatch for full type safety on actions
export type AppDispatch = typeof store.dispatch;

