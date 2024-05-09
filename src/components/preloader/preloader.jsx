import React from "react";
import st from "./preloader.module.css";
import PropTypes from 'prop-types';

export const Preloader = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={st.preloader}>
      <div className={st.spinner}></div>
    </div>
  );
};

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};