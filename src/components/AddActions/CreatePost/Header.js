import React from 'react';

import {
  Box, Typography, Button, IconButton,
} from '@material-ui/core';
import { Clear, ArrowBack } from '@material-ui/icons';
import useStyles from './styles';

const Header = ({
  setPostModel,
  submitPost,
  title,
  description,
  attachements,
  setAttachements,
  setImage,
  setTitle,
  setDescription,
  post,
  setVideo,
  showalWays,
  headerTitle,
}) => {
  const classes = useStyles();
  const checkFields = () => {
    if ((!title && !description && !attachements) || post) return true;
    return false;
  };
  const clear = () => {
    setAttachements('');
    setImage('');
    setVideo('');
    setTitle('');
    setDescription('');
  };

  return (
    <Box className={classes.filtersHeader}>
      <Box ml={1} display="flex" alignItems="center">
        {!checkFields() && !showalWays && (
          <IconButton onClick={clear}>
            <Clear style={{ fontSize: 22, color: 'white' }} />
          </IconButton>
        )}
        {(checkFields() || showalWays) && (
          <IconButton onClick={() => setPostModel(false)}>
            <ArrowBack style={{ fontSize: 22, color: 'white' }} />
          </IconButton>
        )}
        <Box ml={0.5}>
          <Typography style={{ color: 'white', fontSize: 14 }}>
            Share
            {' '}
            {headerTitle}
          </Typography>
        </Box>
      </Box>
      <Box mr={1}>
        <Button onClick={submitPost} disabled={checkFields()}>
          <Typography
            style={{
              color: checkFields() ? '#ffffff80' : 'white',
              fontSize: 14,
              opacity: 1,
            }}
          >
            Post
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
