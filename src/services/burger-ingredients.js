import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getIngredients } from "../utils/requests";

const initialState = {
  ingredients: [],
  loading: 'loading',
};

export const getIngredientsThunk = createAsyncThunk(
  'burgerIngredients/getIngredientsThunk', 
  async () => {
    const response = await getIngredients();
    return response.data;
  }
)

export const burgerIngredients = createSlice({
  name: 'burgerIngredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getIngredientsThunk.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = 'idle';
    })
    .addCase(getIngredientsThunk.rejected, (state) => {
      state.loading = 'failed';
    })
  }
});

export default burgerIngredients.reducer;

