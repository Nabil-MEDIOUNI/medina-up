import React from 'react';
import { Typography, MenuItem, Box } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from 'react-apollo';
import { DELETE_COMMENT, EDIT_COMMENT } from '../../../../apollo/mutations/post';
import { GET_POST } from '../../../../apollo/queries/posts';
import Alert from '../../../../utils/alert';
import CommentBar from '../../CommentBar';

const CommentModel = ({
  anchorEl, setAnchorEl, post, comment,
}) => {
  const [openAlert, setAlert] = React.useState(false);
  const [editCommentBar, setEditComment] = React.useState(false);
  const [newComment, setComment] = React.useState('');

  React.useEffect(() => {
    setComment(comment.comment);
  }, [comment.comment]);

  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: post.id,
        },
      },
    ],
  });

  const [editComment] = useMutation(EDIT_COMMENT, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: post.id,
        },
      },
    ],
  });

  const sendComment = (e) => {
    e.preventDefault();
    editComment({
      variables: {
        postId: post.id,
        commentId: comment.id,
        newComment,
      },
    });
    setComment('');
    setEditComment(false);
    setAnchorEl(false);
  };

  return (
    <>
      {anchorEl && (
        <>
          <Box
            style={{
              position: 'absolute',
              right: '0.5rem',
              background: 'white',
              borderRadius: 4,
              boxShadow: '0px 0px 10px #e8e8e8',
              marginTop: '2rem',
              zIndex: 55,
            }}
          >
            <MenuItem onClick={() => setEditComment(true)}>
              <CreateIcon style={{ opacity: 0.6, marginRight: 8 }} />
              <Typography variant="caption">edit comment</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteComment({
                  variables: {
                    postId: post.id,
                    commentId: comment.id,
                  },
                })
                  .then(() => setAnchorEl(false))
                  .catch(() => setAlert(true));
              }}
            >
              <DeleteIcon style={{ opacity: 0.6, marginRight: 8 }} />
              <Typography variant="caption">delete comment</Typography>
            </MenuItem>
          </Box>
          <Box position="absolute" zIndex="222">
            {editCommentBar && (
            <CommentBar
              sendComment={sendComment}
              setComment={setComment}
              comment={newComment}
            />
            )}
          </Box>
        </>
      )}
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

export default CommentModel;
