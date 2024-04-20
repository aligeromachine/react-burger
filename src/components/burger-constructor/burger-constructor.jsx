import React from "react";
import PropTypes from 'prop-types';
import { cardModel } from '../../utils/loaddata';

export const BurgerConstructor = ({state}) => {
  return(
    <div >{state.map((it) => {<div>{it}</div>})}</div>
  );
}

BurgerConstructor.propTypes = {
  state: PropTypes.arrayOf(cardModel).isRequired
};