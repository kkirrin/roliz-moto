import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: null,
  showModal: false,
  typeModal: "modals_auth",
  widthScreen: 0,
  heightScreen: 0,
};

const mainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.showModal = !state.showModal;
      state.typeModal = action.payload;
    },
    setScreenSize: (state, action) => {
      state.mobile = action.payload.mobile;
      state.widthScreen = action.payload.widthScreen;
      state.heightScreen = action.payload.heightScreen;
    },
  },
});

export const { reducer, actions } = mainReducer;
