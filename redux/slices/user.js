import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    uid: "",
    name: "",
    email: "",
    photoURL: "",
    city: "",
    seek: false,
    emailVerified: false,
    profileComments: [],
    services: [],
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = user?.actions;

export default user?.reducer;
