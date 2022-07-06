import React from 'react';
import {
  Box, Button, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttons: {
    background: 'white',
    width: '100%',
    height: 45,
  },
  btnsImg: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: theme.spacing(4),
  },
}));

const HelpButtons = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="70%"
      margin="0 auto"
      mt={8}
    >
      <a href="/about">
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          position="relative"
          mb={2}
        >
          <img className={classes.btnsImg} src="/static/icons/help_center/about.svg" alt="" />
          <Button className={classes.buttons} style={{ paddingLeft: 46 }}>About MEDINA UP</Button>
        </Box>
      </a>
      <a href="/">
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          position="relative"
          mb={2}
        >
          <img className={classes.btnsImg} src="/static/icons/help_center/help.svg" alt="" />
          <Button className={classes.buttons}>Request Help</Button>
        </Box>
      </a>
      <a
        href="https://docs.google.com/forms/d/16wlNQZb27XkHPYRdKRwb5n0aLJcEiHv_TBU4Kt00COQ/viewform?edit_requested=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          position="relative"
          mb={2}
        >
          <img className={classes.btnsImg} src="/static/icons/help_center/bug.svg" alt="" />
          <Button className={classes.buttons}>Report a bug</Button>
        </Box>
      </a>
      <a
        href="https://docs.google.com/forms/d/1sjNk_UkvRuc7khnMA8GxOFs6xvd2WiCsHLHdxo1fFVc/viewform?edit_requested=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          position="relative"
          mb={2}
        >
          <img className={classes.btnsImg} src="/static/icons/help_center/feedback.svg" alt="" />
          <Button className={classes.buttons}>Give feedback</Button>
        </Box>
      </a>
    </Box>
  );
};

export default HelpButtons;
