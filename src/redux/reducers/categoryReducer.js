import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const { actions, reducer } = categorySlice;
