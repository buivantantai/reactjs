import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const refresh = () => {
  window.location.reload();
};
const initialState = {
  data: {},
  loading: false,
  error: null,
  doneGet: false,
  doneAdd: false,
  doneEdit: false,
  doneDelete: false,
  dataFilter: null,
  dataFilterCompleted: null,
  dataFilterDropped: null,
};
export const getListAnime = createAsyncThunk(
  "anime/getList",
  async (arg, thunkApi) => {
    const res = await axios.get(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/list.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`
    );
    return res.data;
  }
);
export const addListAnime = createAsyncThunk(
  "anime/addList",
  async (arg, thunkApi) => {
    const res = await axios.post(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/list.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`,
      arg
    );
    thunkApi.dispatch(getListAnime());
    return res.data;
  }
);
export const editListAnime = createAsyncThunk(
  "anime/editList",
  async (arg, thunkApi) => {
    const converData = JSON.parse(JSON.stringify(arg.data));
    const res = await axios.patch(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/list/${
        arg.id
      }.json?auth=${thunkApi.getState()?.userReducer?.token}`,
      converData
    );
    thunkApi.dispatch(getListAnime());
    return res.data;
  }
);
export const deleteListAnime = createAsyncThunk(
  "anime/deleteList",
  async (arg, thunkApi) => {
    const res = await axios.delete(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/list/${arg}.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`
    );
    setTimeout(() => {
      thunkApi.dispatch(getListAnime());
    }, 1000);
    return res.data;
  }
);
const listAnimeSlice = createSlice({
  name: "listAnime",
  initialState,
  reducers: {
    filterListWatching: (state, action) => {
      // lọc tất cả những anime đang xem
      const converData = JSON.parse(JSON.stringify(state));
      const DataFilter = Object.keys(converData.data).filter(
        (i) => converData.data[i].status_watched === "Watching"
      );
      state.dataFilter = DataFilter;
    },
    filterListCompleted: (state, action) => {
      // lọc tất cả những anime đã hoàn thành
      const converData = JSON.parse(JSON.stringify(state));
      const DataFilter = Object.keys(converData.data).filter(
        (i) => converData.data[i].status_watched === "Completed"
      );
      state.dataFilterCompleted = DataFilter;
    },
    filterListDroped: (state, action) => {
      // lọc tất cả những anime đang drop
      const converData = JSON.parse(JSON.stringify(state));
      const DataFilter = Object.keys(converData.data).filter(
        (i) => converData.data[i].status_watched === "Dropped"
      );
      state.dataFilterDropped = DataFilter;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListAnime.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneGet = true;
      })
      .addCase(getListAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(addListAnime.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addListAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneAdd = true;
      })
      .addCase(addListAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(editListAnime.pending, (state, action) => {
        state.loading = true;
        state.doneGet = false;
      })
      .addCase(editListAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneEdit = true;
      })
      .addCase(editListAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(deleteListAnime.pending, (state, action) => {
        state.loading = true;
        state.doneGet = false;
      })
      .addCase(deleteListAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneDelete = true;
        refresh();
      })
      .addCase(deleteListAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      });
  },
});

export const { filterListWatching, filterListCompleted, filterListDroped } =
  listAnimeSlice.actions;

export default listAnimeSlice.reducer;
