import { IIngredientsExtId } from "./ingredient-inner";
import { IIngredient } from "./ingredient-response";
import { IResponseOrder } from "./order-response";
import { IUser } from "./user-response";

export interface IAuthState {
  user: IUser;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface IBurgerIngredientState {
  constructorBun: IIngredientsExtId | null;
  constructorIngredients: IIngredientsExtId[];
  constructorPrice: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IOrderState {
  orderData: IResponseOrder | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface IIngredientsState {
  ingredients: IIngredient[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface ISelectedState {
  selectedIngredient: IIngredient | null;
}