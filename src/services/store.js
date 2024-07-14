import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import ingredientDetails from "./ingredient-details";
import orderDetails from "./order-details";
import user from "./auth-user";

export const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    user,
  },
  devTools: true,
  applyMiddleware: (middleware) => middleware(),
});