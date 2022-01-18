import React from 'react';
import { Redirect, Route } from 'react-router';
// import { Redirect } from 'react-router';
// import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...routeProps }) => {
  const profile = false;

  return profile ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
