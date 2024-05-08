import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { request } from "../api/requests";
import { API } from "../api/const";

const initialState = {
  ingredients: [],
  loading: 'loading',
};

export const fetchIngredients = createAsyncThunk(
  'burgerIngredients/fetchIngredients', 
  async () => {
    const url = `${API.baseUrl}/${API.endpoints.ingredients}`;
    const report = await request(url);
    if (report?.success) return report.data;
    return Promise.reject("Not success");
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

