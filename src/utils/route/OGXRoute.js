import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';

const OGXRoute = ({ component: Component, ...rest }) => {
  const { data } = useContext(UserInfoContext);
  const isAdmin = data?.currentPerson.is_admin;

  const canView = ['OGT 1', 'OGT 2', 'OGV', 'IM', 'MKT', 'F&L'];
  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const viewers = canView.includes(FunctionName);

  return (
    <Route
      {...rest}
      render={(props) => (getTokenWithExpiry() && (viewers || isAdmin) ? (
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
};

export default OGXRoute;
