import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

import useStyles from './styles';

const CheckUserRole = () => {
  const classes = useStyles();
  const submitLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <Box
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Box className={classes.topIce}>
            <img
              className={classes.ice}
              src="/static/img/login_page/top_ice.png"
              alt="topIce"
            />
          </Box>
          <Box className={classes.aiesec_human}>
            <img
              width="100%"
              src="/static/img/aiesec_human.png"
              alt="aiesec_human"
            />
          </Box>
        </Box>
        <Box
          width="20.5rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="3rem"
        >
          <a
            href="https://docs.google.com/forms/d/1dV9MkllGEIHoUheGsCBaO4rVjUE5WXG5fJX3KaarFYM/viewform?edit_requested=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/static/img/welcome.png" alt="" width="100%" />
          </a>
        </Box>
        <Box width="100%" mb="2rem" onClick={submitLogin}>
          <Button className={classes.app_btn}>
            <img
              src="/static/img/logo_360x640.png"
              style={{ marginLeft: 18, marginRight: '-2.75rem' }}
              width="7%"
              alt=""
            />
            <Typography
              style={{
                fontSize: 14,
                color: 'rgb(0, 122, 245)',
                fontWeight: 600,
                margin: '0 auto',
                paddingTop: '0.25rem',
                whiteSpace: 'nowrap',
              }}
            >
              Continue with the app
            </Typography>
          </Button>
          <Typography
            style={{
              fontSize: 13,
              color: '#007AF5',
              fontWeight: 400,
              marginTop: '0.5rem',
              textAlign: 'center',
            }}
          >
            If you're part of the organization
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CheckUserRole;
