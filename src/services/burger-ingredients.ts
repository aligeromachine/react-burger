import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { getIngredients } from "../utils/requests";
import { IIngredientsState } from "../interfaces/store";
import { IResponseIngredient } from "../interfaces/ingredient-response";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

const initialState: IIngredientsState = {
  ingredients: [],
  loading: 'idle',
};

export const getIngredientsThunk = createAsyncThunk<IResponseIngredient, void, AsyncThunkConfig>(
  'burgerIngredients/getIngredientsThunk', 
  async () => {

    const response = await getIngredients();
    return response;
  }
)

export const burgerIngredients = createSlice({
  name: 'burgerIngredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
    .addCase(getIngredientsThunk.pending, (state: IIngredientsState) => {
      state.loading = 'loading';
    })
    .addCase(getIngredientsThunk.fulfilled, (state: IIngredientsState, action: PayloadAction<IResponseIngredient>) => {
      state.ingredients = action.payload.data;
      state.loading = 'succeeded';
    })
    .addCase(getIngredientsThunk.rejected, (state: IIngredientsState) => {
      state.loading = 'failed';
    })
  }
});

export default burgerIngredients.reducer;

