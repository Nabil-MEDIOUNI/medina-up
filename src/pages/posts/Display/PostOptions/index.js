import React, { useContext, useState } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import Divider from '../../../../components/_common/Divider';
import useStyles from '../../styles';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';
import { LIKE_POST, DISLIKE_POST } from '../../../../apollo/mutations/post';
import { GET_POST } from '../../../../apollo/queries/posts';
import Alert from '../../../../utils/alert';
import ReactionsList from '../../../../components/SinglePost/Reactions/ReactionsList';
import UserAvatar from '../../../../components/_common/Avatar';

const PostOptions = ({ post }) => {
  const classes = useStyles();
  const { data } = useContext(UserInfoContext);
  const [openViewersModel, setViewersModel] = useState(false);

  const [like, setLike] = useState(false);
  const location = useHistory();

  const userName = data?.currentPerson.full_name;
  const getLikes = post.likes;

  const checkIfliked = getLikes.liked_by?.find(
    (liker) => liker.full_name === userName,
  );
  const [likePost, { error }] = useMutation(LIKE_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: post.id,
        },
      },
    ],
  });
  const [disLikePost, dislikeError] = useMutation(DISLIKE_POST, {
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
    <>
      <Box
        justifyContent="space-between"
        display="flex"
        width="92%"
        margin="0 auto"
        pt={1}
        mb={-1}
        onClick={() => location.push(`/posts/${post.id}`)}
      >
        <Box display="flex" alignItems="center">
          {getLikes.count !== 0 && (
            <>
              <img src="/static/icons/like.svg" alt="" />
              <Typography className={classes.like} variant="caption">
                {getLikes.count}
              </Typography>
            </>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          {post.comments.length !== 0 && (
          <>
            <Typography style={{ fontSize: 11 }} variant="caption">
              {post.comments.length}
              {' '}
              {post.comments.length > 1 ? 'comments' : 'comment'}
            </Typography>
            <Typography
              variant="caption"
              style={{ padding: '0px 4px', opacity: 0.6 }}
            >
              •
            </Typography>
          </>
          )}
          {post.seen_by?.length !== 0 && (
            <>
              <Typography
                onClick={() => setViewersModel(true)}
                style={{
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 10,
                }}
                variant="caption"
              >
                seen by
                {' '}
              </Typography>
              <Box display="flex" alignItems="center">
                {post.seen_by.slice(0, 3).map(({ cover_photo }) => (
                  <UserAvatar marginLeft="-6px" src={cover_photo.url} size="15px" />
                ))}
              </Box>
              {post.seen_by.length > 3 && (
              <Box pl={0.25}>
                <Typography style={{ fontSize: 10 }}>
                  +
                  {' '}
                  {post.seen_by.length - 3}
                </Typography>
              </Box>
              )}
            </>
          )}
          {post.seen_by?.length !== 0 && (
            <ReactionsList
              data={post.seen_by}
              title="All Viewers"
              open={openViewersModel}
              onClose={() => setViewersModel(false)}
            />
          )}
        </Box>
      </Box>
      <Divider width="95%" margin="16px auto" />
      <Box
        pb="0.5rem"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          {checkIfliked ? (
            <IconButton
              onClick={() => {
                setLike(true);
                disLikePost({
                  variables: {
                    id: post.id,
                  },
                }).then(() => setLike(false));
              }}
              style={{ width: '12%', padding: 0 }}
            >
              <img width="20px" src="/static/icons/liked.svg" alt="" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setLike(true);
                const audio = document.getElementById('audio');
                audio.volume = 0.2;
                likePost({
                  variables: {
                    id: post.id,
                  },
                }).then(() => {
                  setLike(false);
                  audio.play();
                });
              }}
              disabled={like}
              style={{ padding: 0 }}
            >
              <img width="20px" src="/static/icons/like_thumb.svg" alt="" />
            </IconButton>
          )}
          <audio id="audio" src="/static/mp3/like.mp3" />
          <Typography style={{ fontSize: 11, marginTop: 4 }} variant="caption">
            Like
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => location.push(`/posts/${post.id}`)}
        >
          <IconButton style={{ padding: 0 }}>
            <img width="20px" src="/static/icons/comment_dialog.svg" alt="" />
          </IconButton>
          <Typography style={{ fontSize: 11, marginTop: 4 }} variant="caption">
            Comment
          </Typography>
        </Box>
      </Box>
      {Alert(error || dislikeError.error)}
    </>
  );
};

export default PostOptions;
