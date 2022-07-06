import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditProfile from '../Operations/EditProfile';
import BackButton from '../../../components/_common/BackButton';

const useStyles = makeStyles((theme) => ({
  moreIcon: {
    color: 'white',
    fontSize: 24,
  },
  header: {
    padding: theme.spacing(2.5, 2.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title_box: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%,-10%)',
    color: 'white',
  },
}));

const Header = ({ showMoreIcon, title }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box className={classes.header}>
      <Box>
        <BackButton fontsize="24px" color="white" />
      </Box>
      <Box className={classes.title_box}>
        <Typography variant="body1" style={{ color: 'white', fontSize: 14 }}>
          {title}
        </Typography>
      </Box>
      {showMoreIcon && (
        <Box>
          <IconButton onClick={handleClick}>
            <MoreVertIcon className={classes.moreIcon} />
          </IconButton>
          <Menu
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => setShowAddModal(true)}>
              <Typography variant="body2">Edit My Profile</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      <EditProfile
        title="Update Profile"
        onClose={() => setShowAddModal(false)}
        open={showAddModal}
        close={setAnchorEl}
      />
    </Box>
  );
};

Header.propTypes = {
  showMoreIcon: PropTypes.bool,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  showMoreIcon: false,
};

export default Header;
