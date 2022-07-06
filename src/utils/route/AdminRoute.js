import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';

const AdminRoute = ({ component: Component, pathname, ...rest }) => {
  const { data } = useContext(UserInfoContext);

  const isAdmin = data?.currentPerson.is_admin;
  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const ICX = ['IGT', 'IGV'];
  const OGX = ['OGT 1', 'OGT 2', 'OGV'];
  const canViewAll = ['IM', 'MKT', 'F&L'];

  return (
    <Route
      {...rest}
      render={(props) => (getTokenWithExpiry() && (isAdmin || canViewAll.includes(FunctionName)) ? (
        <Component {...props} />
      )
        : ICX.includes(FunctionName) ? (
          <Redirect
            to={{
              pathname: `/icx-${pathname}`,
              state: { from: props.location },
            }}
          />
        ) : OGX.includes(FunctionName) ? (
          <Redirect
            to={{
              pathname: `/ogx-${pathname}`,
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/check-role',
              state: { from: props.location },
            }}
          />
        )
      )}
    />
  );
};

export default AdminRoute;
