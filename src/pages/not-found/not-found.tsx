// NotFound.js
import React from 'react';
import st from './not-found.module.css';

export const NotFound = () => {
  
  return (
    <div className={st.notFound}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}