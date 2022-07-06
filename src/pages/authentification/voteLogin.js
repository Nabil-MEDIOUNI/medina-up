import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@material-ui/core';

import './login.css';
import AddUserModal from '../../components/AddActions/CreateUser';

const useStyles = makeStyles(() => ({
  loginButton: {
    background: 'linear-gradient(90deg, white, white)',
    color: '#FFFFFF',
    width: '60%',
    height: 40,
    fontSize: 14,
    borderRadius: 8,
    boxShadow: '0px 3px 6px #00000029',
  },
}));

const VoteLogin = () => {
  const classes = useStyles();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const submitLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#007AFF"
        width="100%"
        height="100vh"
        zIndex={-1}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="95vh"
        width="100%"
      >
        <Box textAlign="center" mt={5}>
          <Typography
            style={{
              color: 'white',
              opacity: 0.9,
              fontSize: 14,
              fontWeight: 200,
            }}
          >
            welcome to
          </Typography>
          <Typography
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 600,
              fontStyle: 'italic',
            }}
          >
            MEDINA UP
          </Typography>
          <Typography
            style={{
              color: 'white',
              opacity: 0.9,
              fontSize: 14,
              fontWeight: 200,
            }}
          >
            An online voting app
          </Typography>
        </Box>
        <Box width="45%">
          <img src="/static/img/login_vote.png" width="100%" alt="" />
        </Box>
        <Box width="100%">
          <Box textAlign="center">
            <Button
              onClick={submitLogin}
              type="submit"
              className={classes.loginButton}
            >
              <Typography style={{ color: '#007AFF' }}>Sign in</Typography>
            </Button>
            <Box
              margin="8px auto"
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Typography
                style={{
                  color: 'white',
                  opacity: 0.85,
                  fontSize: 14,
                  fontWeight: 200,
                }}
              >
                Already have an account?
              </Typography>
              <Typography
                onClick={() => setShowAddModal(true)}
                style={{ color: 'white', fontSize: 14, marginLeft: 4 }}
              >
                Sign up
              </Typography>
            </Box>
          </Box>
        </Box>
        <AddUserModal
          title="Sign up"
          onClose={() => setShowAddModal(false)}
          open={showAddModal}
        />
      </Box>
    </>
  );
};

export default VoteLogin;
