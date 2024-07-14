import React from "react";
import { NavLink } from "react-router-dom";
import st from "./header-button.module.css";
import PropTypes from "prop-types";
import {
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const HeaderButton = ({ link, icon: Icon, text }) => {
  return (
    <NavLink to={link} className={`${st.link} pt-4 pr-5 pb-4 pl-5`}>
      {({isActive}) => (
        <Button htmlType='button' type='secondary'>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <span className={`${st.nameBtn} ${isActive ? "text_color_primary" : "text_color_inactive"} `}>
          {text}
          </span>
        </Button>
      )}
    </NavLink>
  );
};

HeaderButton.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

export default HeaderButton;
