import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar } from '@material-ui/core';
import UserInfoContext from '../../UserInfo/UserInfoContext';
import getUserImage from '../../../utils/getUserImage';

const useStyles = makeStyles((theme) => ({
  Avatar: {
    marginTop: ({ margin }) => margin && theme.spacing(1.5),
    width: ({ size }) => size,
    height: ({ size }) => size,
    borderRadius: ({ borderRadius }) => borderRadius || '50%',
    display: 'flex',
    textAlign: 'center',
    marginLeft: ({ marginLeft }) => marginLeft || theme.spacing(-1),
    backgroundColor: 'white',
    border: ({ border }) => border || (border && '1.25px solid #30c39e'),
  },
  Img: {
    color: 'transparent',
    width: '105%',
    height: '102%',
    objectFit: 'cover',
    textAlign: 'center',
    textIndent: '10000px',
  },
}));

const UserAvatar = ({
  size, userAvatar, margin, epName, border, src, borderRadius, marginLeft,
}) => {
  const classes = useStyles({
    size, margin, border, borderRadius, marginLeft,
  });
  const { data, loading } = useContext(UserInfoContext);

  if (loading) return '';

  const photo = userAvatar ? data?.currentPerson.cover_photo.url
    : (getUserImage(epName || (data?.currentPerson.first_name)));

  return (
    <Avatar className={classes.Avatar}>
      <img
        alt=""
        className={classes.Img}
        src={src || photo}
      />
    </Avatar>
  );
};

UserAvatar.propTypes = {
  size: PropTypes.string,
  avatar: PropTypes.string,
  epName: PropTypes.string,
  margin: PropTypes.bool,
};

UserAvatar.defaultProps = {
  size: '27px',
  avatar: '',
  epName: '',
  margin: false,
};

export default UserAvatar;
