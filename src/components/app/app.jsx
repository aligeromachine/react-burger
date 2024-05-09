import React from 'react';
import st from './app.module.css'
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { fetchIngredients } from '../../services/burger-ingredients';
import { Preloader } from '../preloader/Preloader';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => { dispatch(fetchIngredients()); }, [dispatch]);
  const { loading } = useSelector(store => store.burgerIngredients);

  return (
    <div className={st.App}>
      <AppHeader />
      <main className={st.appMain}>
        <DndProvider backend={HTML5Backend}>
          <div className={st.item}>
            <Preloader isLoading={loading !== 'idle' }/>
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
