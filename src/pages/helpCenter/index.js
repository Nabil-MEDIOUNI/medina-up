import {
  Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect } from 'react';
import Copyright from '../../components/_common/Copyright';
import GrayBackground from '../../components/_common/GrayBackground';
import Header from './Header';
import HelpButtons from './HelpButtons';

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    background: 'white',
    width: '80%',
    margin: '0 auto',
    alignItems: 'center',
    boxShadow: '0px 0px 10px #d8d8d8',
    borderRadius: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    paddingLeft: theme.spacing(4),
    opacity: 0.8,
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    fontSize: 20,
    opacity: 0.65,
  },
  searchBtn: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const HelpCenter = () => {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'df430bb9332b7623f8c73844dbfc3115ff9d5619';
    script.async = true;
    script.src = 'https://embed.tawk.to/5f6538ef4704467e89f04a58/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  });

  return (
    <>
      <GrayBackground />
      <Header />
      <Box
        height="100vh"
        justifyContent="space-evenly"
        display="flex"
        flexDirection="column"
      >
        <Box>
          <Typography className={classes.question}>
            Hello, How can we help?
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.questionContainer}
          >
            <Box width="90%">
              <Box
                position="relative"
                display="flex"
                alignItems="center"
                my={2}
              >
                <Search className={classes.searchIcon} />
                <input
                  className={classes.input}
                  placeholder="Ask a question..."
                />
              </Box>
              <Button
                className={classes.searchBtn}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </Box>
          </Box>
          <HelpButtons />
        </Box>
        <Copyright />
      </Box>
    </>
  );
};

export default HelpCenter;
