import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import './index.css';
import { Lock } from '@material-ui/icons';
import { useMutation } from 'react-apollo';
import { PASSWORD_UPDATE } from '../../apollo/mutations/currentPerson';
import Alert from '../../utils/alert';
import { handleMany } from '../../utils/handle';
import BackButton from '../../components/_common/BackButton';

const useStyles = makeStyles((theme) => ({
  bg: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#f7f7f7',
    height: '100vh',
    width: '100%',
  },
  whiteBox: {
    backgroundColor: 'white',
    height: 'fit-content',
    width: '80%',
    borderRadius: 5,
    boxShadow: '0px 0px 6px #a1a1a1',
    padding: theme.spacing(2),
    margin: theme.spacing(4, 'auto'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    background: 'linear-gradient(90deg, #037EF3, #30C39E)',
    color: '#FFFFFF',
    width: '100%',
    fontSize: 12,
    boxShadow: '0px 3px 6px #00000029',
  },
  ArrowBackIcon: {
    position: 'fixed',
    top: 30,
    left: 15.5,
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const [login, { error }] = useMutation(PASSWORD_UPDATE);
  const [openAlert, setAlert] = useState(false);
  const [matchError, setMatchError] = useState({ message: undefined });

  const [person, setPerson] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const submitLogin = (e) => {
    e.preventDefault();
    if (person.newPassword === person.confirmPassword) {
      setMatchError('');
      login({
        variables: {
          oldPassword: person.oldPassword,
          newPassword: person.newPassword,
        },
      })
        .then(() => {
          setAlert(true);
        })
        .catch(() => {
          setAlert(true);
        });
    } else {
      setMatchError({ message: 'Graphql error: Two passwords do not match!' });
    }
  };

  const inputs = [
    {
      holder: 'Current Password',
      onchange: handleMany(person, setPerson, 'oldPassword'),
    },
    {
      holder: 'New password',
      onchange: handleMany(person, setPerson, 'newPassword'),
    },
    {
      holder: 'Confirm new password',
      onchange: handleMany(person, setPerson, 'confirmPassword'),
    },
  ];

  return (
    <Box className={classes.bg}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Box className={classes.ArrowBackIcon}>
          <BackButton color route="/settings" fontsize="24px" />
        </Box>
        <Box>
          <Typography variant="body1" style={{ marginTop: 38 }}>
            Change Password
          </Typography>
        </Box>
      </Box>
      <Box className={classes.whiteBox}>
        <Box
          my={5}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box>
            <img src="/static/icons/key.svg" alt="" />
          </Box>
          <Box
            mt={8}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <form onSubmit={submitLogin}>
              {inputs.map((inp) => (
                <Box key={inp.holder} style={{ position: 'relative' }} mb={3}>
                  <input
                    placeholder={inp.holder}
                    onChange={inp.onchange}
                    className="input"
                    style={{
                      border: '1px solid #e2e2e2',
                      borderRadius: 5,
                      width: 'auto',
                    }}
                    type="password"
                    required
                  />
                  <Lock className="icon" />
                </Box>
              ))}
              <Box
                mt={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button type="submit" className={classes.loginButton}>
                  change password
                </Button>
              </Box>
            </form>
          </Box>
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

export default ChangePassword;
