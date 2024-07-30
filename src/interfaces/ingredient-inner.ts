import { IIngredient } from "./ingredient-response";

export interface IIngredientsExtId extends IIngredient {
  uniqueId: string;
}
