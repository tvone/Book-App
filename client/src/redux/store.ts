import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "./features/authorSlice";
import storySlice from "./features/storySlice";
import userSlice from "./features/userSlice";
import commentSlice from "./features/commentSlice";
const store = configureStore({
  reducer: {
    authorSlice,
    storySlice,
    userSlice,
    commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
