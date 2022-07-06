import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  divHeightAndWidth: {
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
}));

const LastDiv = ({ height, width }) => {
  const classes = useStyles({ height, width });
  return (
    <div className={classes.divHeightAndWidth} />
  );
};

LastDiv.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

LastDiv.defaultProps = {
  height: '80px',
  width: '100%',
};

export default LastDiv;
