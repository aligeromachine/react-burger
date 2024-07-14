import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";

const Protected = ({ inner, guard = false }) => {
  const { loading, user } = useSelector((store) => store.user);
  const location = useLocation();

  if (loading === 'loading') return null;

  if (user && !guard) {
    return <Navigate to={location.state} replace />;
  }

  if (!user && guard) {
    return <Navigate to={'/login'} state={location.from} />;
  }
  
  return inner;
};

Protected.propTypes = {
  guard: PropTypes.bool,
  inner: PropTypes.node.isRequired,
};

export const OnlyUnAuth = Protected;
export const OnlyAuth = ({ inner }) => (
  <Protected guard={true} inner={inner} />
);

OnlyAuth.propTypes = {
  inner: PropTypes.node.isRequired,
};
