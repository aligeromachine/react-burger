import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedState } from "../interfaces/store";
import { IIngredient } from "../interfaces/ingredient-response";

const initialState: ISelectedState = {
  selectedIngredient: null
};

const ingredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setSelectedIngredient: (state: ISelectedState, action: PayloadAction<IIngredient>) => {
      state.selectedIngredient = action.payload
    }
  }
});

export const { setSelectedIngredient } = ingredientDetails.actions;
export default ingredientDetails.reducer;
