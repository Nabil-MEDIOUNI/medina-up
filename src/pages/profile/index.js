import React, { useContext } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import './index.css';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import Loading from '../../components/_common/Loading/index';
import ProfileDisplay from './Display';
import Header from './Display/Header';
import ChangeCover from './Operations/ChangeCover';
import UserAvatar from '../../components/_common/Avatar';
import { formatDateLong } from '../../utils/dateTimeService';

const useStyles = makeStyles((theme) => ({
  surname: {
    color: 'white',
    fontWeight: 500,
    paddingTop: theme.spacing(1.5),
    letterSpacing: 1,
    textTransform: 'capitalize',
    fontSize: 18,
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { data, loading } = useContext(UserInfoContext);

  if (loading) {
    return (
      <div className="big_loading">
        <Loading height="50px" />
      </div>
    );
  }

  const { gender } = data?.currentPerson;
  const { phone } = data?.currentPerson.contact_detail;
  const { email } = data?.currentPerson;
  const dob = formatDateLong(data?.currentPerson.dob);
  const Personfunction = data?.currentPerson.current_positions.function.name;
  const positionName = data?.currentPerson.current_positions.position_name;

  const inputFields = [
    {
      icon: '/static/icons/gender.svg',
      showHr: true,
      value: gender,
      key: 1,
    },
    {
      icon: '/static/icons/phone.svg',
      showHr: true,
      value: phone,
      key: 2,
    },
    {
      icon: '/static/icons/date.svg',
      showHr: true,
      value: dob,
      key: 6,
    },
    {
      icon: '/static/icons/email.svg',
      showHr: true,
      value: email,
      key: 3,
    },
    {
      icon: '/static/icons/department.svg',
      showHr: true,
      NotAdmin: Personfunction === 'none',
      value: Personfunction,
      key: 4,
    },
    {
      icon: '/static/icons/position.svg',
      value: positionName,
      key: 5,
    },
  ];

  return (
    <>
      <Box className="full_screen" />
      <Box className="card_container">
        <Header title="Edit Profile" showMoreIcon />
        <Box className="img_container">
          <ChangeCover />
          <UserAvatar border userAvatar size="8rem" />
          <Typography variant="body1" className={classes.surname}>
            {data?.currentPerson.full_name}
          </Typography>
          <Box />
        </Box>
        <Box />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="infos_container"
      >
        <ProfileDisplay inputFields={inputFields} />
      </Box>
    </>
  );
};

export default Profile;
