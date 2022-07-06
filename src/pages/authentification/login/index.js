import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import './login.css';
import { setTokenWithExpiry } from '../../../apollo/helpers/HandleToken';
import Alert from '../../../utils/alert';
import { LOGIN, SPECIAL_LOGIN } from '../../../apollo/mutations/authentification';
import useStyles from '../styles';
import LoginForm from './Form';

const Login = () => {
  const classes = useStyles();

  const [openAlert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({ message: undefined });
  const [person, setPerson] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'df430bb9332b7623f8c73844dbfc3115ff9d5619';
    script.async = true;
    script.src = 'https://embed.tawk.to/5f6538ef4704467e89f04a58/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  });

  const submitLogin = (e) => {
    e.preventDefault();
    LOGIN({ ...person, remember }).then(async (token) => {
      if (token.error) {
        setError({
          message: `Graphql error: ${token.error}`,
        });
        setAlert(true);
      } else {
        setError('');
        setAlert(true);
        setTokenWithExpiry(token, remember);
        window.location.href = '/';
      }
    });
  };

  const specialLoginSubmit = (response) => {
    SPECIAL_LOGIN({ email: response.email || response.profileObj.email }).then(async (token) => {
      if (token.error) {
        setError({
          message: `Graphql error: ${token.error}`,
        });
        setAlert(true);
      } else {
        setError('');
        setAlert(true);
        setTokenWithExpiry(token, remember);
        window.location.href = '/';
      }
    });
  };

  return (
    <>
      <Box className={classes.topIce}>
        <img
          className={classes.ice}
          src="/static/img/login_page/top_ice.png"
          alt="topIce"
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
      >
        <LoginForm
          submitLogin={submitLogin}
          specialLoginSubmit={specialLoginSubmit}
          person={person}
          setPerson={setPerson}
          setVisible={setVisible}
          setRemember={setRemember}
          visible={visible}
        />
      </Box>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        "You've logged in successfully!",
      )}
    </>
  );
};

export default Login;
