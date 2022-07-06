import React, { useContext } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserAvatar from '../../../_common/Avatar';
import CommentModel from './CommentModel';
import UserInfoContext from '../../../UserInfo/UserInfoContext';

const CommentInfo = ({ showIcon, comment, post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data } = useContext(UserInfoContext);

  const isCommenter = ({ commenter }) => commenter.full_name === data?.currentPerson.full_name;

  return (
    <Box display="flex" mb={3} m={2}>
      <UserAvatar
        border="1px solid #e0e0e0"
        src={comment.commenter.cover_photo.url}
      />
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="whitesmoke"
        marginLeft={2}
        padding="10px 12px"
        width="100%"
        borderRadius="0px 10px 10px 10px"
      >
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
          position="relative"
        >
          <Box mb={0.5}>
            <Typography style={{ fontWeight: 600, lineHeight: 'inherit' }} variant="body1">
              {comment.commenter.full_name}
            </Typography>
            <Typography
              style={{
                fontWeight: 400, color: '#6d6d6d', fontSize: 10, lineHeight: 'inherit',
              }}
              variant="caption"
            >
              {comment.commenter.current_positions.function.function_short_name}
              {' '}
              {comment.commenter.current_positions.position_name}
            </Typography>
          </Box>
          <Box>
            {isCommenter(comment) && showIcon && (
              <IconButton
                onClick={() => setAnchorEl(!anchorEl)}
                style={{ padding: 0 }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <CommentModel
          post={post}
          comment={comment}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        <Typography
          style={{
            fontWeight: 400,
            marginTop: 6,
            overflowWrap: 'anywhere',
          }}
          variant="caption"
        >
          {comment.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentInfo;
