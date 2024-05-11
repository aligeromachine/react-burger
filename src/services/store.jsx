import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import ingredientDetails from "./ingredient-details";
import orderDetails from "./order-details";

export const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredients,
    burgerConstructor: burgerConstructor,
    ingredientDetails: ingredientDetails,
    orderDetails: orderDetails,
  },
  devTools: true,
  applyMiddleware: (middleware) => middleware(),
});