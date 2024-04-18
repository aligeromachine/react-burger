import React from 'react';
import st from './app.module.css'
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <div className={st.App}>
      <AppHeader />
      <main className={st.appMain}>
        {/* <BurgerIngredients /> */}
        {/* <BurgerConstructor /> */}
      </main>
    </div>
  );
}

export default App;
