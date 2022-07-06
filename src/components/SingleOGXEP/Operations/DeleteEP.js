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
import { useHistory } from 'react-router-dom';
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

const DeleteEP = ({
  open,
  onClose,
  singleEP,
  deleteEP,
  error,
}) => {
  const classes = useStyles({});
  const location = useHistory();

  const [openAlert, setAlert] = useState(false);
  const removePerson = () => {
    deleteEP({
      variables: {
        id: singleEP.id,
      },
    }).then(() => {
      location.push('/eps');
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
        <DialogTitle className={classes.title}>Delete EP</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography>
              Are you sure you want to delete
              {' '}
              <span className={classes.userName}>
                {singleEP.EPName}
              </span>
            </Typography>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button onClick={onClose} color="default">
              Cancel
            </Button>
            <Button color="secondary" onClick={() => removePerson()}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </MuiDialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'EP is deleted successfully!',
      )}
    </>
  );
};

DeleteEP.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteEP;
