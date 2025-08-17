import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    getPages(state, action) {
      const { id, header, data } = action.payload;

      state.pages.push({
        id,
        header,
        data,
        completed: false,
      });
    },
  },
});

//Экшны
export const { actions, reducer } = pagesSlice;
