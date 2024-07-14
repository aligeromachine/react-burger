import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../../../services/auth-user";
import st from "./profile-item.module.css";

export const ProfileItem = ({ route, text, className }) => {
  const location = useLocation();
  const dispatch = useDispatch();

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
};

ProfileItem.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
