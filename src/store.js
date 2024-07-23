import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/Auth/userSlice";
import hospitalReducer from "./components/Hospital/hospitalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    hospital: hospitalReducer,
  },
});

export default store;
