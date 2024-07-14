import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL, request, fetchWithRefresh } from "../utils/requests";

const initialState = {
  user: null,
  loading: 'loading',
};

export const userLoginThunk = createAsyncThunk('user/userLoginThunk', async (data) => {
  const response = await request(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data)
  });
  
  localStorage.setItem("refreshToken", response.refreshToken); 
  localStorage.setItem("accessToken", response.accessToken);
  return response;
});

export const userRegisterThunk = createAsyncThunk('user/userRegisterThunk', async(data) => {
  const response = await request(`${URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data)
  });
  
  localStorage.setItem("refreshToken", response.refreshToken); 
  localStorage.setItem("accessToken", response.accessToken);
  
  return response;
});

export const userLogoutThunk = createAsyncThunk('user/userLogoutThunk', async () => {
  const response = await request(`${URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return response;
});

export const userAuthThunk = createAsyncThunk('user/userAuthThunk', async () => {
  const response = await fetchWithRefresh(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    }
  });
  
  return response;
});

export const userEditThunk = createAsyncThunk('user/userEditThunk', async (data) => {
  const response = await fetchWithRefresh(`${URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(data)
  });
  
  return response;
});

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(userLoginThunk.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(userLoginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = 'idle';
    })
    .addCase(userLoginThunk.rejected, (state) => {
      state.loading = 'failed';
    })

    .addCase(userRegisterThunk.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(userRegisterThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = 'idle';
    })
    .addCase(userRegisterThunk.rejected, (state) => {
      state.loading = 'failed';
    })
    
    .addCase(userLogoutThunk.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(userLogoutThunk.fulfilled, (state) => {
      state.user = null;
      state.loading = 'idle';
    })
    .addCase(userLogoutThunk.rejected, (state) => {
      state.loading = 'failed';
    })

    .addCase(userAuthThunk.pending, (state) =>{
      state.loading = 'loading';
    })
    .addCase(userAuthThunk.fulfilled, (state, action) =>{
      state.user = action.payload.user;
      state.loading = 'idle';
    })
    .addCase(userAuthThunk.rejected, (state) =>{
      state.isRequestFailed = true;
      state.loading = 'failed';
    })

    .addCase(userEditThunk.pending, (state) =>{
      state.loading = 'loading';
    })
    .addCase(userEditThunk.fulfilled, (state, action) =>{
      state.user = action.payload.user;
      state.loading = 'idle';
    })
    .addCase(userEditThunk.rejected, (state) =>{
      state.loading = 'failed';
    })
  }
});

export default user.reducer;
