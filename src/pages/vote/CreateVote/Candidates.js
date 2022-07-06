import React from 'react';
import {
  Box, IconButton, MenuItem, Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
// import allCandidates from '../../../constants/candidates';
import UserAvatar from '../../../components/_common/Avatar';

const Candidates = ({ selectedCandidate, setCandidate }) => {
  const getCandidate = (candidate) => {
    const checkList = selectedCandidate.map(
      (item) => item.full_name,
    ).includes(candidate.full_name);
    if (checkList) {
      return false;
    }
    setCandidate((oldArray) => [...oldArray, candidate]);
  };
  const removeCandidate = (candidate) => {
    const newList = selectedCandidate.filter(
      (item) => item.full_name !== candidate.full_name,
    );
    setCandidate(newList);
  };
  const getKeys = (id) => selectedCandidate.map(({ key }) => key).includes(id);

  return (
    <Box mx={2} my={2}>
      <Typography style={{ fontSize: 14 }} variant="body1">
        Candidates
      </Typography>
      <Box my={2}>
        {[].map((candidate) => (
          <Box
            style={{
              boxShadow: getKeys(candidate.key) && '0px 0px 10px #dddddd',
              background: getKeys(candidate.key) && '#dddddd',
              padding: getKeys(candidate.key) && 4,
              borderRadius: getKeys(candidate.key) && 4,
            }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <MenuItem style={{ width: '100%' }} onClick={() => getCandidate(candidate)}>
              <UserAvatar borderRadius="2px" size="40px" src={candidate.cover_photo} />
              <Typography style={{ marginLeft: 16 }}>{candidate.full_name}</Typography>
            </MenuItem>
            {getKeys(candidate.key) && (
            <IconButton onClick={() => removeCandidate(candidate)}>
              <Close style={{ fontSize: 16 }} />
            </IconButton>
            )}
          </Box>
        ))}
      </Box>
      <Typography style={{ fontSize: 14 }} variant="body1">
        total candidates:
        {' '}
        {selectedCandidate.length}
      </Typography>
    </Box>
  );
};

export default Candidates;
