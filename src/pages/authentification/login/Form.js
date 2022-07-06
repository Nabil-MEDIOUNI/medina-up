import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import {
  Person, Lock, Visibility, VisibilityOff,
} from '@material-ui/icons';

import { Link } from 'react-router-dom';
import './login.css';
import { handleMany } from '../../../utils/handle';
import Copyright from '../../../components/_common/Copyright';
import BigFoot from '../../../components/_common/BigFoot';

import useStyles from '../styles';
import SpecialLogin from './SpecialLogin';

const LoginForm = ({
  submitLogin,
  specialLoginSubmit,
  person,
  setPerson,
  setVisible,
  setRemember,
  visible,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box className="top_section">
        <BigFoot />
        <Box mt={4} className="container" style={{ width: '70vw' }}>
          <form onSubmit={submitLogin}>
            <Box mb={3} style={{ position: 'relative' }}>
              <input
                onChange={handleMany(person, setPerson, 'email')}
                placeholder="Email"
                id="email"
                className="input"
                onError="You have entered an invalid email address!"
                required
              />
              <Person className="icon" />
            </Box>
            <Box style={{ position: 'relative' }}>
              <input
                onChange={handleMany(person, setPerson, 'password')}
                placeholder="Password"
                id="password"
                className="input"
                type={visible ? 'text' : 'password'}
                required
              />
              <Lock className="icon" />
              <label htmlFor="password">
                {!visible && (
                  <Visibility
                    onClick={() => setVisible(!visible)}
                    className="visibility_icon"
                  />
                )}
                {visible && (
                  <VisibilityOff
                    onClick={() => setVisible(!visible)}
                    className="visibility_icon"
                  />
                )}
              </label>
            </Box>
            <Box
              mt={2.5}
              ml={1.5}
              display="flex"
              alignItems="center"
              flexDirection="row"
            >
              <Box mr={1}>
                <input
                  onChange={(e) => setRemember(e.target.checked)}
                  type="checkbox"
                  style={{ padding: 5 }}
                />
              </Box>
              <Typography variant="caption">Remember me</Typography>
            </Box>
            <Box
              mt={1.5}
              display="flex"
              justifyContent="flex-end"
              flexDirection="row"
            >
              <Typography variant="caption">
                <Link className={classes.link} to="/forgot">
                  Forgot your password?
                </Link>
              </Typography>
            </Box>
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button type="submit" className={classes.loginButton}>
                LOGIN
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Box mt={5}>
        <Box className="seperator">or</Box>
        <SpecialLogin specialLoginSubmit={specialLoginSubmit} />
      </Box>
      <Copyright />
    </>
  );
};

export default LoginForm;
