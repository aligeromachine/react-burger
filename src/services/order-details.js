import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../utils/requests";

const initialState = {
  orderData: null,
  loading: 'loading',
};

export const createOrderThunk = createAsyncThunk(
  'orderDetails/createOrderThunk', 
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
    .addCase(createOrderThunk.pending, (state) => {
      state.orderData = null;
      state.loading = 'loading';      
    })
    .addCase(createOrderThunk.fulfilled, (state, action) => {
      state.orderData = action.payload;
      state.loading = 'idle';
    })    
    .addCase(createOrderThunk.rejected, (state) => {
      state.orderData = null;
      state.loading = 'failed';
    })
  }
});

export default orderDetails.reducer;
