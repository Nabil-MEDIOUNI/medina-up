import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Loading from '../../components/_common/Loading';

const CustomMutation = ({ children, ...props }) => (
  <Mutation {...props}>
    {(mutate, { loading, error }) => {
      if (error) return <p>Error!</p>;
      if (loading) return <Loading />;

      return children(mutate);
    }}
  </Mutation>
);

CustomMutation.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CustomMutation;
