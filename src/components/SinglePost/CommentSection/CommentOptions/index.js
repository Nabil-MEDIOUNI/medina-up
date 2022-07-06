import React from 'react';
import { Box } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import {
  LIKE_COMMENT,
  DISLIKE_COMMENT,
} from '../../../../apollo/mutations/post';
import { GET_POST } from '../../../../apollo/queries/posts';
import Alert from '../../../../utils/alert';
import AllReactions from './AllReactions';
import CommentOptionsButtons from './CommentOptionsButtons';

const CommentOptions = ({ post, comment }) => {
  const [likeComment, { error }] = useMutation(LIKE_COMMENT, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: post.id,
        },
      },
    ],
  });

  const [disLikeComment, dislikeError] = useMutation(DISLIKE_COMMENT, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: post.id,
        },
      },
    ],
  });

  return (
    <Box width="100%">
      <>
        <Box
          m="-0.75rem 28px 1.25rem 4rem"
          justifyContent="space-between"
          display="flex"
          alignItems="center"
        >
          <CommentOptionsButtons
            likeComment={likeComment}
            disLikeComment={disLikeComment}
            post={post}
            comment={comment}
          />
          <AllReactions comment={comment} />
        </Box>
      </>
      {Alert(error || dislikeError.error)}
    </Box>
  );
};

export default CommentOptions;
