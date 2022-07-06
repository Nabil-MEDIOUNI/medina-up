import React from 'react';

import {
  Toolbar, AppBar, Box, Button, Typography,
} from '@material-ui/core';

import useStyles from './styles';
import UserAvatar from '../_common/Avatar';

const CommentBar = ({ sendComment, setComment, comment }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          height: 52,
          zIndex: 22,
          backgroundColor: '#FFF',
          boxShadow: '0.05px 0px 8px #dedede',
          bottom: 0,
        }}
      >
        <Toolbar className={classes.Toolbar}>
          <Box
            position="relative"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <form
              style={{ display: 'flex', width: '100%' }}
              onSubmit={sendComment}
            >
              <Box display="flex" alignItems="center" width="100%">
                <UserAvatar userAvatar />
                <input
                  className={classes.commentInput}
                  placeholder="Add a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </Box>
              <Button type="submit" disabled={!comment}>
                <Typography
                  style={{ color: '#1485bd', opacity: !comment ? 0.7 : 1 }}
                  variant="caption"
                >
                  Post
                </Typography>
              </Button>
            </form>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CommentBar;
