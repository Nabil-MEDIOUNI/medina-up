import React, { useContext } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { GET_ROOM } from '../../../apollo/queries/votes';

const RoomClosed = ({ match }) => {
  const location = useHistory();
  const { data } = useContext(UserInfoContext);

  const vote = useQuery(GET_ROOM, {
    variables: {
      id: match.params.id,
      name: match.params.name,
    },
    pollInterval: 5000,
  });

  return (
    <>
      <Box
        position="fixed"
        bgcolor="white"
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
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography
            style={{
              fontSize: 34,
              color: '#e32013',
              fontWeight: 600,
              paddingBottom: '1rem',
            }}
          >
            Room is
          </Typography>
          <img src="/static/img/closed.png" style={{ transform: 'rotate(2deg)' }} alt="" width="80%" />
        </Box>
        <Box>
          {((data && data?.currentPerson.is_admin) || (vote && vote.data && vote.data.getRoom
          && vote.data.getRoom.show_result)) && (
          <Button
            style={{ width: '47%', display: 'flex', margin: '8px auto' }}
            onClick={() => {
              location.push(
                `/vote-result/${match.params.id}/${match.params.name}`,
              );
            }}
          >
            <Typography style={{ color: '#ffaa00' }}>
              See the result
            </Typography>
          </Button>
          )}
          <Button
            onClick={() => {
              localStorage.removeItem('voted');
              location.push('/');
            }}
            style={{ width: '47%', display: 'flex', margin: '8px auto' }}
          >
            <Typography>Return to dashboard</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RoomClosed;
