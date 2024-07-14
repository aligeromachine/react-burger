import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngredient: null
};

const ingredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload
    }
  }
});

export const {setSelectedIngredient} = ingredientDetails.actions;
export default ingredientDetails.reducer;
