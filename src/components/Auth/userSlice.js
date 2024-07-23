import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  isAuthenticated: false,
  fullname: "",
  username: "",
  jwtToken: "",
  expiresIn: "",
  roleId: "",
  searchActivities: [],
  startDay: "",
  endDay: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearInfo(state, action) {
      return {
        userId: "",
        isAuthenticated: false,
        fullname: "",
        username: "",
        jwtToken: "",
        expiresIn: "",
        roleId: "",
        searchActivities: [],
      };
    },
    setSearchActivity(state, action) {
      console.log({
        ...state,
        searchActivities: action.payload,
      });
      return {
        ...state,
        searchActivities: action.payload,
      };
    },
    setSearchDay(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setInfo,
  clearInfo,
  openLoginModal,
  closeLoginModal,
  setSearchActivity,
  setSearchDay,
} = userSlice.actions;

export default userSlice.reducer;
