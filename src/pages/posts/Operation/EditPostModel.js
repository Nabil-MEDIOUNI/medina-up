/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import SwipeableDrawer from '@material-ui/core/Drawer';
import { Box } from '@material-ui/core';
import { useMutation, useQuery } from 'react-apollo';
import useStyles from '../../../components/AddActions/CreatePost/styles';
import Header from '../../../components/AddActions/CreatePost/Header';
import PostTextArea from '../../../components/AddActions/CreatePost/TextArea';
import PostOptions from '../../../components/AddActions/CreatePost/Options';
import Alert from '../../../utils/alert';
import { EDIT_POST } from '../../../apollo/mutations/post';
import { GET_POST } from '../../../apollo/queries/posts';

const EditModel = ({
  openPostModel, setPostModel, setModel, postData,
}) => {
  const classes = useStyles();
  const [openAlert, setAlert] = useState(false);
  const { data } = useQuery(GET_POST, {
    variables: {
      id: postData.id,
    },
  });

  const [editPost, { error }] = useMutation(EDIT_POST, {
    refetchQueries: [{
      query: GET_POST,
      variables: {
        id: postData.id,
      },
    }],
  });

  const [attachements, setAttachements] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posted_to, setPosted_to] = useState('');
  const [post, setpost] = useState('');
  useEffect(() => {
    if (data) {
      setAttachements(data.getPost.post_components[0].component_attachment);
      setImage(data.getPost.post_components[0].component_attachment.file);
      setTitle(data.getPost.title);
      setDescription(data.getPost.description);
      setPosted_to(data.getPost.posted_to.can_view);
    }
  }, [data]);

  const checkFileType = (file, i) => file.type.split('/')[i];

  const onDrop = React.useCallback(
    ([file]) => {
      setAttachements(file);
      if (checkFileType(file, 1) === 'pdf') { setImage('https://cdn-expa.aiesec.org/icons/pdf.svg'); }
      if (file.name.split('.')[1] === 'docx') { setImage('https://cdn-expa.aiesec.org/icons/document.svg'); }
      if (checkFileType(file, 0) === 'image') { setImage(URL.createObjectURL(file)); }
      if (checkFileType(file, 0) === 'video') { setVideo(URL.createObjectURL(file)); }
    },
    [setAttachements],
  );

  const submitPost = (e) => {
    e.preventDefault();
    editPost({
      variables: {
        id: postData.id,
        post: {
          posted_to: {
            can_view: posted_to,
          },
          title,
          description,
          filename: attachements.name && attachements.name.split('.')[0],
          size: attachements.size,
          type: attachements.type,
        },
        attachements,
      },
    })
      .then(() => {
        setAlert(true);
        setPostModel(false);
        setModel(false);
      })
      .catch(() => {
        setAlert(true);
        setpost(false);
        setModel(false);
      });
  };

  return (
    <>
      <SwipeableDrawer
        className={classes.root}
        anchor="bottom"
        open={openPostModel}
        onClose={() => setPostModel(false)}
      >
        <Header
          showalWays
          setPostModel={setPostModel}
          submitPost={submitPost}
          title={title}
          description={description}
          attachements={attachements}
          setAttachements={setAttachements}
          setImage={setImage}
          setVideo={setVideo}
          post={post}
          setpost={setpost}
          setTitle={setTitle}
          setDescription={setDescription}
        />
        <Box className={classes.filterContent} my={3}>
          <PostTextArea
            setTitle={setTitle}
            setDescription={setDescription}
            posted_to={posted_to}
            setPosted_to={setPosted_to}
            image={image}
            video={video}
            file={attachements}
            title={title}
            description={description}
          />
          <PostOptions onDrop={onDrop} />
        </Box>
      </SwipeableDrawer>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Post is deleted successfully!',
      )}
    </>
  );
};

export default EditModel;
