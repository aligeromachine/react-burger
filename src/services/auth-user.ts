import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from "@reduxjs/toolkit";

import { 
  URL, 
  request, 
  fetchWithRefresh, 
  baseoptions, 
  objToStr 
} from "../utils/requests";

import { 
  IResponseUserCheck, 
  IResponseUserLogin, 
  IResponseUserLogout, 
  IResponseUserRegister, 
  IUser
} from "../interfaces/user-response";

import { 
  IRequestsInit 
} from "../interfaces/base";

import { 
  IRequestUserLogin, 
  IRequestUserRegister
} from "../interfaces/user-request";

import { 
  IAuthState 
} from "../interfaces/store";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

const user_init: IUser = {
  email: "",
  name: "",
}

const initialState: IAuthState = {
  user: user_init,
  loading: 'loading',
};

export const userLoginThunk = createAsyncThunk<IResponseUserLogin, IRequestUserLogin, AsyncThunkConfig>(
  'user/userLoginThunk', 
  async (data: IRequestUserLogin) => {
    
    const options: IRequestsInit = baseoptions;
    options.method = "POST";
    options.body = objToStr(data);

    const response = await request<IResponseUserLogin>(`${URL}/auth/login`, options);
    
    localStorage.setItem("refreshToken", response.refreshToken); 
    localStorage.setItem("accessToken", response.accessToken);
    return response;
});

export const userRegisterThunk = createAsyncThunk<IResponseUserRegister, IRequestUserRegister, AsyncThunkConfig>(
  'user/userRegisterThunk', 
  async (data: IRequestUserRegister) => {

    const options: IRequestsInit = baseoptions;
    options.method = "POST";
    options.body = objToStr(data);

    const response = await request<IResponseUserRegister>(`${URL}/auth/register`, options);
    
    localStorage.setItem("refreshToken", response.refreshToken); 
    localStorage.setItem("accessToken", response.accessToken);
    
    return response;
});

export const userLogoutThunk = createAsyncThunk<IResponseUserLogout, void, AsyncThunkConfig>(
  'user/userLogoutThunk', 
  async () => {

    const options: IRequestsInit = baseoptions;
    options.method = "POST";
    options.body = objToStr({token: localStorage.getItem("refreshToken")});

    const response = await request<IResponseUserLogout>(`${URL}/auth/logout`, options);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return response;
});

export const userAuthThunk = createAsyncThunk<IResponseUserCheck | null, void, AsyncThunkConfig>(
  'user/userAuthThunk', 
  async () => {

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: localStorage.getItem("accessToken") || "",
      }
    }

    const response = await fetchWithRefresh(`${URL}/auth/user`, options);

    return response;
});

export const userEditThunk = createAsyncThunk<IResponseUserCheck, IResponseUserRegister, AsyncThunkConfig>(
  'user/userEditThunk', 
  async (data) => {

    const options: IRequestsInit = baseoptions;
    options.method = "PATCH";
    options.headers.authorization = localStorage.getItem("accessToken") || "";
    options.body = objToStr(data);

    const response = await fetchWithRefresh(`${URL}/auth/user`, options);
    
    return response;
});

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(userLoginThunk.pending, (state: IAuthState) => {
      state.loading = 'loading';
    })
    .addCase(userLoginThunk.fulfilled, (state: IAuthState, action: PayloadAction<IResponseUserLogin>) => {
      state.user = action.payload.user;
      state.loading = 'succeeded';
    })
    .addCase(userLoginThunk.rejected, (state: IAuthState) => {
      state.loading = 'failed';
    })

    .addCase(userRegisterThunk.pending, (state: IAuthState) => {
      state.loading = 'loading';
    })
    .addCase(userRegisterThunk.fulfilled, (state: IAuthState, action: PayloadAction<IResponseUserRegister>) => {
      state.user = action.payload.user;
      state.loading = 'succeeded';
    })
    .addCase(userRegisterThunk.rejected, (state: IAuthState) => {
      state.loading = 'failed';
    })
    
    .addCase(userLogoutThunk.pending, (state: IAuthState) => {
      state.loading = 'loading';
    })
    .addCase(userLogoutThunk.fulfilled, (state: IAuthState, action: PayloadAction<IResponseUserLogout>) => {
      if (action.payload.success) {
        state.user = user_init;
        state.loading = 'succeeded';
      }
    })
    .addCase(userLogoutThunk.rejected, (state: IAuthState) => {
      state.loading = 'failed';
    })

    .addCase(userAuthThunk.pending, (state: IAuthState) =>{
      state.loading = 'loading';
    })
    .addCase(userAuthThunk.fulfilled, (state: IAuthState, action: PayloadAction<IResponseUserCheck | null>) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.loading = 'succeeded';
      }
    })
    .addCase(userAuthThunk.rejected, (state: IAuthState) =>{
      state.loading = 'failed';
    })

    .addCase(userEditThunk.pending, (state: IAuthState) =>{
      state.loading = 'loading';
    })
    .addCase(userEditThunk.fulfilled, (state: IAuthState, action: PayloadAction<IResponseUserCheck>) => {
      state.user = action.payload.user;
      state.loading = 'succeeded';
    })
    .addCase(userEditThunk.rejected, (state: IAuthState) =>{
      state.loading = 'failed';
    })
  }
});

export default user.reducer;
