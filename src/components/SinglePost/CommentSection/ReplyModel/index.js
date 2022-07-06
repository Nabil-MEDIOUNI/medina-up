import React from 'react';

import SwipeableDrawer from '@material-ui/core/Drawer';
import { Box } from '@material-ui/core';
import Header from './Header';

import Alert from '../../../../utils/alert';
import useStyles from '../../../AddActions/CreatePost/styles';
import CommentBar from './CommentBar';
import CommentInfo from '../CommentInfo';
import CommentOptions from '../CommentOptions';

const ReplyModel = ({
  openReplyModel, setReplyModel, post, comment,
}) => {
  const classes = useStyles();
  const [openAlert, setAlert] = React.useState(false);

  return (
    <>
      <SwipeableDrawer
        className={classes.root}
        anchor="bottom"
        open={openReplyModel}
        onClose={() => setReplyModel(false)}
      >
        <Header comment={comment} post={post} setReplyModel={setReplyModel} />
        <Box className={classes.filterContent} pb="4rem">
          <Box mx={1}>
            <CommentInfo showIcon post={post} comment={comment} />
            <CommentOptions comment={comment} post={post} />
          </Box>
          {comment.replies.map((reply) => (
            <Box ml={4} mr={1}>
              <CommentInfo post={post} comment={reply} />
            </Box>
          ))}
        </Box>
        <CommentBar getcomment={comment} post={post} />
      </SwipeableDrawer>
      {Alert(
        'error',
        openAlert,
        () => setAlert(false),
        'Post is created successfully!',
      )}
    </>
  );
};

export default ReplyModel;
