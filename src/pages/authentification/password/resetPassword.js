import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import './reserpassword.css';

import { Lock, Mail } from '@material-ui/icons';
import BackButton from '../../../components/_common/BackButton';
import { CHANGE_PASSWORD } from '../../../apollo/mutations/authentification';
import Alert from '../../../utils/alert';
import useStyles from '../styles';

const ResetPassword = (props) => {
  const classes = useStyles();

  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [email, setEmail] = useState(false);

  const [matchError, setMatchError] = useState({ message: undefined });
  const [openAlert, setAlert] = useState(false);
  const [error, setError] = useState({ message: undefined });

  const submitreset = (e) => {
    if (password !== confirmPassword) {
      setMatchError({ message: 'Graphql error: Two passwords do not match!' });
      setAlert(true);
      return false;
    }
    setMatchError('');
    e.preventDefault();
    CHANGE_PASSWORD({ email, password, id: props.match.params.id })
      .then((res) => {
        if (res.error) {
          setError({
            message: `Graphql error: ${res.error}`,
          });
          setAlert(true);
        } else {
          setError('');
          setAlert(true);
          window.location.href = '/login';
        }
      });
  };

  return (
    <Box className="resetpassword-container">
      <Box className="Arrownimag">
        <BackButton className="arrowB" route="/login" fontsize="24px" />
        <Typography
          variant="body1"
          style={{ margin: '0 auto', color: 'white' }}
        >
          Reset Password
        </Typography>
      </Box>
      <Box className="resetimgc">
        <img src="/static/img/lockkey.png" alt="" className="resetimggg" />
      </Box>
      <Box className="parttwoo">
        <Box pt="3rem" className="container" style={{ width: '70vw' }}>
          <form>
            <Box
              mb={2}
              position="relative"
              display="flex"
              justifyContent="center"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="input"
                type="email"
                required
              />
              <Mail className="icon" />
            </Box>
            <Box
              mb={2}
              position="relative"
              display="flex"
              justifyContent="center"
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                id="password"
                className="input"
                type="password"
                required
              />
              <Lock className="icon" />
            </Box>
            <Box position="relative" display="flex" justifyContent="center">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                id="password"
                className="input"
                type="password"
                required
              />
              <Lock className="icon" />
            </Box>
            <Box
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="button"
                onClick={submitreset}
                className={classes.loginButtonzzz}
              >
                RESET PASSWORD
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      {Alert(
        matchError || error,
        openAlert,
        () => setAlert(false),
        'Password changed successfully!',
      )}
    </Box>
  );
};

export default ResetPassword;
