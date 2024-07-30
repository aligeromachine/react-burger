import React from "react";
import st from "./home-info.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";

export const HomeInfo = () => {

  return (
    <div className={st.App}>
      <main className={st.appMain}>
        <DndProvider backend={HTML5Backend}>
          <div className={st.item}>
            <BurgerIngredients />
          </div>
          <div className={st.item}>
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    </div>
  );
}
