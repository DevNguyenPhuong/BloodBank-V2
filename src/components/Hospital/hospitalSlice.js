import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  fullname: "",
  username: "",
  email: "",
  phone: "",
  bloodType: "",
};

const hospitalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo(state, action) {
      return action.payload;
    },
  },
});

export const { setInfo } = hospitalSlice.actions;

export default hospitalSlice.reducer;
