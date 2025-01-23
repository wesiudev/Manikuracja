import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  register: false,
  payments: false,
};

export const cta = createSlice({
  name: "cta",
  initialState,
  reducers: {
    setRegisterOpen: (state, action) => {
      state.register = action.payload;
    },
    setPaymentsOpen: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setRegisterOpen, setPaymentsOpen } = cta?.actions;

export default cta?.reducer;
