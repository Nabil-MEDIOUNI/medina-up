import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (getTokenWithExpiry() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/check-role',
          // pathname: '/vote-login',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

export default PrivateRoute;
