import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import useStyles from '../styles';

const EmptyList = () => {
  const classes = useStyles();

  return (
    <Box
      textAlign="center"
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Box>
        <img width="140px" src="/static/img/empty_list.png" alt="" />
      </Box>
      <Typography style={{ fontSize: 13 }}>Couldn't find any user</Typography>
      <Typography className={classes.emptyListTypo}>
        Only the admin can create new users.
      </Typography>
    </Box>
  );
};

export default EmptyList;
