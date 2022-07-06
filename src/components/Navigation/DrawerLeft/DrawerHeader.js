import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from '../styles';

import UserInfoContext from '../../UserInfo/UserInfoContext';
import UserAvatar from '../../_common/Avatar';

const DrawerHeader = () => {
  const classes = useStyles();
  const location = useHistory();

  const { data, loading } = useContext(UserInfoContext);

  if (loading) return '';

  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const getPosition = () => {
    if (data?.currentPerson.is_alumni) return 'Alumni';
    if (data?.currentPerson.is_lcp) return 'Local Committee President';
    if (data?.currentPerson.is_eb) return `${FunctionName.replace('_', ' ')} Vice President`;
    if (data?.currentPerson.is_tl) return `${FunctionName.replace('_', ' ')} Team Leader`;
    if (data?.currentPerson.is_manager) return `${FunctionName.replace('_', ' ')} Manager`;
    if (data?.currentPerson.is_member) return `${FunctionName.replace('_', ' ')} Team Member`;
  };

  return (
    <div className={classes.drawerHeader}>
      <Box
        display="flex"
        width="95%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h6" style={{ textTransform: 'capitalize', fontSize: 18 }}>
            {data?.currentPerson.full_name}
          </Typography>
          <Typography style={{ fontSize: 10 }}>
            (
            {getPosition()}
            )
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <Link to="/settings">
            <IconButton style={{ marginRight: '1rem' }}>
              <SettingsIcon
                style={{
                  color: 'rgb(88 88 88)',
                  fontSize: 24,
                }}
              />
            </IconButton>
          </Link>
          <Box onClick={() => location.push('/settings/profile')}>
            <UserAvatar userAvatar size="38px" />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default DrawerHeader;
