import React from 'react';
import { AppHeader } from '../app-header/app-header';
import { MainRequests } from '../main-requests/main-requests';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomeLayout } from '../../pages/home-layout/home-layout';
import { HomeInfo } from '../../pages/home-info/home-info';
import { NotFound } from '../../pages/not-found/not-found';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProfileLayout } from '../../pages/profile-layout/profile-layout';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';
import { ProfileInfo } from '../../pages/profile-info/profile-info';

export const App: React.FC = ()
: React.JSX.Element => {

  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      <MainRequests/>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeInfo />} />
          <Route path="ingredients/:id" element={<IngredientDetails />} />

          <Route path="login" element={<OnlyUnAuth inner={<Login />} />} />
          <Route path="register" element={<OnlyUnAuth inner={<Register />} />} />
          <Route path="forgot-password" element={<OnlyUnAuth inner={<ForgotPassword />} />} />
          <Route path="reset-password" element={<OnlyUnAuth inner={<ResetPassword />} />} />
          <Route path="profile" element={<OnlyAuth inner={<ProfileLayout />} />} >
            <Route index element={<OnlyAuth inner={<ProfileInfo />} />} />
            <Route path="orders" element={<OnlyAuth inner={<ProfileOrders />} />} />
          </Route>

        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      {
        location.state?.background &&
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      }
    </>
  );
}
