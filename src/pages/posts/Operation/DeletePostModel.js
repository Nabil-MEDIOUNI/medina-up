import React, { useState } from 'react';
import {
  Typography,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import MuiDialog from '@material-ui/core/Dialog';
import { useMutation } from 'react-apollo';
import { ALL_POSTS } from '../../../apollo/queries/posts';
import { DELETE_POST } from '../../../apollo/mutations/post';

import Alert from '../../../utils/alert';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(-1),
    marginBottom: theme.spacing(1),
  },
}));

const DeletePostModel = ({
  deleteModel, setDeleteModel, setPostModel, post,
}) => {
  const classes = useStyles();
  const [deletePost, { error }] = useMutation(DELETE_POST, {
    refetchQueries: [{
      query: ALL_POSTS,
      variables: {
        page: 1,
        per_page: 5,
      },
    }],
  });
  const [openAlert, setAlert] = useState(false);

  return (
    <>
      <MuiDialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={deleteModel}
        onClose={() => setDeleteModel(false)}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>Choose an Option</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography style={{ fontWeight: 300 }}>
              Are you sure you want to delete this post?
            </Typography>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button onClick={() => setDeleteModel(false)} color="default">
              Cancel
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                deletePost({
                  variables: {
                    id: post.id,
                  },
                }).then(() => {
                  setDeleteModel(false);
                  setPostModel(false);
                  setAlert(true);
                })
                  .catch(() => {
                    setDeleteModel(false);
                    setPostModel(false);
                    setAlert(true);
                  });
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </MuiDialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Post is deleted successfully!',
      )}
    </>
  );
};

export default DeletePostModel;
