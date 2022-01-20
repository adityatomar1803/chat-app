import React from 'react';
import { Redirect, Route } from 'react-router';
import { Loader } from 'rsuite';
import { Container } from 'rsuite';
import { useProfile } from '../context/profile.context';
// import { Redirect } from 'react-router';
// import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...routeProps }) => {
  console.log('inside private route');
  // const profile = false;
  const { profile, isLoading } = useProfile();

  // return
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader inverse center content="loading..." size="md" speed="slow" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
