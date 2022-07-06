import React, { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LockIcon from '@material-ui/icons/Lock';

import { Link } from 'react-router-dom';
import useStyles from './styles';
import Header from '../profile/Display/Header';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import Loading from '../../components/_common/Loading';
import UserAvatar from '../../components/_common/Avatar';

const Settings = () => {
  const classes = useStyles();
  const { data, loading } = useContext(UserInfoContext);
  const isLCP = data?.currentPerson.is_alumni;
  const IsAlumni = data?.currentPerson.is_alumni;

  if (loading) {
    return (
      <div className="big_loading">
        <Loading height="45px" />
      </div>
    );
  }

  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;

  const checkUser = () => {
    if (data?.currentPerson.is_admin) return 'All People';
    return 'My People';
  };

  const firstRow = [
    {
      label: 'Edit Profile',
      icon: () => <PersonIcon className={classes.icon} />,
      to: '/settings/profile',
    },
    {
      label: 'Notifications',
      icon: () => <NotificationsIcon className={classes.icon} />,
      to: '/notifications',
    },
  ];

  const sndRow = [
    {
      label: checkUser(),
      icon: () => <PeopleAltIcon className={classes.icon} />,
      to: '/people',
    },
    {
      label: 'Agenda',
      icon: () => <DateRangeIcon className={classes.icon} />,
      to: '/posts',
    },
    {
      label: 'Password',
      icon: () => <LockIcon className={classes.icon} />,
      to: '/settings/change-password',
    },
  ];

  return (
    <>
      <Box className="full_screen" />

      <Box className="card_container">
        <Header title="Settings" route="/" />
        <Box className="img_container">
          <UserAvatar border userAvatar size="8rem" />
          <Typography variant="body1" className={classes.surname}>
            {data?.currentPerson.full_name}
          </Typography>
          <Typography variant="body1" className={classes.position}>
            {(!isLCP && !IsAlumni) && <span>{FunctionName?.replace('_', ' ')}</span>}
            {' '}
            {data?.currentPerson.current_positions.position_name}
          </Typography>
          <Box />
        </Box>
        <Box />
      </Box>

      <Box className={classes.secondContainer}>
        <Box className={classes.Row}>
          <List
            className={classes.nav}
            component="nav"
            aria-label="main mailbox folders"
          >
            {firstRow.map((page) => (
              <Link
                key={page.label}
                style={{ textDecoration: 'none' }}
                to={page.to}
              >
                <ListItem button>
                  <ListItemIcon>{page.icon()}</ListItemIcon>
                  <ListItemText primary={page.label} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <ArrowForwardIosIcon className={classes.arrowIcon} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>

        <Box className={classes.Row}>
          <List
            className={classes.nav}
            component="nav"
            aria-label="main mailbox folders"
          >
            {sndRow.map((page) => (
              <Link
                key={page.label}
                style={{ textDecoration: 'none' }}
                to={page.to}
              >
                <ListItem button>
                  <ListItemIcon>{page.icon()}</ListItemIcon>
                  <ListItemText primary={page.label} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <ArrowForwardIosIcon className={classes.arrowIcon} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
