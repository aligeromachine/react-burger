import React from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuthThunk } from "../../services/auth-user";
import { getIngredientsThunk } from '../../services/burger-ingredients';
import { Preloader } from "../preloader/preloader";
import { useSelector } from "react-redux";

export const MainRequests = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(userAuthThunk());
  }, [dispatch]);

  const user = useSelector((store) => store.user.loading) !== 'idle';
  const ingredients = useSelector(store => store.burgerIngredients.loading) !== 'idle';

  return (
    <>
      <Preloader isLoading={ ingredients  && user }/>
    </>
  );
}
