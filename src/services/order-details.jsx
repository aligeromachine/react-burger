import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../api/requests";
import { API } from "../api/const";

const initialState = {
  orderData: null,
  loading: 'loading',
};

export const createOrder = createAsyncThunk(
  'orderDetails/createOrder', 
  async (order) => {
    const url = `${API.baseUrl}/${API.endpoints.order}`;
    const jsonData = JSON.stringify({ingredients: order.map((item) => item._id)});
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData,
    };
    const response = await request(url, options);
    if (response?.success) return response;
    return Promise.reject("Not success");
  }
)

export const orderDetails = createSlice({
  name: 'orderDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
      state.orderData = null;
      state.loading = 'loading';      
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderData = action.payload;
      state.loading = 'idle';
    })    
    .addCase(createOrder.rejected, (state) => {
      state.orderData = null;
      state.loading = 'failed';
    })
  }
});

export default orderDetails.reducer;
