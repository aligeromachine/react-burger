import React from 'react';
import logo from '../../logo.svg';
import st from './app.module.css';

function App() {
  return (
    <div className={st.App}>
      <header className={st.AppHeader}>
        <img src={logo} className={st.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={st.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
