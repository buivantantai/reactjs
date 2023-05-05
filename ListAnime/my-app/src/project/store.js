import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import animeSlice from "./feature/animeSlice";
import listAnimeSlice from "./feature/listAnimeSlice";
import commentSlice from "./feature/commentSlice";

export default configureStore({
  reducer: {
    userReducer: userSlice,
    animeSlice: animeSlice,
    listAnime: listAnimeSlice,
    listComment: commentSlice,
  },
});
