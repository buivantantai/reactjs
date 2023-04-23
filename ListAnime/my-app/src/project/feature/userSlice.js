import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../ultils/globalFunction";

export const loginFirebase = createAsyncThunk("user/login", async (arg) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email: arg.email,
      password: arg.password,
      returnSecureToken: true,
    }
  );
  localStorage.setItem("token", res.data.idToken); // mục đích để khi F5 lại trang không bị mất
  localStorage.setItem("name", res.data.email);
  return res.data;
});

export const registerFirebase = createAsyncThunk(
  "user/register",
  async (arg) => {
    // console.log('bb arg', arg);
    // console.log('bb thunkapi', thunkApi.getState());
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email: arg.email,
        password: arg.password,
        returnSecureToken: true,
      }
    );
    localStorage.setItem("token", res.data.idToken); // mục đích để khi F5 lại trang không bị mất
    localStorage.setItem("name", res.data.email);
    return res.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: localStorage.getItem("token"),
  },
  //   list action trong reducers
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginFirebase.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.idToken; // mục đích để lấy dữ gửi kèm các request khác
        state.name = action.payload.email;
      })
      .addCase(loginFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bị lỗi rồi";
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
