import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../features/files/FilesReducer';

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});