import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/AuthFeature"
import TodoReducer from '../features/TodoFeature';

export const store = configureStore({
  reducer: {
    user: authReducer,
    todos: TodoReducer
  },
});
