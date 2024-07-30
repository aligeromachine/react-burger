import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from "../interfaces/ingredient-response";
import { IPoint, IBurgerIngredientState } from "../interfaces/store";
import { IIngredientsExtId } from "../interfaces/ingredient-inner";

const initialState: IBurgerIngredientState = {
  constructorBun: null,
  constructorIngredients: [],
  constructorPrice: 0,
};

export const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    bunAdd: (state: IBurgerIngredientState, action: PayloadAction<IIngredientsExtId>) => {
      state.constructorBun = action.payload;
    },
    ingredientsAdd: {
      reducer: (state: IBurgerIngredientState, action: PayloadAction<IIngredientsExtId>) => {
        state.constructorIngredients = [...state.constructorIngredients, action.payload];
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, uniqueId: uuidv4() } }
      },
    },
    ingredientsDel: (state: IBurgerIngredientState, action: PayloadAction<IIngredientsExtId>) => {
      state.constructorIngredients = state.constructorIngredients
      .filter((it) => it.uniqueId !== action.payload.uniqueId);
    },
    calcPrice: (state: IBurgerIngredientState) => {
      const bunPrice = (state.constructorBun ? state.constructorBun.price * 2 : 0);
      const ingredientPrice = (state.constructorIngredients?.reduce((acc, elem) => acc + elem.price, 0)); 
      state.constructorPrice = bunPrice + ingredientPrice;
    },
    moveCard: (state: IBurgerIngredientState, action: PayloadAction<IPoint>) => {
      const { x, y } = action.payload;
      const tmp = state.constructorIngredients[x];
      state.constructorIngredients = state.constructorIngredients.filter((_, index) => index !== x);
      state.constructorIngredients.splice(y, 0, tmp);
    },
    resetIngredients: (state: IBurgerIngredientState, ) => {
      state.constructorBun = null;
      state.constructorIngredients = [];
    },
  }
});

export const {
  bunAdd, 
  ingredientsAdd, 
  ingredientsDel, 
  calcPrice, 
  moveCard,
  resetIngredients,
} = burgerConstructor.actions;
export default burgerConstructor.reducer;
