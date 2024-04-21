import React from 'react';
import st from './app.module.css'
import AppHeader from '../app-header/app-header';
import * as Request from "../../api/fetch-service";
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const fetchCb = async () => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    try {
      const respo = await Request.fetchData(url);
      setIngredients(respo.data);
    } catch {
      setErr(true);
    } finally {
      setLoading(true); 
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
          {loading && !err && <BurgerIngredients ingredients={ingredients} />}
        </div>
        <div className={st.item}>
          {loading && !err && <BurgerConstructor ingredients={ingredients} />}
        </div>
        
      </main>
    </div>
  );
}

export default App;
