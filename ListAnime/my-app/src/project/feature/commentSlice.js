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
  doneDelete: false,
  dataFilter: null,
};
export const getListComment = createAsyncThunk(
  "comment/getList",
  async (arg, thunkApi) => {
    const res = await axios.get(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/comments.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`
    );
    return res.data;
  }
);
export const addListComment = createAsyncThunk(
  "comment/addList",
  async (arg, thunkApi) => {
    const res = await axios.post(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/comments.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`,
      arg
    );
    thunkApi.dispatch(getListComment());
    return res.data;
  }
);
export const deleteListComment = createAsyncThunk(
  "comment/deleteList",
  async (arg, thunkApi) => {
    const res = await axios.delete(
      `https://animelist-33c2b-default-rtdb.firebaseio.com/comments/${arg}.json?auth=${
        thunkApi.getState()?.userReducer?.token
      }`
    );
    setTimeout(() => {
      thunkApi.dispatch(getListComment());
    }, 1000);
    return res.data;
  }
);
const commentSlice = createSlice({
  name: "listComments",
  initialState,
  reducers: {
    filterCommentParent: (state, action) => {
      // lọc tất cả những anime đang xem
      const converData = JSON.parse(JSON.stringify(state));
      const DataFilter = Object.keys(converData.data)
        .filter(
          (i) =>
            converData.data[i].parentId == null &&
            converData.data[i].mal_id == action.payload
        )
        .sort(
          (a, b) =>
            new Date(converData.data[b].createdAt).getTime() -
            new Date(converData.data[a].createdAt).getTime()
        );
      state.dataFilter = DataFilter;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneGet = true;
      })
      .addCase(getListComment.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(addListComment.pending, (state, action) => {
        state.loading = true;
        state.doneGet = false;
      })
      .addCase(addListComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addListComment.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      })
      .addCase(deleteListComment.pending, (state, action) => {
        state.loading = true;
        state.doneGet = false;
      })
      .addCase(deleteListComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.doneDelete = true;
        refresh();
      })
      .addCase(deleteListComment.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      });
  },
});

export const { filterCommentParent } = commentSlice.actions;

export default commentSlice.reducer;
