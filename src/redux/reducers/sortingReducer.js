import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortingMode: 'asc',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortingMode: (state, action) => {
      state.sortingMode = action.payload; 
    },
  },
});

export const { setSortingMode } = sortingSlice.actions;
export default sortingSlice.reducer;