import React from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Today } from '@material-ui/icons';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dateIcon: {
    fontSize: 20,
    color: '#5d5d5d',
  },
}));
const DatePicker = ({
  label, handle, selectedDate, defaultValue, inputVariant, ...props
}) => {
  const classes = useStyles({});
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
    >
      <KeyboardDatePicker
        {...props}
        defaultValue={defaultValue}
        format="MM/dd/yyyy"
        label={label}
        value={selectedDate}
        onChange={handle}
        placeholder="Month/Day/Year"
        inputVariant={inputVariant}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        keyboardIcon={<Today className={classes.dateIcon} />}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  inputVariant: PropTypes.string,
};

DatePicker.defaultProps = {
  inputVariant: 'outlined',
};


export default DatePicker;
