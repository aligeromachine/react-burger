import React from "react";
import st from "./preloader.module.css";

interface IPreloaderProp {
  isLoading: boolean;
}

export const Preloader = ({ isLoading }: IPreloaderProp) => {
  
  if (!isLoading) {
    return null;
  }

  return (
    <div className={st.preloader}>
      <div className={st.spinner}></div>
    </div>
  );
}
