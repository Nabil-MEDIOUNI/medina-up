import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { PostAdd, GroupAdd } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import UserInfoContext from '../UserInfo/UserInfoContext';

const styles = (theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: 74,
    right: theme.spacing(2),
  },
});

const AddActions = ({
  classes, addUser, addPost,
}) => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useContext(UserInfoContext);

  if (loading) return '';

  const isAdmin = data?.currentPerson.is_admin;

  const actions = [
    { icon: <GroupAdd onClick={addUser} />, showIcon: isAdmin, key: 1 },
    // { icon: <PersonAdd onClick={addEP} />, showIcon: true, key: 2 },
    { icon: <PostAdd onClick={addPost} />, showIcon: true, key: 2 },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      title=""
      open={open}
      direction="up"
    >
      {actions.map(
        (action) => (action.showIcon) && (
          <SpeedDialAction key={action.key} title="" icon={action.icon} />
        ),
      )}
    </SpeedDial>
  );
};

AddActions.propTypes = {
  addUser: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddActions);
