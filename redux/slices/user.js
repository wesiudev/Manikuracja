import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    uid: "",
    name: "",
    email: "",
    photoURL: "",
    city: "",
    description: "",
    logo: "",
    seek: false,
    emailVerified: false,
    configured: false,
    profileComments: [],
    services: [],
    location: { lng: 21.0122287, lat: 52.2296756, address: "" },
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
