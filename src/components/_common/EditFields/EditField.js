import React from 'react';
import PropTypes from 'prop-types';

import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: ({ margin }) => ((margin) ? theme.spacing(2) : 0),
  },
}));

const EditField = ({
  label, margin, dfltVl, ...props
}) => {
  const classes = useStyles({ margin });

  return (
    <TextField
      className={classes.margin}
      {...props}
      fullWidth
      label={label}
      key={label}
      defaultValue={dfltVl}
      variant="filled"
    />
  );
};

EditField.propTypes = {
  label: PropTypes.string.isRequired,
  dfltVl: PropTypes.string,
  margin: PropTypes.bool,
};

EditField.defaultProps = {
  margin: false,
  dfltVl: '',
};
export default EditField;
