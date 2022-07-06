/* eslint-disable react/no-danger */
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SwitchPostType from '../SwitchPostType';
import useStyles from '../styles';
import PostOptions from './PostOptions';
import urlify from '../../../utils/others/transformToLink';

const Content = ({ post }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box p="4px 16px 16px 16px">
        <Typography style={{ textTransform: 'capitalize' }} variant="body1">{post.title}</Typography>
        <Box>
          <Typography
            style={{ whiteSpace: 'break-spaces' }}
            className={classes.postDescription}
            variant="caption"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: urlify(post.description),
              }}
            />
          </Typography>
        </Box>
      </Box>
      <Box mb={1}>
        <SwitchPostType data={post} />
      </Box>
      <PostOptions post={post} />
    </Box>
  );
};

export default Content;
