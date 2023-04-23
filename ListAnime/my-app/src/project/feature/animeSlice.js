import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
  error: null,
  doneName: false,
  doneSeason: false,
  doneGenres: false,
};
export const getListAnimeByName = createAsyncThunk(
  "animes/searchByName",
  async (arg, thunk) => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${arg}`);
    return res.data;
  }
);
export const getListAnimeBySeason = createAsyncThunk(
  "animes/searchBySeason",
  async (arg, thunk) => {
    const res = await axios.get(
      `https://api.jikan.moe/v4/seasons/${arg.year}/${arg.season}`
    );
    return res.data;
  }
);

export const getListAnimeByGenres = createAsyncThunk(
  "animes/searchByGenres",
  async (arg, thunk) => {
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime?genres=${arg}&limit=100`
    );
    return res.data;
  }
);
const animeSlice = createSlice({
  name: "animeSearch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListAnimeByName.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListAnimeByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneName = true;
      })
      .addCase(getListAnimeByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(getListAnimeBySeason.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListAnimeBySeason.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneSeason = true;
      })
      .addCase(getListAnimeBySeason.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(getListAnimeByGenres.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListAnimeByGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneGenres = true;
      })
      .addCase(getListAnimeByGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      });
  },
});

export const {} = animeSlice.actions;

export default animeSlice.reducer;
