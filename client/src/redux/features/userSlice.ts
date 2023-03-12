import { createSlice } from "@reduxjs/toolkit";
import { IAuth, IAuthor } from "../../interface/interface";

const initialState: any = {
  auth: {},
  isAdmin: false,
  isLogged: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    getUser: (state, action) => {
      state.auth.user = action.payload.user;
      state.auth.accessToken = action.payload.accessToken;
      state.isAdmin = action.payload.user.role !== 1 ? false : true;
    },
  },
});

export const { getUser, getIsLogged } = userSlice.actions;

export default userSlice.reducer;
