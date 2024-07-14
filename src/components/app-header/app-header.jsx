import React from 'react';
import st from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from './header-button/header-button';

export const AppHeader = () => {
  return (
    <header className={st.header}>
      <nav className={st.container}>
        <HeaderButton
          icon={BurgerIcon}
          text="Конструктор"
          link={'/'}
        />
        <HeaderButton
          icon={ListIcon}
          text="Лента заказов"
          link={'/feed'}
        />

        <div className={st.logo}>
          <Logo />
        </div>

        <HeaderButton
          icon={ProfileIcon}
          text="Личный кабинет"
          link={'/profile'}
        />
        
      </nav>
    </header>
  );
}
