import React from 'react';
import st from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Button,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function AppHeader() {
  return (
    <header className={st.header}>
      <nav className={st.container}>
        <div className={st.centeredContent}>
          <NavigationItem 
            htmlType='button' 
            type='secondary'
            text='Конструктор'
            icon={<BurgerIcon type='secondary' />}/>
          <NavigationItem 
            htmlType='button' 
            type='secondary'
            text='Лента заказов'
            icon={<ListIcon type='secondary' />}/>
        </div>
        <div className={`${st.centeredContent} ${st.navLogo}`}>
          <Logo />
        </div>
        <div className={st.centeredContent}>
          <NavigationItem 
            text='Личный кабинет'
            htmlType='button' 
            type='secondary'
            icon={<ProfileIcon type='secondary' />}/>
        </div>
      </nav>
    </header>
  );
}

const NavigationItem = (props) => {
  return(
    <Button 
      htmlType={props.htmlType}
      type={props.type}>
        {props.icon} <span className={st.nameBtn}>{props.text}</span>
    </Button>
  );
};

NavigationItem.propTypes = {
  text: PropTypes.string.isRequired,
  htmlType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,  
};