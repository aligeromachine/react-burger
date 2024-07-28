import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from '../../../services/store';
import { userLogoutThunk } from "../../../services/auth-user";
import st from "./profile-item.module.css";

interface IProfileItemProp {
  route: string | null;
  text: string;
  className: string;
}

export const ProfileItem: React.FC<IProfileItemProp> = ({ route, text, className })
: React.JSX.Element => {
  
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLogoutThunk());
  };

  return (
    <li className={className}>
      {
      route ? 
      <NavLink to={route}>
        <span
        className={`${
        location.pathname.split("/").pop() === route.split("/").pop() ?
        "text_color_primary" :
        "text_color_inactive"
        } 
        text text_type_main-medium`}
        >
          {text}
        </span>
      </NavLink> : 
      <button onClick={handleLogout} className={st.btn}>
        {text}
      </button>
    }
    </li>
  );
}
