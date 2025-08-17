import { createSlice } from "@reduxjs/toolkit";

/**
 * @types
 *  select - мульти Выбор галочкой
 *  range - рэндж. От и до
 *  oneSelect - ВЫбор одной галочки
 *  drop - Выпадающий список
 **/

const initialState = [
  {
    id: 0,
    type: "category",
    name: "Фильтр по категориям",
    minvalue: 0,
    maxvalue: 0,
    values: [],
  },
];

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    createFilters: (state, action) => {
      state[0].values = [];
      state[0].values.push(action.payload);
    },
    addFilters: (state, action) => {},
  },
});

export const { reducer, actions } = filterSlice;
