import React from 'react';
import { Box, Typography } from '@material-ui/core';
import CommentOptions from './CommentOptions';
import CommentInfo from './CommentInfo';

const CommentSection = ({ post, comments }) => (
  <Box m={2}>
    {comments.length !== 0 && (
      <Box>
        <Typography>Comments</Typography>
      </Box>
    )}
    {comments.length === 0 && (
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <img src="/static/img/comment.svg" width="50%" alt="" />
        <Box mt={1}>
          <Typography style={{ fontWeight: 600 }} variant="caption">
            Be the first to comment
          </Typography>
        </Box>
      </Box>
    )}
    {comments.map((comment) => (
      <>
        <CommentInfo showIcon post={post} comment={comment} />
        <Box
          justifyContent="space-between"
          display="flex"
          alignItems="center"
        >
          <CommentOptions comment={comment} post={post} />
        </Box>
      </>
    ))}
  </Box>
);

export default CommentSection;
