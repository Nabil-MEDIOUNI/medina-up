import React from 'react';
import PropTypes from 'prop-types';

import { Box, makeStyles } from '@material-ui/core';
import FormInput from './FormInput';

const useStyles = makeStyles((theme) => ({
  seperator: {
    width: '80%',
    margin: theme.spacing(1.25),
    opacity: 0.6,
  },
}));

const ProfileDisplay = ({ inputFields }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {inputFields.map((input) => (
        <>
          {!input.NotAdmin && (
            <>
              <FormInput
                value={input.value}
                key={input.key}
                icon={input.icon}
              />
              {input.showHr && <hr className={classes.seperator} />}
            </>
          )}
        </>
      ))}
    </Box>
  );
};

ProfileDisplay.propTypes = {
  inputFields: PropTypes.array.isRequired,
};

export default ProfileDisplay;
