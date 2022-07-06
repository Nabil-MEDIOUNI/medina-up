import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
} from '@material-ui/core';
import Alert from '../../../utils/alert';

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

const DeleteEPS = ({
  open,
  onClose,
  ids,
  deleteMultiple,
  setSelectedObjects,
  setObjects,
  refetchObjects,
  error,
}) => {
  const classes = useStyles({});

  const [openAlert, setAlert] = useState(false);
  const removeEPS = () => {
    deleteMultiple({
      variables: {
        ids,
      },
    }).then(() => {
      if (refetchObjects) {
        refetchObjects().then(({ data }) => {
          setAlert(true);
          setObjects(data.data.allEPs);
          setSelectedObjects([]);
          onClose();
        });
      } else {
        setAlert(true);
        setSelectedObjects([]);
        onClose();
      }
    }).catch(() => {
      setAlert(true);
      onClose();
    });
  };

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
        <DialogTitle className={classes.title}>Delete</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography>
              Are you sure you want to delete them?
            </Typography>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button onClick={onClose} color="default">
              Cancel
            </Button>
            <Button color="secondary" onClick={() => removeEPS()}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </MuiDialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Deleted successfully!',
      )}
    </>
  );
};

DeleteEPS.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteEPS;
