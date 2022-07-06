import React from 'react';
import { Box, Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import useStyles from '../styles';

const SpecialLogin = ({ specialLoginSubmit }) => {
  const classes = useStyles();

  return (
    <Box mb="3rem">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Box
            onClick={renderProps.onClick}
            display="flex"
            alignItems="center"
            width="70%"
            position="relative"
            m="0 auto"
            boxShadow="0px 0px 10px #f2f2f2"
            mt={3}
          >
            <img
              className={classes.btnsImg}
              src="/static/icons/google.png"
              alt=""
            />
            <Button className={classes.buttons} style={{ paddingLeft: 46 }}>
              Continue with Google
            </Button>
          </Box>
        )}
        onSuccess={specialLoginSubmit}
        onFailure={specialLoginSubmit}
      />
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fields="name,email,picture"
        render={(renderProps) => (
          <Box
            onClick={renderProps.onClick}
            display="flex"
            alignItems="center"
            width="70%"
            position="relative"
            m="0 auto"
            boxShadow="0px 0px 10px #f2f2f2"
            mt={2}
          >
            <img
              className={classes.btnsImg}
              src="/static/icons/facebook.webp"
              alt=""
            />
            <Button className={classes.buttons} style={{ paddingLeft: 60 }}>
              Continue with Facebook
            </Button>
          </Box>
        )}
        callback={specialLoginSubmit}
      />
    </Box>
  );
};

export default SpecialLogin;
