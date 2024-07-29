import React from "react";
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from "react-router";

interface IProtectedProps {
  inner: React.JSX.Element;
  guard?: boolean;
}

const Protected = ({ inner, guard = false }: IProtectedProps) => {
  
  const { loading, user } = useAppSelector((store) => store.user);
  const location = useLocation();

  if (loading === 'loading') return null;

  if (user.name !== "" && !guard) {
    return <Navigate to={location.state} replace />;
  }

  if (user.name === "" && guard) {
    return <Navigate to={'/login'} state={location.state} />;
  }
  
  return inner;
}

export const OnlyUnAuth = Protected;
export const OnlyAuth = ({ inner }: IProtectedProps) => {
  return <Protected guard={true} inner={inner} />;
}

