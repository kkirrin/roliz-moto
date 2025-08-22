import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      for (let item of state) {
        if (item.id === action.payload.id) {
          item.quantityForBuy += action.payload.quantityForBuy;
          return;
        }
      }
      state.push(action.payload);
    },
    removeItems: (state, action) => {
      // //console.log(action.payload)
      if (!Array.isArray(action.payload)) {
        ////console.log(state)
        state = state.filter((item) => item.id !== action.payload);
        return state;
      } else {
        action.payload.map((item) => {
          ////console.log(item)
          state = state.filter(
            (stateitem) => Number.parseInt(item) !== stateitem.id
          );
        });
        return state;
      }
    },
    removeAll: (state, action) => {
      state.length = 0;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantityForBuy = quantity;
      }
    },
  },
});

export const { actions, reducer } = cartSlice;
