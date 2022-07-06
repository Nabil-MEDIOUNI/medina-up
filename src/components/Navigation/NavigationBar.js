import React, { useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button } from '@material-ui/core';
import { useQuery } from 'react-apollo';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import isCurrentPage from '../../utils/others/isCurrentPage';

import Home from '../Route/Home';
import People from '../Route/People';
import Notifications from '../Route/Notifications';
import Discover from '../Route/Discover';
import EPs from '../Route/EP';
import { GET_UNSEEN_NOTIFICATIONS } from '../../apollo/queries/notification';
import UserInfoContext from '../UserInfo/UserInfoContext';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  grow: {
    flexGrow: 4,
    textAlign: 'center',
  },
  notification_count: {
    position: 'absolute',
    background: '#f85a40',
    right: 10,
    top: 0,
    zIndex: 3,
    borderRadius: 10,
  },
  notification_count_typo: {
    fontSize: 10,
    color: 'white',
    padding: '0px 6px',
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const { data } = useQuery(GET_UNSEEN_NOTIFICATIONS);
  const { data: user } = useContext(UserInfoContext);
  const notificationsExist = data?.neverSeenNotifications.length;

  const pages = [Home, People, EPs, Notifications, Discover];
  const FunctionName = user?.currentPerson?.current_positions.function.function_short_name;
  const isAdmin = user?.currentPerson?.is_admin;
  const isLCP = user?.currentPerson?.is_lcp;
  const operationFunctions = ['OGT 1', 'OGT 2', 'OGV', 'IGT', 'IGV'];
  if (operationFunctions.includes(FunctionName) || isAdmin || isLCP) {
    pages.splice(1, 1);
  }
  if (!operationFunctions.includes(FunctionName) && !isAdmin && !isLCP) {
    pages.splice(2, 1);
  }

  return (
    <AppBar
      position="fixed"
      style={{
        top: 'auto',
        background: '#f7f7f7',
        zIndex: 6,
        bottom: 0,
        paddingTop: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar className={classes.toolbar}>
        {pages.map((page) => (
          <div className={classes.grow} key={page.title}>
            <Link to={page.link} style={{ position: 'relative' }}>
              <Button style={{
                borderRadius: 0,
                padding: '6px 0px',
                borderTop: isCurrentPage(location.pathname, page.link) ? '2px solid #191919' : '',
              }}
              >
                {notificationsExist > 0 && page.show_notif && (
                <Box className={classes.notification_count}>
                  <Typography className={classes.notification_count_typo}>
                    {notificationsExist}
                  </Typography>
                </Box>
                )}
                <div>
                  {isCurrentPage(location.pathname, page.link)
                    ? page.icon_active()
                    : page.icon()}
                  <Typography
                    style={{
                      fontSize: 10,
                      marginTop: -4,
                      opacity: isCurrentPage(location.pathname, page.link)
                        ? 0.9
                        : 0.6,
                    }}
                  >
                    {page.title}
                  </Typography>
                </div>
              </Button>
            </Link>
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
