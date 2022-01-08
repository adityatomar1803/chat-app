import React from 'react';
import { Navigate, Route } from 'react-router';
// import { Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;
  if (profile) {
    <Navigate to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
