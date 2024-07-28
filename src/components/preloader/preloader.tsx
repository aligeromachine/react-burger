import React from "react";
import st from "./preloader.module.css";

interface IPreloaderProp {
  isLoading: boolean;
}

export const Preloader: React.FC<IPreloaderProp> = ({ isLoading })
: React.JSX.Element => {
  
  if (!isLoading) {
    return <></>;
  }

  return (
    <div className={st.preloader}>
      <div className={st.spinner}></div>
    </div>
  );
}
