import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data : {},
    loading: false,
    error: null,
    done: false
}

export const getListAnimeHot = createAsyncThunk (
    'animes/getList',
    async (arg,thunk) => {
        const res = await axios.get('https://api.jikan.moe/v4/top/anime',);
        return res.data;
    },
);

const listAnimeHotSilce = createSlice({
  name: 'listAnimeHot',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
    .addCase(getListAnimeHot.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.done = true;
      })
      .addCase(getListAnimeHot.pending, (state, action) => {
        state.loading = true;
        
      })
      .addCase(getListAnimeHot.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Bị lỗi rồi';
      })
  },
});

export const {} = listAnimeHotSilce.actions

export default listAnimeHotSilce.reducer