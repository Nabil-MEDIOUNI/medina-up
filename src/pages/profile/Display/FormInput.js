import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: ({ margin }) => (margin ? theme.spacing(2) : 0),
  },
  form: {
    width: '75%',
  },
  typo: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
  },
}));

const FormInput = ({
  label, margin, icon, value,
}) => {
  const classes = useStyles({ margin });

  return (
    <Box
      my={0.5}
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.form}
    >
      <Box mr={2}>
        <img src={icon} alt="" />
      </Box>
      <Box width="90%">
        <Typography className={classes.typo} variant="body2">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  margin: PropTypes.bool,
};

FormInput.defaultProps = {
  margin: false,
  value: null,
  label: null,
};
export default FormInput;
