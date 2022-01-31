import React from 'react';
import { Navigate, Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import { Container } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { ImSpinner } from 'react-icons/im';

const PublicRoute = ({ children, ...routeProps }) => {
  console.log('inside public route');
  // const profile = true;
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Loader inverse center content="loading..." size="md" speed="slow" /> */}
        {/* <Loader size="md" content="Medium" /> */}
        <Icon as={ImSpinner} pulse size="3em" style={{ color: 'red' }} />
      </Container>
    );
  }

  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
