import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import ReactionsList from '../../Reactions/ReactionsList';

const AllReactions = ({ comment }) => {
  const [openReactionModel, setReactionModel] = React.useState(false);

  return (
    <>
      <Box ml={2} display="flex" alignItems="center">
        {comment.likes?.count > 0 && (
          <Box
            display="flex"
            alignItems="center"
            onClick={() => setReactionModel(true)}
          >
            <Typography
              style={{ fontSize: 12, marginRight: 2, color: '#1485bd' }}
              variant="caption"
            >
              {comment.likes.count}
            </Typography>
            <img width="16px" src="/static/icons/like.svg" alt="" />
          </Box>
        )}
        {comment.replies?.length > 0 && (
          <Box
            display="flex"
            alignItems="center"
            ml={0.5}
            onClick={() => setReactionModel(true)}
          >
            <Typography
              style={{ fontSize: 12, marginRight: 2, color: '#1485bd' }}
              variant="caption"
            >
              {comment.replies.length}
            </Typography>
            <ReplyIcon style={{ color: '#107ab1' }} />
          </Box>
        )}
      </Box>
      <ReactionsList
        data={comment.likes?.liked_by}
        title="All Reactions"
        showLikeIcon
        open={openReactionModel}
        onClose={() => setReactionModel(false)}
      />
    </>
  );
};

export default AllReactions;
