import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));
const Selecter = ({
  label, actions, handle, dfltVl, ...props
}) => {
  const classes = useStyles({});

  return (
    <FormControl variant="filled" className={classes.margin}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...props}
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={handle}
        defaultValue={dfltVl}
      >
        {actions?.map((action) => (
          <MenuItem
            key={action.value}
            value={action.value}
          >
            {action.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Selecter.propTypes = {
  label: PropTypes.string.isRequired,
  dfltVl: PropTypes.string,
  handle: PropTypes.func,
  actions: PropTypes.array,
};

Selecter.defaultProps = {
  dfltVl: '',
  actions: undefined,
  handle: undefined,
};
export default Selecter;
