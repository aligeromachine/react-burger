import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getIngredients } from "../api/requests";

const initialState = {
  ingredients: [],
  loading: 'loading',
};

export const fetchIngredients = createAsyncThunk(
  'burgerIngredients/fetchIngredients', 
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
    .addCase(fetchIngredients.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = 'idle';
    })
    .addCase(fetchIngredients.rejected, (state) => {
      state.loading = 'failed';
    })
  }
});

export default burgerIngredients.reducer;

