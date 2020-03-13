import React from 'react';
import { Route, Redirect } from 'react-router';
import Master from '../containers/layouts/Master';

// TODO: remove token
const PrivateRoute = ({ component: Component, route, token, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      let result;
      if (route.private) {
        result = token ? (
          <Master token={token} aside={route.aside} {...props}>
            <Component {...props} />
          </Master>
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      } else {
        result = (
          <Master token={token} {...props}>
            <Component {...props} />
          </Master>
        );
      }
      return result;
    }}
  />
);

export default PrivateRoute;
