import React, { useContext, useState } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { getRoomquery } from '../../../apollo/queries/votes';
import TopBar from '../../../components/Navigation/TopBar';
import Loading from '../../../components/_common/Loading';
import UserAvatar from '../../../components/_common/Avatar';
import DrawerLeft from '../../../components/Navigation/DrawerLeft';
import ConfirmVote from '../Display/ConfirmVote';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import EmptyList from '../../../components/_common/EmptyList';

const SingleRoom = ({ match }) => {
  const { id, name } = match.params;

  const [data, setData] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const user = useContext(UserInfoContext);

  React.useEffect(() => {
    getRoomquery(id, name)
      .then(({ data: { data: getRoom } }) => {
        setLoading(false);
        setData(getRoom);
      })
      .catch((err) => console.log(err));
  }, [id, name]);

  const [voteModel, setVoteModel] = React.useState(false);
  const [search, setSearch] = useState('');
  const [can, setCan] = useState('');

  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };
  const candidates = data.getRoom?.candidates.filter(
    (item) => item.full_name.toLowerCase().indexOf(search) !== -1,
  );
  function truncate(str, n) {
    return str.length > n ? `${str.substr(0, n - 1)}...` : str;
  }
  const getCandidate = (e) => {
    setCan(e);
    setVoteModel(true);
  };

  const [openDrawer, setDrawer] = useState(false);
  const location = useHistory();

  const getVotes = data?.getRoom?.poll_voters.find(
    ({ voter }) => voter.full_name === user.data?.currentPerson.full_name,
  )?.votes.candidates;

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="100vh"
        zIndex={0}
      />
      <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      <TopBar
        title={data.getRoom?.title}
        placeholder="candidates"
        UpdateSearch={UpdateSearch}
        setSearch={setSearch}
        search={search}
        withSearch
        showBar
        setDrawer={() => setDrawer(!openDrawer)}
      />
      {data.getRoom?.open ? (
        <Box my={4} mb={7.5} position="relative">
          <EmptyList page="candidates" data={data} />
          <Box
            display="flex"
            width="100%"
            pt="3rem"
            alignItems="center"
            flexDirection="column"
          >
            {!loading && (
              <Typography
                onClick={() => {
                  location.push(
                    `/live-vote/${match.params.id}/${match.params.name}`,
                  );
                }}
                style={{
                  color: '#ffaa00',
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  textAlign: 'center',
                  background: 'white',
                  boxShadow: '0px 0px 10px #e3e1e1',
                  width: '50%',
                  padding: '12px 4px',
                  borderRadius: 5,
                }}
              >
                Watch LIVE Vote!
              </Typography>
            )}
            {!loading ? (
              candidates && candidates.map((candidate) => (
                <Box
                  key={candidate.full_name}
                  mb={2}
                  p={1}
                  bgcolor="white"
                  width="85%"
                  boxShadow="0px 1px 6px #0000001a"
                  borderRadius="4px"
                >
                  <Box display="flex" alignItems="center">
                    <Box pl={1} width="100%">
                      <Typography
                        style={{ fontSize: 12, textTransform: 'capitalize' }}
                      >
                        {candidate.location}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          padding: '8px 0px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {candidate.full_name}
                      </Typography>
                    </Box>
                    <UserAvatar
                      borderRadius="2px"
                      src={candidate.cover_photo}
                      size="50px"
                    />
                  </Box>
                  <Typography
                    style={{ fontSize: 12, marginLeft: 8, marginTop: 8 }}
                  >
                    {truncate(candidate.short_bio, 80)}
                  </Typography>
                  <Box
                    mt={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Link
                        style={{
                          textDecoration: 'none',
                          color: 'currentColor',
                          outline: 'none',
                          userSelect: 'none',
                        }}
                        to={`/vote-rooms/${id}/${name}/${candidate.full_name}`}
                      >
                        <Button>
                          <Typography
                            color="primary"
                            style={{
                              fontWeight: 600,
                              color: 'rgb(0, 122, 245)',
                            }}
                            variant="caption"
                          >
                            VIEW PROFILE
                          </Typography>
                        </Button>
                      </Link>
                      <Button onClick={() => getCandidate(candidate)}>
                        <Typography
                          color="primary"
                          style={{ fontWeight: 600, color: 'rgb(0, 122, 245)' }}
                          variant="caption"
                        >
                          VOTE
                        </Typography>
                      </Button>
                    </Box>
                    <Box mr={2}>
                      {getVotes?.includes(candidate.full_name) && (
                        <img src="/static/icons/pour.png" width="18px" alt="" />
                      )}
                    </Box>
                  </Box>
                  <ConfirmVote
                    open={voteModel}
                    onClose={() => setVoteModel(false)}
                    candidate={can}
                    id={match.params.id}
                    name={match.params.name}
                    setRoom={setData}
                    loading={loading}
                  />
                </Box>
              ))
            ) : (
              <div className="big_loading">
                <Loading height="35px" />
              </div>
            )}
          </Box>
        </Box>
      ) : (
        <p />
      )}
    </>
  );
};

export default SingleRoom;
