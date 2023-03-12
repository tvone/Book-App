import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    data: [],
  },
  reducers: {
    createComment: (state: any, action: any) => {
      state.data.unshift(action.payload);
    },
    getComment: (state: any, action: any) => {
      state.data = action.payload;
    },
  },
});

export const { createComment, getComment } = commentSlice.actions;
export default commentSlice.reducer;
