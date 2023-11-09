import { createSlice } from '@reduxjs/toolkit';
import { taskDataType } from '../components/addTask';

type TasksType = {
  tasks: taskDataType[];
};

const initialState: TasksType = {
  tasks: [],
};

const TasksSlice = createSlice({
  name: 'TasksSlice',
  initialState,
  reducers: {
    updateTask(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { updateTask } = TasksSlice.actions;
export default TasksSlice.reducer;
