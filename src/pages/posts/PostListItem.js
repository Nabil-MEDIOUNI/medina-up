import React from 'react';
import { Box } from '@material-ui/core';
import CreatorInfo from './Display/CreatorInfo';
import Content from './Display/Content';

const PostListItem = ({ post }) => (
  <Box>
    <Box my={0.5} bgcolor="white" boxShadow="0px 2px 3px #c1c1c1">
      <CreatorInfo post={post} />
      <Content post={post} />
    </Box>
  </Box>
);

export default PostListItem;
