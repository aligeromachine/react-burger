import React, { FC, ElementType } from "react";
import { NavLink } from "react-router-dom";
import st from "./header-button.module.css";
import {
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type THeaderButtonProps = {
  link: string;
  icon: ElementType;
  text: string;  
};

export const HeaderButton: FC<THeaderButtonProps> = ({ link, icon: Icon, text }) => {
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

