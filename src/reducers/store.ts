import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    tasksReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
