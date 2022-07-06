import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { USER_INFO } from '../../apollo/queries/userQueries';

const UserInfoContext = createContext({});
const userStorage = JSON.parse(localStorage.getItem('currentUser'));

export const UserInfoContextWrapper = ({ children }) => (
  <Query query={USER_INFO}>
    {({
      loading, error, data, client,
    }) => (
      <UserInfoContext.Provider
        value={{
          loading,
          error,
          data: data || userStorage,
          client,
        }}
      >
        {children}
      </UserInfoContext.Provider>
    )}
  </Query>
);

UserInfoContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoContext;
