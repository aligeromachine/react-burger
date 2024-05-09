import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  constructorBun: null,
  constructorIngredients: [],
  constructorPrice: 0,
};

export const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    bunAdd: (state, action) => {
      state.constructorBun = action.payload;
    },
    ingredientsAdd: (state, action) => {      
      state.constructorIngredients = [...state.constructorIngredients, { ...action.payload, uniqueId: uuidv4() }];
    },
    ingredientsDel: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter((it) => it.uniqueId !== action.payload.uniqueId);
    },
    calcPrice: (state) => {
      const bunPrice = (state.constructorBun ? state.constructorBun.price * 2 : 0);
      const ingredientPrice = (state.constructorIngredients?.reduce((acc, elem) => acc + elem.price, 0)); 
      state.constructorPrice = bunPrice + ingredientPrice;
    },
    moveCard: (state, action) => {
      const { x, y } = action.payload;
      const tmp = state.constructorIngredients[x];
      state.constructorIngredients = state.constructorIngredients.filter((_, index) => index !== x);
      state.constructorIngredients.splice(y, 0, tmp);
    }
  }
});

export const {
  bunAdd, 
  ingredientsAdd, 
  ingredientsDel, 
  calcPrice, 
  moveCard} = burgerConstructor.actions;
export default burgerConstructor.reducer;
