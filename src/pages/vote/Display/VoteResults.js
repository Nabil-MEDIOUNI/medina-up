import React, { useContext } from 'react';

import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useMutation, useQuery } from 'react-apollo';
import { Clear, Search } from '@material-ui/icons';
import { GET_ROOM } from '../../../apollo/queries/votes';
import Loading from '../../../components/_common/Loading';
import UserAvatar from '../../../components/_common/Avatar';
import Divider from '../../../components/_common/Divider';
import TopBar from '../../../components/Navigation/TopBar';
import DrawerLeft from '../../../components/Navigation/DrawerLeft';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { SHOW_VOTE_RESULT } from '../../../apollo/mutations/vote';
import Alert from '../../../utils/alert';

const useStyles = makeStyles(() => ({
  searchContatiner: {
    alignItems: 'center',
    display: 'flex',
  },
  searchInput: {
    background: 'white',
    width: '100%',
    height: 35,
    border: 'none',
    borderRadius: 4,
    paddingLeft: 35,
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    fontSize: 19,
    paddingLeft: 8,
    opacity: 0.45,
    zIndex: 1,
  },
}));

const VoteResults = ({ match }) => {
  const classes = useStyles();
  const user = useContext(UserInfoContext);

  const { data, loading } = useQuery(GET_ROOM, {
    variables: {
      id: match.params.id,
      name: match.params.name,
    },
  });

  const [showVoteResult, { error }] = useMutation(SHOW_VOTE_RESULT, {
    refetchQueries: [
      {
        query: GET_ROOM,
        variables: {
          id: match.params.id,
          name: match.params.name,
        },
      },
    ],
  });

  const [search, setSearch] = React.useState('');
  const [openDrawer, setDrawer] = React.useState(false);
  const [openAlert, setAlert] = React.useState(false);

  if (loading) {
    return (
      <div className="big_loading">
        <Loading height="35px" />
      </div>
    );
  }

  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };
  const slicedSearch = search;
  const getVoters = data.getRoom?.poll_voters.filter(
    (item) => item.voter.full_name
      ?.toLowerCase()
      .indexOf(search && search.toLowerCase()) !== -1,
  );

  return (
    <>
      <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      <TopBar showBoxShadow setDrawer={() => setDrawer(!openDrawer)} />
      <>
        <Box
          mt="5rem"
          mb={4}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 600,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            All Candidates
          </Typography>
          <Box
            width="5rem"
            height="0.125rem"
            mt={1}
            bgcolor="#000000c4"
            borderRadius="25px"
          />
        </Box>
        <Box
          display="flex"
          overflow="auto"
          justifyContent={data.getRoom.candidates.length === 1 && 'center'}
          whiteSpace="nowrap"
          mx={2}
          py={0.5}
        >
          {data.getRoom.candidates.map((candidate) => (
            <>
              <Box
                boxShadow="0px 0px 10px #ebebeb"
                borderRadius="6px"
                width="75%"
                height="fit-content"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                mx={2}
              >
                <Box
                  position="absolute"
                  style={{
                    background: 'linear-gradient(90deg, #ff9f49, #fb3c00ad)',
                  }}
                  width="100%"
                  height="40%"
                  zIndex={-1}
                />
                <Box
                  mt="2.5rem"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p="0px 5rem"
                >
                  <UserAvatar
                    size="5rem"
                    border="2px solid white"
                    src={candidate.cover_photo}
                  />
                  <Typography style={{ marginTop: 8 }}>
                    {candidate.full_name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" m="24px auto">
                  <Box display="flex" alignItems="center">
                    <img src="/static/icons/pour.png" width="18px" alt="" />
                    <Typography
                      variant="caption"
                      style={{ marginLeft: 8, color: '#00c16e' }}
                    >
                      {candidate.points.with}
                    </Typography>
                  </Box>
                  <Box ml={2} display="flex" alignItems="center">
                    <img src="/static/icons/contre.png" width="18px" alt="" />
                    <Typography
                      variant="caption"
                      style={{ marginLeft: 8, color: '#f85a40' }}
                    >
                      {candidate.points.vs}
                    </Typography>
                  </Box>
                </Box>
                {/* <Divider marginTop="0px" />
                <Box
                  mt={3}
                  position="relative"
                  height="8px"
                  borderRadius="25px"
                  width="80%"
                  boxShadow="#e6e3e3 0px 1px 5px"
                  display="flex"
                  margin="0 auto"
                >
                  <Box
                    width={`${parseInt(
                      ((candidate.points.with - candidate.points.vs) * 100)
                        / data.getRoom.poll_voters.length,
                      10,
                    )}%`}
                    borderRadius="25px"
                    height="100%"
                    style={{ background: '#ff9f49' }}
                  />
                </Box> */}
                {/* <Box display="flex" alignItems="center" m="6px auto">
                  <Typography variant="caption" style={{ color: '#00c16e' }}>
                    {parseInt(
                      ((candidate.points.with - candidate.points.vs) * 100)
                        / data.getRoom.poll_voters.length,
                      10,
                    )}
                    %
                  </Typography>
                  <Typography variant="caption" style={{ marginLeft: 8 }}>
                    {candidate.points.with - candidate.points.vs}
                    {' '}
                    /
                    {' '}
                    {data.getRoom.poll_voters.length}
                  </Typography>
                </Box> */}
              </Box>
            </>
          ))}
        </Box>

        <Box mx={2} mt={4} mb={2}>
          <Typography
            style={{
              color: '#0cb9c1',
              fontWeight: 100,
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            All Voters
          </Typography>
          <Box className={classes.searchContatiner}>
            <Search className={classes.searchIcon} />
            <input
              className={classes.searchInput}
              value={slicedSearch}
              onChange={(e) => UpdateSearch(e)}
              placeholder="Search voter by name"
            />
            {search.length > 1 && (
              <IconButton
                style={{ position: 'absolute', right: '2.5rem' }}
                onClick={() => setSearch('')}
              >
                <Clear style={{ fontSize: 17 }} />
              </IconButton>
            )}
          </Box>
          <Box height="15rem" overflow="auto" p="0px 1px">
            <Box pt="1px" my={2} boxShadow="#f6f2f2 0px 1px 10px">
              {getVoters?.reverse().map((voter) => (
                <Box>
                  <Box
                    mt={2}
                    mx={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <Box>
                        <UserAvatar
                          size="32px"
                          border
                          src={voter.voter.cover_photo}
                        />
                      </Box>
                      <Box ml={2}>
                        <Typography style={{ textTransform: 'capitalize' }}>
                          {voter.voter.full_name}
                        </Typography>
                        <Typography
                          style={{
                            textTransform: 'capitalize',
                            fontSize: 10,
                            opacity: 0.7,
                          }}
                        >
                          {voter.voter.current_positions.position_name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          padding: '2px 4px',
                          borderRadius: '10%',
                          fontSize: 10,
                          border: voter.voted
                            ? '1px solid rgb(12, 185, 193)'
                            : '1px solid #f85a40',
                          background: voter.voted ? '#0cb9c1a6' : '#f85a40c7',
                          color: 'white',
                        }}
                      >
                        {voter.voted
                          ? 'Voted'
                          : !voter.can_vote
                            ? 'Was dismissed'
                            : "Didn't vote"}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider opacity="0.4" />
                </Box>
              ))}
              {getVoters?.length === 0 && (
                <Box p={2}>
                  <Typography>No such voter in this room</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box mx={2} mt={4} mb={2}>
          <Typography
            style={{ color: '#0cb9c1', fontWeight: 100, fontSize: 14 }}
          >
            Vote Creator
          </Typography>
          <Box pt="1px" my={2} boxShadow="#f6f2f2 0px 0px 10px">
            <Box>
              <Box
                mx={2}
                p="16px 0px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <Box>
                    <UserAvatar
                      size="32px"
                      border
                      src={data.getRoom.creator.cover_photo}
                    />
                  </Box>
                  <Box ml={2}>
                    <Typography style={{ textTransform: 'capitalize' }}>
                      {data.getRoom.creator.full_name}
                    </Typography>
                    <Typography
                      style={{
                        textTransform: 'capitalize',
                        fontSize: 10,
                        opacity: 0.7,
                      }}
                    >
                      {data.getRoom.creator.current_positions.position_name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {user.data?.currentPerson.is_admin
          && !data.getRoom.show_result && (
            <Box pb={4} display="flex" justifyContent="center">
              <Button
                onClick={() => showVoteResult({
                  variables: {
                    id: match.params.id,
                    name: match.params.name,
                  },
                })
                  .then(() => setAlert(true))
                  .catch(() => setAlert(true))}
                variant="contained"
                style={{
                  height: 45,
                  background: 'linear-gradient(90deg, #0cb9c1, #0cb9c1)',
                }}
              >
                <Typography style={{ fontSize: 16, color: 'white' }}>
                  Show result for everyone
                </Typography>
              </Button>
            </Box>
        )}
        {Alert(
          error,
          openAlert,
          () => setAlert(false),
          'Result is shown for everyone',
        )}
      </>
    </>
  );
};

export default VoteResults;
