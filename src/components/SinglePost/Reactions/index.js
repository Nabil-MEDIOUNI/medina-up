import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import UserAvatar from '../../_common/Avatar';
import ReactionsList from './ReactionsList';
import useStyles from '../styles';

const Reactions = ({ likers }) => {
  const classes = useStyles();
  const [openReactionModel, setReactionModel] = React.useState(false);

  return (
    <>
      {likers.length !== 0 && (
      <Box m={2}>
        <Box>
          <Typography>Reactions</Typography>
        </Box>
        <Box
          width="fit-content"
          mt={1}
          display="flex"
          alignItems="center"
          whiteSpace="nowrap"
          overflow="auto"
          pb={1}
          onClick={() => likers.length < 8 && setReactionModel(true)}
        >
          {likers.slice(0, 7).map((liker) => (
            <Box display="flex" mx={1} position="relative" width="fit-content">
              <UserAvatar
                size="28px"
                border="1px solid #e0e0e0"
                src={liker.cover_photo.url}
              />
              <img
                width="12px"
                style={{ position: 'absolute', right: 0, bottom: 0 }}
                src="/static/icons/like.svg"
                alt=""
              />
            </Box>
          ))}
          {likers.length >= 8 && (
          <Box onClick={() => setReactionModel(true)} className={classes.moreReactions}>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Box>
          )}
        </Box>
        <ReactionsList
          data={likers}
          title="All Reactions"
          showLikeIcon
          open={openReactionModel}
          onClose={() => setReactionModel(false)}
        />
      </Box>
      )}
    </>
  );
};

export default Reactions;
