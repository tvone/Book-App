import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface ISocketType {
  payload: Socket;
}

const socketSlice = createSlice({
  name: "socket",
  initialState: {},
  reducers: {
    createSocket: (state, action: ISocketType) => {
      state = action.payload;
    },
  },
});

export const { createSocket } = socketSlice.actions;

export default socketSlice.reducer;
