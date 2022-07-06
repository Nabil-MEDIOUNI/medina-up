/* eslint-disable camelcase */
import React, { useContext, useState } from 'react';

import SwipeableDrawer from '@material-ui/core/Drawer';
import { Box } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import useStyles from './styles';
import PostOptions from './Options';
import Header from './Header';
import PostTextArea from './TextArea';
import { CREATE_POST } from '../../../apollo/mutations/post';
import Alert from '../../../utils/alert';
import { ALL_POSTS } from '../../../apollo/queries/posts';
import UserInfoContext from '../../UserInfo/UserInfoContext';
import { ALL_NOTIFICATIONS, GET_UNSEEN_NOTIFICATIONS } from '../../../apollo/queries/notification';
import SendNotification from './SendNotification';

const CreatePost = ({ openPostModel, setPostModel, headerTitle }) => {
  const classes = useStyles();

  const { data: user } = useContext(UserInfoContext);
  const FunctionName = user?.currentPerson.current_positions.function.function_short_name;
  const isTL = user?.currentPerson.is_tl;
  const isMember = user?.currentPerson.is_member;
  const isEB = user?.currentPerson.is_eb;

  const [openAlert, setAlert] = useState(false);
  const [attachements, setAttachements] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posted_to, setPosted_to] = useState('Local Committee');
  const [post, setpost] = useState('');
  const onEmojiClick = (e, emojiObject) => {
    setDescription(description + emojiObject.emoji);
  };

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
  const [createPost, { error }] = useMutation(CREATE_POST, {
    refetchQueries: [
      { query: ALL_POSTS },
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  const clear = () => {
    setAttachements('');
    setImage('');
    setVideo('');
    setTitle('');
    setDescription('');
    setpost('');
  };

  const submitPost = (e) => {
    e.preventDefault();
    setpost(true);
    createPost({
      variables: {
        post: {
          posted_to: {
            can_view: posted_to,
          },
          title,
          description,
          filename: attachements.name?.split('.')[0],
          size: attachements.size,
          type: attachements.type,
        },
        attachements,
      },
    })
      .then(({ data: { createPost: { id } } }) => {
        if ((isTL && posted_to === 'My Team') || isEB) {
          SendNotification(id, user?.currentPerson, posted_to, title, description, FunctionName);
        }
        setAlert(true);
        setPostModel(false);
        clear();
      })
      .catch(() => {
        setAlert(true);
        setpost(false);
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
          headerTitle={headerTitle}
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
          <PostOptions onEmojiClick={onEmojiClick} onDrop={onDrop} />
        </Box>
      </SwipeableDrawer>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        (isTL || isMember) && posted_to === 'Local Committee'
          ? 'Wait for admin to approve it!' : 'Post is created successfully!',
      )}
    </>
  );
};

export default CreatePost;
