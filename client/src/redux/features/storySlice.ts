import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storys: [],
};
const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    getStorys: (state, action) => {
      state.storys = action.payload;
    },
  },
});

export const { getStorys } = storySlice.actions;
export default storySlice.reducer;
