import React from 'react';
import { Redirect, Route } from 'react-router';
// import { Redirect } from 'react-router/cjs/react-router.min';
// import { Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  return profile ? (
    <Redirect to="/" />
  ) : (
    <Route {...routeProps}>{children}</Route>
  );
};

export default PublicRoute;
