import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "../utils/requests";
import { IOrderState } from "../interfaces/store";
import { IResponseOrder } from "../interfaces/order-response";
import { IIngredientsExtId } from "../interfaces/ingredient-inner";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

const initialState: IOrderState = {
  orderData: null,
  loading: 'idle',
};

export const createOrderThunk = createAsyncThunk<IResponseOrder, IIngredientsExtId[], AsyncThunkConfig>(
  'orderDetails/createOrderThunk', 
  async (order: IIngredientsExtId[]) => {

    const response = await postOrder(order);
    return response;
  }
)

export const orderDetails = createSlice({
  name: 'orderDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createOrderThunk.pending, (state: IOrderState) => {
      state.orderData = null;
      state.loading = 'loading';      
    })
    .addCase(createOrderThunk.fulfilled, (state: IOrderState, action: PayloadAction<IResponseOrder>) => {
      state.orderData = action.payload;
      state.loading = 'succeeded';
    })    
    .addCase(createOrderThunk.rejected, (state: IOrderState) => {
      state.orderData = null;
      state.loading = 'failed';
    })
  }
});

export default orderDetails.reducer;
