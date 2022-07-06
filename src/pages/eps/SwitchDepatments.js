import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const SwitchDepatments = () => {
  const location = useHistory();
  const goTo = (to) => location.push(to);

  return (
    <>
      <Navigation withTopBar title="Switch department" fixBar />
      <Box
        position="relative"
        height="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f4f1f1"
      >
        <Button
          style={{
            padding: 0,
            marginBottom: '8rem',
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: '4px',
            position: 'absolute',
            right: 0,
          }}
        >
          <Box
            onClick={() => goTo('/ogx-eps')}
            p="2rem 4rem"
            style={{
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              boxShadow: '0px 2px 10px #ececec',
            }}
          >
            <Typography
              style={{
                fontSize: '2rem',
                opacity: 0.8,
              }}
            >
              OGX
            </Typography>
          </Box>
        </Button>
        <Button
          style={{
            padding: 0,
            marginTop: '8rem',
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: '4px',
            position: 'absolute',
            left: 0,
          }}
        >
          <Box
            onClick={() => goTo('/icx-eps')}
            p="2rem 4rem"
            style={{
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              boxShadow: '0px 2px 10px #ececec',
            }}
          >
            <Typography
              style={{
                fontSize: '2rem',
                opacity: 0.8,
              }}
            >
              ICX
            </Typography>
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default SwitchDepatments;
