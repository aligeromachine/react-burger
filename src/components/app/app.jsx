import React from 'react';
import st from './app.module.css'
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { fetchIngredients } from '../../services/burger-ingredients';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => { dispatch(fetchIngredients()); }, [dispatch]);

  return (
    <div className={st.App}>
      <AppHeader />
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

export default App;
