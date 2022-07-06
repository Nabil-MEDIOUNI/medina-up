import React from 'react';

import {
  Box, Divider, IconButton, Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import useStyles from '../../../AddActions/CreatePost/styles';

const Header = ({ setReplyModel, comment, post }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.filtersHeader}>
        <Box ml={1} display="flex" alignItems="center">
          <IconButton onClick={() => setReplyModel(false)}>
            <ArrowBack style={{ fontSize: 22, color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
      <Box my={3}>
        <Box mx={2} mb={1}>
          <Typography variant="caption">
            Replies to
            {' '}
            <span style={{ fontWeight: 700 }}>
              {comment.commenter.full_name}
              ,
              {' '}
              {comment.commenter.current_positions.position_name}
            </span>
            {' '}
            comment on this
            {' '}
            <span
              style={{ fontWeight: 700 }}
              onClick={() => setReplyModel(false)}
            >
              post
            </span>
          </Typography>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default Header;
