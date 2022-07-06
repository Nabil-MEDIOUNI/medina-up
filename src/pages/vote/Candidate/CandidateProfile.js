import React from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-apollo';
import { Button, Typography } from '@material-ui/core';
import { GET_CANDIDATE } from '../../../apollo/queries/votes';
import BackButton from '../../../components/_common/BackButton';
import ConfirmVote from '../Display/ConfirmVote';

const CandidateProfile = ({ match }) => {
  const { candidate, id, name } = match.params;
  const { data, loading } = useQuery(GET_CANDIDATE, {
    variables: {
      id,
      name,
      candidate,
    },
  });
  const [voteModel, setVoteModel] = React.useState(false);

  const singleCandidate = data?.getCandidate;

  return (
    <Box>
      <Box
        p={2}
        position="absolute"
        display="flex"
        alignItems="center"
        zIndex="2"
      >
        <Box pr={4}>
          <BackButton color="white" fontsize="24px" />
        </Box>
        <Typography style={{ color: 'white', fontWeight: 600 }}>
          Candidate Profile
        </Typography>
      </Box>
      <Box
        width="100%"
        position="relative"
        height={
          singleCandidate && singleCandidate.full_name === 'Ghailen Boughzala'
            ? '77vh'
            : singleCandidate && singleCandidate.full_name === 'Eya Hanefi'
              ? '49vh'
              : '55vh'
        }
      >
        <Box
          style={{ background: '#00000012' }}
          position="absolute"
          width="100%"
          height="100%"
          zIndex="1"
        />
        <img
          src={singleCandidate && singleCandidate.cover_photo}
          alt=""
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
        />
        <Box
          position="absolute"
          bottom="0px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          pb={2}
          zIndex={99}
        >
          <Box ml={2}>
            <Typography
              style={{ fontWeight: 600, fontSize: 16, color: 'white' }}
            >
              {singleCandidate && singleCandidate.full_name}
            </Typography>
            <Typography
              style={{
                fontWeight: 100,
                color: 'white',
                fontSize: 12,
                opacity: 0.9,
              }}
            >
              {singleCandidate && singleCandidate.location}
            </Typography>
          </Box>
          <Button
            style={{ marginRight: 16 }}
            color="primary"
            variant="contained"
            onClick={() => setVoteModel(true)}
          >
            <Typography style={{ color: 'white', fontSize: 14 }}>
              Vote
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box mt={3} mx={2} pb={2}>
        <Box>
          <Typography
            style={{
              color: '#007AF5',
              fontWeight: 700,
              fontSize: 14,
              paddingBottom: 16,
            }}
          >
            SHORT BIOGRAPHY
          </Typography>
          <Typography
            style={{
              color: '#53565E',
              fontWeight: 400,
              opacity: 0.85,
              fontSize: 14,
            }}
          >
            {singleCandidate && singleCandidate.short_bio}
          </Typography>
        </Box>
      </Box>
      <ConfirmVote
        open={voteModel}
        onClose={() => setVoteModel(false)}
        setRoom={setVoteModel}
        candidate={singleCandidate}
        id={id}
        name={name}
        loading={loading}
      />
    </Box>
  );
};

export default CandidateProfile;
