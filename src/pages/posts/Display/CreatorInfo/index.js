import React, { useContext, useState } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { Apartment, Group, DoneAll } from '@material-ui/icons';
import UserAvatar from '../../../../components/_common/Avatar';
import useStyles from '../../styles';
import PostModel from '../../Operation/PostModal';
import { PostedAt } from '../../../../utils/dateTimeService';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';

const CreatorInfo = ({ post }) => {
  const classes = useStyles();
  const { data: user } = useContext(UserInfoContext);

  const creatorPosition = (creator) => creator.current_positions.position_name;
  const checkPostPermission = () => {
    if (post.posted_to.can_view === 'My Team') { return <Group style={{ opacity: 0.55 }} />; }
    if (post.posted_to.can_view === 'All Alumni') {
      return (
        <img
          style={{ opacity: 0.55, width: '1em' }}
          src="/static/icons/alumni.png"
          alt=""
        />
      );
    }
    if (post.posted_to.can_view === 'My Department' || post.posted_to.can_view === 'Only EB') {
      return <Apartment style={{ opacity: 0.55 }} />;
    }
    return (
      <img
        style={{ opacity: 0.55, width: '1em' }}
        src="/static/icons/LinkedIn-30.svg"
        alt=""
      />
    );
  };
  const [modal, setModal] = useState(false);
  const currentUserIsCreator = post.creator.id === user?.currentPerson.id;
  const isAdmin = user?.currentPerson.is_admin;

  return (
    <Box display="flex" p={2} justifyContent="space-between" alignItems="end">
      <Box onClick={() => setModal(false)} display="flex" alignItems="end">
        <UserAvatar size="45px" src={post.creator.cover_photo.url} />
        <Box ml={2}>
          <Box mb={0.65} lineHeight={1}>
            <Typography className={classes.creatorName} variant="body1">
              {post.creator.full_name}
              {(post.is_approved && isAdmin) && (
              <DoneAll style={{ opacity: 0.5, marginLeft: 8, color: '#00c16e' }} />
              )}
            </Typography>
            <Typography variant="caption" className={classes.creatorPosition}>
              {creatorPosition(post.creator)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="caption">{PostedAt(post.createdAt)}</Typography>
            <Typography
              variant="caption"
              style={{ padding: '0px 4px', opacity: 0.6 }}
            >
              •
            </Typography>
            {checkPostPermission()}
          </Box>
        </Box>
      </Box>

      {(currentUserIsCreator || isAdmin) && (
      <IconButton onClick={() => setModal(!modal)} style={{ width: '5%', padding: 0 }}>
        <img
          width="14px"
          src="/static/icons/LinkedIn-37.svg"
          alt=""
          style={{ opacity: 0.6 }}
        />
      </IconButton>
      )}
      <PostModel setPostModel={setModal} postData={post} anchorEl={modal} />
    </Box>
  );
};

export default CreatorInfo;
