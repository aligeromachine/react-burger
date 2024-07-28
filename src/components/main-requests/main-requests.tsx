import React from 'react';
import { useEffect } from "react";
import { userAuthThunk } from "../../services/auth-user";
import { getIngredientsThunk } from '../../services/burger-ingredients';
import { Preloader } from "../preloader/preloader";
import { useAppDispatch, useAppSelector } from '../../services/store';

export const MainRequests: React.FC = ()
: React.JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(userAuthThunk());
  }, [dispatch]);

  const user = useAppSelector((store) => store.user.loading) !== 'succeeded';
  const ingredients = useAppSelector(store => store.burgerIngredients.loading) !== 'succeeded';

  return (
    <>
      <Preloader isLoading={ ingredients  && user }/>
    </>
  );
}
