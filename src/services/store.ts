import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from "./burger-ingredients";
import burgerConstructor from "./burger-constructor";
import ingredientDetails from "./ingredient-details";
import orderDetails from "./order-details";
import user from "./auth-user";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    user,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;