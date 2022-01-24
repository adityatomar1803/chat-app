import React from 'react';
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
// import { Redirect } from 'react-router/cjs/react-router.min';
// import { Redirect } from 'react-router-dom';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({ children, ...routeProps }) => {
  console.log('inside public route');
  // const profile = true;
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader inverse center content="loading..." size="md" speed="slow" />
      </Container>
    );
  }

  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
