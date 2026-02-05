import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser || null,
  token: savedToken || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // localStorage.setItem("token", state.userToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems")
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
