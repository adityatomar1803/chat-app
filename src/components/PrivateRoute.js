import React from 'react';
import { Navigate, Route } from 'react-router';
// import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...routeProps }) => {
  const profile = false;
  if (!profile) {
    <Navigate to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
