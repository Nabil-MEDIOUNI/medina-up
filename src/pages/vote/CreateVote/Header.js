import React from 'react';

import {
  Box, Typography, Button, IconButton,
} from '@material-ui/core';
import { Clear, ArrowBack } from '@material-ui/icons';
import useStyles from './styles';

const Header = ({
  setVoteModel, submitPost, title, description, candidates, room, setpost, post,
  setTitle, setDescription, setCandidate, setRoom, location, setLocation,
}) => {
  const classes = useStyles();
  const checkFields = () => {
    if (!title || !description || !room || !location || candidates.length === 0 || post) return true;
    return false;
  };
  const clear = () => {
    setTitle('');
    setDescription('');
    setCandidate([]);
    setRoom('');
    setLocation('');
    setpost(true);
  };

  return (
    <Box className={classes.filtersHeader}>
      <Box ml={1} display="flex" alignItems="center">
        {(!checkFields()) && (
        <IconButton onClick={clear}>
          <Clear style={{ fontSize: 22, color: 'white' }} />
        </IconButton>
        )}
        {checkFields() && (
        <IconButton onClick={() => setVoteModel(false)}>
          <ArrowBack style={{ fontSize: 22, color: 'white' }} />
        </IconButton>
        )}
        <Box ml={0.5}>
          <Typography style={{ color: 'white', fontSize: 14 }}>
            Create Room
          </Typography>
        </Box>
      </Box>
      <Box mr={1}>
        <Button onClick={submitPost} disabled={checkFields()}>
          <Typography
            style={{ color: checkFields() ? '#ffffff80' : 'white', fontSize: 14, opacity: 1 }}
          >
            Post
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
