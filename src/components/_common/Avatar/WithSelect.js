import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Done from '@material-ui/icons/Done';
import { Badge } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  badgeSelect: {
    top: '87%',
    right: '10%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    fontSize: '1rem',
    minWidth: theme.spacing(2),
    border: '1px solid #fff',
  },
}));

const WithSelect = ({ isSelected, children }) => {
  if (isSelected) {
    const classes = styles();
    return (
      <Badge
        classes={{ badge: classes.badgeSelect }}
        color="primary"
        badgeContent={<Done fontSize="inherit" />}
      >
        {children}
      </Badge>
    );
  }
  return children;
};
WithSelect.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

WithSelect.defaultProps = {
  isSelected: false,
};

export default WithSelect;
