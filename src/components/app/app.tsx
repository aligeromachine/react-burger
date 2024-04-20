import React, { useEffect, useState } from 'react';
import st from './app.module.css'
import AppHeader from '../app-header/app-header';
import * as Request from "../../api/fetch-service";
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
// import { BurgerConstructor } from '../burger-constructor/burger-constructor';

function App() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const fetchCb = async () => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    try {
      const respo = await Request.fetchData(url);
      setState(respo.data);
    } catch {
      setErr(true);
    } finally {
      setLoading(true); 
    }
  };

  useEffect(() => {
    fetchCb();
  }, []);
  
  return (
    <div className={st.App}>
      <AppHeader />
      <main className={st.appMain}>
        <div className={st.item}>
          {loading && !err && <BurgerIngredients ingredients={state} />}
        </div>
        <div className={st.item}>
        </div>
        
        {/* {loading && !err && <BurgerConstructor state={[]} />} */}
      </main>
    </div>
  );
}

export default App;
