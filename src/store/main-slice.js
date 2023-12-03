import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCardVisible: false,
  statusMessage: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleCardVisibility(state) {
      state.isCardVisible = !state.isCardVisible;
    },
    showStatusMessage(state, action) {
      state.statusMessage = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const mainActions = mainSlice.actions;
export default mainSlice;
