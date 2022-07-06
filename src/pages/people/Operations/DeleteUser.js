import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from 'react-apollo';
import {
  Typography,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
} from '@material-ui/core';
import Alert from '../../../utils/alert';
import { GET_USER } from '../../../apollo/queries/people';
import Loading from '../../../components/_common/Loading';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(1),
  },
  margin: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  userName: {
    fontWeight: 500,
    textTransform: 'capitalize',
    color: '#037ef3',
  },
}));

const DeleteUser = ({
  open,
  onClose,
  close,
  id,
  deletePerson,
  deleteError,
}) => {
  const classes = useStyles({});

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const [openAlert, setAlert] = useState(false);
  const removePerson = () => {
    deletePerson();
    onClose();
    close(false);
  };

  const closeModel = () => {
    close(false);
    onClose();
  };

  if (loading) {
    return (
      <div className="big_loading">
        <Loading height="35px" />
      </div>
    );
  }

  return (
    <>
      <MuiDialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>Delete User</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography>
              Are you sure you want to delete
              {' '}
              <span className={classes.userName}>
                {data.getPerson.full_name}
              </span>
            </Typography>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button onClick={() => closeModel()} color="default">
              Cancel
            </Button>
            <Button color="secondary" onClick={() => removePerson()}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </MuiDialog>
      {Alert(
        deleteError,
        openAlert,
        () => setAlert(false),
        'User deleted successfully!',
      )}
    </>
  );
};

DeleteUser.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

DeleteUser.defaultProps = {
  title: '',
};

export default DeleteUser;
