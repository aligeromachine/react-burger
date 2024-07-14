import React from "react";
import st from "./profile-layout.module.css";
import { Outlet } from "react-router-dom";
import { ProfileNavigator } from "../../components/profile/navigator/profile-navigator";

export const ProfileLayout = () => {
  return (
    <div className={`${st.profileWrapper} pl-4`}>
      <ProfileNavigator />
      <Outlet />
    </div>
  );
};
