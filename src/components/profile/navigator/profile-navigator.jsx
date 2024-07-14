import React from "react";
import st from "./profile-navigator.module.css";
import { ProfileItem } from "../item/profile-item";
import { v4 as uuidv4 } from "uuid";

export const ProfileNavigator = () => {
  const profileTabs = [
    { name: "Профиль", route: "/profile" },
    { name: "История заказов", route: "/profile/orders" },
    { name: "Выйти", route: null },
  ];
  
  return (
    <div className={st.tabsContainer}>
      <ul className={st.profileTabs}>
        {profileTabs.map((tab) => (
          <ProfileItem
            key={uuidv4()}
            route={tab.route}
            className="pt-3 pb-3"
            text={tab.name}
          />
        ))}
      </ul>
      <p className="text_type_main-default text_color_inactive">
        В этом разделе вы можете
        <br></br>
        изменить свои персональные данные
      </p>
    </div>
  );
};
