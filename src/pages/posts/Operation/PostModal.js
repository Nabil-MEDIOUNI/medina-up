import React, { useState, useContext } from 'react';
import { Typography, MenuItem, Box } from '@material-ui/core';
import { Create, Delete, ThumbUpAlt } from '@material-ui/icons';
import { useMutation } from 'react-apollo';

import DeletePostModel from './DeletePostModel';
import EditModel from './EditPostModel';

import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import SendNotification from '../../../components/AddActions/CreatePost/SendNotification';

import Alert from '../../../utils/alert';

import { APPROVE_POST } from '../../../apollo/mutations/post';
import { GET_POST } from '../../../apollo/queries/posts';
import { ALL_NOTIFICATIONS, GET_UNSEEN_NOTIFICATIONS } from '../../../apollo/queries/notification';

const PostModel = ({ anchorEl, setPostModel, postData }) => {
  const { data: user } = useContext(UserInfoContext);
  const FunctionName = user?.currentPerson.current_positions.function.function_short_name;

  const [deleteModel, setDeleteModel] = useState(false);
  const [openPostModel, setEditModel] = useState(false);
  const isAdmin = user?.currentPerson.is_admin;
  const [openAlert, setAlert] = useState(false);

  const [approvePost, { error }] = useMutation(APPROVE_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: postData.id,
        },
      },
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  return (
    <>
      {anchorEl && (
        <>
          <Box
            style={{
              position: 'absolute',
              right: '1rem',
              background: 'white',
              borderRadius: 4,
              boxShadow: '0px 0px 10px #e8e8e8',
              marginTop: '1rem',
              zIndex: 55,
            }}
          >
            <MenuItem onClick={() => setEditModel(true)}>
              <Create style={{ opacity: 0.6, marginRight: 8 }} />
              <Typography variant="caption">edit post</Typography>
            </MenuItem>
            <MenuItem onClick={() => setDeleteModel(true)}>
              <Delete style={{ opacity: 0.5, marginRight: 8 }} />
              <Typography variant="caption">delete post</Typography>
            </MenuItem>
            {isAdmin && !postData.is_approved && (
              <MenuItem
                onClick={() => {
                  approvePost({ variables: { id: postData.id } })
                    .then(() => {
                      setAlert(true);
                      setPostModel(false);
                      SendNotification(
                        postData.id,
                        postData.creator,
                        postData.posted_to.can_view,
                        postData.title,
                        postData.description,
                        FunctionName,
                      );
                    })
                    .catch(() => {
                      setAlert(true);
                    });
                }}
              >
                <ThumbUpAlt style={{ opacity: 0.5, marginRight: 8 }} />
                <Typography variant="caption">Approve post</Typography>
              </MenuItem>
            )}
          </Box>
          <DeletePostModel
            post={postData}
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            setPostModel={setPostModel}
          />
          <EditModel
            openPostModel={openPostModel}
            setPostModel={setEditModel}
            postData={postData}
            setModel={setPostModel}
          />
        </>
      )}
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Post is approved successfully!',
      )}
    </>
  );
};

export default PostModel;
