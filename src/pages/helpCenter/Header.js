import React from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Box,
  makeStyles,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  Icon: {
    color: '#525252',
    fontSize: 24,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Box boxShadow="0px 0px 10px #d8d8d8" p="4px 10px" bgcolor="white">
      <a href="/">
        <IconButton>
          <ArrowBackIcon className={classes.Icon} />
        </IconButton>
      </a>
    </Box>
  );
};

export default Header;
