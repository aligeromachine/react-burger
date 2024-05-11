import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../api/requests";

const initialState = {
  orderData: null,
  loading: 'loading',
};

export const createOrder = createAsyncThunk(
  'orderDetails/createOrder', 
  async (order) => {
    const response = await postOrder(order);
    return response.order;
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
