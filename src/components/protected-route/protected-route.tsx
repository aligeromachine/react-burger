import React from "react";
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from "react-router";

interface IProtectedProps {
  inner: React.JSX.Element;
  guard?: boolean;
}

const Protected: React.FC<IProtectedProps> = ({ inner, guard = false })
: React.JSX.Element => {
  
  const { loading, user } = useAppSelector((store) => store.user);
  const location = useLocation();

  if (loading === 'loading') return <></>;

  if (user.name !== "" && !guard) {
    return <Navigate to={location.state} replace />;
  }

  if (user.name === "" && guard) {
    return <Navigate to={'/login'} state={location.state} />;
  }
  
  return inner;
}

export const OnlyUnAuth = Protected;
export const OnlyAuth: React.FC<IProtectedProps> = ({ inner })
: React.JSX.Element => {
  return <Protected guard={true} inner={inner} />;
}

