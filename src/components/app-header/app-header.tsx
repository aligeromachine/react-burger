import React from 'react';
import st from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './header-button/header-button';
import { NavLink } from 'react-router-dom';

export const AppHeader: React.FC = ()
: React.JSX.Element => {
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

          <NavLink to={"/"} >
            <Logo />
          </NavLink>
          
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
