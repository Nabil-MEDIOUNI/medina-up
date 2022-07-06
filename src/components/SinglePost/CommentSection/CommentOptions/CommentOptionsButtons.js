import React, { useContext } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { CommenteddAt } from '../../../../utils/dateTimeService';

import UserInfoContext from '../../../UserInfo/UserInfoContext';
import ReplyModel from '../ReplyModel';
import { SEND_SUBSCRIPTION } from '../../../../apollo/mutations/notification';

const CommentOptionsButtons = ({
  comment,
  likeComment,
  disLikeComment,
  post,
}) => {
  const { data: user } = useContext(UserInfoContext);
  const userName = user?.currentPerson.full_name;
  const checkIfliked = ({ likes }) => likes.liked_by.find(({ full_name }) => full_name === userName);
  const [openReplyModel, setReplyModel] = React.useState(false);

  return (
    <Box display="flex" alignItems="center">
      <Typography style={{ fontSize: 12 }} variant="caption">
        {CommenteddAt(comment.createdAt)}
      </Typography>
      {!checkIfliked(comment) ? (
        <Button
          onClick={() => likeComment({
            variables: {
              postId: post.id,
              commentId: comment.id,
            },
          }).then(() => {
            SEND_SUBSCRIPTION({
              title: post.title,
              type: 'like_comment',
              post: post.id,
              personal_notification: comment.commenter.id,
              notified_by: user?.currentPerson.id,
            });
          })}
          style={{
            padding: '0px 4px',
            minWidth: 1,
            marginLeft: 16,
          }}
        >
          <Typography style={{ fontSize: 12 }} variant="caption">
            Like
          </Typography>
        </Button>
      ) : (
        <Button
          onClick={() => disLikeComment({
            variables: {
              postId: post.id,
              commentId: comment.id,
            },
          })}
          style={{
            padding: '0px 4px',
            minWidth: 1,
            marginLeft: 16,
          }}
        >
          <Typography
            style={{ fontSize: 12, color: '#037ef3' }}
            variant="caption"
          >
            Liked
          </Typography>
        </Button>
      )}

      <Button
        onClick={() => setReplyModel(true)}
        style={{
          padding: '0px 4px',
          minWidth: 1,
          marginLeft: 16,
        }}
      >
        <Typography style={{ fontSize: 12 }} variant="caption">
          Reply
        </Typography>
      </Button>
      <ReplyModel
        post={post}
        comment={comment}
        openReplyModel={openReplyModel}
        setReplyModel={setReplyModel}
      />
    </Box>
  );
};

export default CommentOptionsButtons;
