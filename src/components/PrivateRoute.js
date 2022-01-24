import React from 'react';
import { Redirect, Route } from 'react-router';
import Loader from 'rsuite/Loader';
import { Container } from 'rsuite';
import { useProfile } from '../context/profile.context';
import { Icon } from '@rsuite/icons';
import { ImSpinner } from 'react-icons/im';
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
        {/* <Loader inverse center content="loading..." size="md" speed="slow" /> */}
        {/* <Loader size="md" content="Medium" /> */}
        <Icon as={ImSpinner} pulse size="3em" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
