import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import EmptyList from '../../../components/_common/EmptyList';
import SkeletonLoader from '../../../components/EPs/EpListItem/SkeletonLoader';
import { JOIN_VOTE_ROOM } from '../../../apollo/mutations/vote';
import Alert from '../../../utils/alert';
import { PostedAt } from '../../../utils/dateTimeService';

const RoomListItem = ({
  value, rooms, index, loading,
}) => {
  const [joinVoteRoom, { error }] = useMutation(JOIN_VOTE_ROOM);
  const [openAlert, setAlert] = React.useState(false);
  const [getRoom, setSingleRoom] = React.useState({});

  const location = useHistory();
  const joinVote = (id, name) => {
    joinVoteRoom({
      variables: {
        id,
        name,
      },
    }).then(() => {
      location.push(`/vote-rooms/${id}/${name}`);
    }).catch(() => {
      if (!getRoom.open) {
        location.push(`/room-closed/${id}/${name}`);
      } else {
        setAlert(true);
      }
    });
  };

  return (
    <>
      {!loading ? (
        <Box
          role="tabpanel"
          hidden={value !== index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          {value === index && (
          <Box pt="4rem">
            <EmptyList page="rooms" data={rooms} />
            {rooms?.map((room) => (
              <Box
                key={room.room.id}
                bgcolor="white"
                width="85%"
                borderRadius="4px"
                borderLeft="8px solid #30C39E"
                boxShadow="0px 1px 6px #0000001a"
                margin="12px auto"
                position="relative"
                p="6px"
                onClick={() => {
                  setSingleRoom(room);
                  joinVote(room.room.id, room.room.name);
                }}
              >
                <Box ml={1}>
                  <Box display="flex">
                    <Typography
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {room.title}
                    </Typography>

                  </Box>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      opacity: 0.85,
                      textTransform: 'capitalize',
                    }}
                  >
                    {room.location}
                  </Typography>
                </Box>
                <Typography style={{
                  padding: '2px 4px',
                  borderRadius: '10%',
                  fontSize: 10,
                  marginLeft: 8,
                  background: room.open ? '#0cb9c18c' : '#f85a40b5',
                  border: room.open ? '1px solid rgb(12, 185, 193)' : '1px solid #f85a40',
                  color: 'white',
                  position: 'absolute',
                  right: 16,
                  top: 8,
                }}
                >
                  {room.open ? 'Live' : 'Closed'}
                </Typography>
                <Box mt={1} mx={1}>
                  <Typography variant="caption">
                    {room.description}
                  </Typography>
                </Box>
                <Box py={1.25} />
                <Box mx={1.25} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography style={{
                    fontSize: 10,
                    fontWeight: 400,
                    opacity: 0.85,
                    textTransform: 'capitalize',
                  }}
                  >
                    {room.candidates.length}
                    {' '}
                    {room.candidates.length > 1 ? 'candidates' : 'candidate'}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      opacity: 0.85,
                    }}
                  >
                    {PostedAt(room.createdAt)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          )}
        </Box>
      ) : (
        <>
          {[...Array(8)].map(() => (
            <SkeletonLoader />
          ))}
        </>
      )}
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
      )}
    </>
  );
};

export default RoomListItem;
