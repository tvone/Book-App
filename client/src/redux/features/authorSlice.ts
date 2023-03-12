import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor } from "../../interface/interface";
interface dataAuthor {
  authors: string[];
}
const initialState = {
  authors: [],
};
const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    getAuthors: (state: any, action: PayloadAction<string>) => {
      state.authors = action.payload;
    },
    createAuthor: (state: any, action: PayloadAction<string>) => {
      state.authors.filter((item: IAuthor) => item._id !== action.payload);
    },
  },
});

export const { getAuthors, createAuthor } = authorSlice.actions;

export default authorSlice.reducer;
