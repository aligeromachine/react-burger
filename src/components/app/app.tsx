import React from 'react';
import st from './app.module.css'
import AppHeader from '../app-header/app-header';
import * as Request from "../../api/fetch-service";
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

function App() {
  const [state, setIngredients] = React.useState({
    ingredients: [], 
    loading: false,
    err: false
  });
 
  const fetchCb = async () => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const {report, err} = await Request.fetchData(url);
    if (report) {
      setIngredients({...state, ingredients: report.data, loading: true});
    }
    if (err) {
      console.log(err);
      setIngredients({...state, err: true, loading: true});
    }
  };

  React.useEffect(() => {
    fetchCb();
  }, []);  
  
  return (
    <div className={st.App}>
      <AppHeader />
      <main className={st.appMain}>
        <div className={st.item}>
          {state.loading && !state.err && <BurgerIngredients ingredients={state.ingredients} />}
        </div>
        <div className={st.item}>
          {state.loading && !state.err && <BurgerConstructor ingredients={state.ingredients} />}
        </div>
      </main>
    </div>
  );
}

export default App;
