import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const processQuery = (error, loading, loadingComponent, children, other) => {
  if (error) {
    return <p>error!</p>;
  }
  if (loading) return loadingComponent ? loadingComponent() : '';
  // Removing the loader compo actually removed the double loader in Objects List

  return children(other);
};

const CustomQuery = ({ children, loadingComponent, ...props }) => (
  <Query {...props}>
    {({ loading, error, ...other }) => processQuery(error, loading, loadingComponent, children, other)}
  </Query>
);

CustomQuery.propTypes = {
  children: PropTypes.func.isRequired,
  loadingComponent: PropTypes.func,
};

CustomQuery.defaultProps = {
  loadingComponent: null,
};

export default CustomQuery;
