import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideCart: false,
};

const sideSlice = createSlice({
  name: "side",
  initialState,
  reducers: {
    setSideCart: (state, action) => {
      state.sideCart = action.payload;
    },
  },
});

export const { setSideCart } = sideSlice.actions;
export default sideSlice.reducer;
