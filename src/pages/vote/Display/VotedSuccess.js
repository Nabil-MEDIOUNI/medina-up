import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const VotedSuccess = ({ match }) => {
  const location = useHistory();
  return (
    <>
      <Box
        position="fixed"
        bgcolor="#ffaa00"
        width="100%"
        height="100vh"
        zIndex={-1}
      />
      <Box
        display="flex"
        height="100vh"
        justifyContent="space-around"
        flexDirection="column"
      >
        <img src="/static/img/voted.gif" alt="" width="100%" />
        <Box>
          <Button
            onClick={() => location.push('/')}
            style={{ width: '47%', display: 'flex', margin: '8px auto' }}
          >
            <Typography style={{ fontSize: 14 }}>
              Return to dashboard
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{
              width: '47%',
              display: 'flex',
              margin: '8px auto',
              backgroundColor: 'white',
              height: '2.5rem',
            }}
            onClick={() => {
              location.push(
                `/live-vote/${match.params.id}/${match.params.name}`,
              );
            }}
          >
            <Typography style={{ color: '#ffaa00' }}>
              Watch Vote LIVE!
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default VotedSuccess;
