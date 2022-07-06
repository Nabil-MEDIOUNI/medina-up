import React, { useContext } from 'react';

import { Typography, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../../../components/_common/Avatar';
import useStyles from '../styles';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';

const ProfileCard = () => {
  const classes = useStyles();
  const location = useHistory();
  const { data } = useContext(UserInfoContext);

  return (
    <Box className={classes.boxloul}>
      <Box display="flex" alignItems="center">
        <Box className={classes.avatar}>
          <UserAvatar size="49px" userAvatar />
        </Box>
        <Box ml="10px">
          <Typography variant="body2" className={classes.name}>
            {data?.currentPerson.full_name}
          </Typography>
          <Typography variant="caption" className={classes.position}>
            {data?.currentPerson.current_positions.position_name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Button onClick={() => location.push('/settings/profile')}>
          <Typography variant="overline" className={classes.profile}>
            View Profile
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default ProfileCard;
