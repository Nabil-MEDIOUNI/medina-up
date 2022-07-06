import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import EditEp from './Operations/EditEp';
import UserInfoContext from '../UserInfo/UserInfoContext';
import DeleteEP from './Operations/DeleteEP';
import { DELETE_EP } from '../../apollo/mutations/ep';

const useStyles = makeStyles((theme) => ({
  moreIcon: {
    color: '#525252',
    fontSize: 24,
  },
  header: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1, 0, 0.75, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const Header = ({
  id, route, title, singleEP, loading, setEP,
}) => {
  const classes = useStyles();
  const { data: user } = useContext(UserInfoContext);
  const [deleteEP, { error: deleteError }] = useMutation(DELETE_EP);
  const FunctionName = user?.currentPerson.current_positions.function.function_short_name;
  const isAlumni = user?.currentPerson.is_alumni;
  const canViewAll = ['MKT', 'F&L'];

  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setShowAddModal(false);
  };

  return (
    <Box className={classes.header}>
      <Box>
        <Link to={route}>
          <IconButton>
            <ArrowBackIcon className={classes.moreIcon} />
          </IconButton>
        </Link>
      </Box>
      <Box>
        <Typography variant="body1" style={{ color: '#525252', fontSize: 14 }}>{title}</Typography>
      </Box>
      <Box>
        {!isAlumni && !canViewAll.includes(FunctionName) && (
          <IconButton onClick={handleClick}>
            <MoreVertIcon className={classes.moreIcon} />
          </IconButton>
        )}
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
            <Typography variant="body2">Edit EP</Typography>
          </MenuItem>
          <MenuItem onClick={() => setShowDeleteModal(true)}>
            <Typography variant="body2">Delete EP</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <DeleteEP
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        singleEP={singleEP}
        deleteEP={deleteEP}
        error={deleteError}
      />
      <EditEp
        id={id}
        title="Update EP"
        onClose={handleClose}
        open={showAddModal}
        singleEP={singleEP}
        loading={loading}
        SetSingleEP={setEP}
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
