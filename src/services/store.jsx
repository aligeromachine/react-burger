import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerIngredients from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import ingredientDetails from "./ingredient-details";
import orderDetails from "./order-details";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredients,
  burgerConstructor: burgerConstructor,
  ingredientDetails: ingredientDetails,
  orderDetails: orderDetails,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  applyMiddleware: (middleware) => middleware(),
});