import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    filesData: [],
  },
  reducers: {
    setFilesData: (state, action) => {
      state.filesData = action.payload;
    },
  },
});

export const { setFilesData } = filesSlice.actions;

export default filesSlice.reducer;
