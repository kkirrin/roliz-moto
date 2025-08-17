import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'grid',
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload; 
    },
  },
});

export const { setViewMode } = viewSlice.actions;
export default viewSlice.reducer;
