import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "uiSlceN",
  initialState: { cartIsVisible: false, notific: null },
  reducers: {
    toggle(state) {
      // it seems like mutating state but RcTlKit uses Immer to immutatle way.
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotif(state, action) {
      state.notific = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
