import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import animeSlice from "./feature/animeSlice";
import listAnimeSlice from "./feature/listAnimeSlice";

export default configureStore({
  reducer: {
    userReducer: userSlice,
    animeSlice: animeSlice,
    listAnime: listAnimeSlice,
  },
});
