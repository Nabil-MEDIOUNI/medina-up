import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  divider: {
    height: ({ height }) => ((height) ? 1 : 0.5),
    width: ({ width }) => width || '100%',
    margin: ({ margin }) => margin,
    marginLeft: ({ marginLeft }) => (marginLeft),
    marginRight: ({ marginRight }) => (marginRight),
    marginTop: ({ marginTop }) => ((marginTop) ? marginTop || theme.spacing(4) : theme.spacing(2)),
    marginBottom: ({ marginBottom }) => (marginBottom),
    opacity: ({ opacity }) => opacity,
    backgroundColor: ({ backgroundColor }) => backgroundColor || '#e7e7e7',
  },
}));

const Divider = ({
  height, marginTop, backgroundColor, marginRight, marginLeft, marginBottom, opacity, width, margin,
}) => {
  const classes = useStyles({
    height, marginTop, marginRight, marginLeft, backgroundColor, marginBottom, opacity, width, margin,
  });
  return <div className={classes.divider} />;
};

Divider.propTypes = {
  height: PropTypes.bool,
  marginTop: PropTypes.string,
  marginRight: PropTypes.string,
  marginLeft: PropTypes.string,
  marginBottom: PropTypes.string,
};

Divider.defaultProps = {
  height: false,
  marginTop: '',
  marginRight: '',
  marginLeft: '',
  marginBottom: '',
};

export default Divider;
