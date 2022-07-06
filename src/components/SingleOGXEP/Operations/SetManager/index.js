import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';

import Autocomplete from '@material-ui/lab/Autocomplete';
import UserInfoContext from '../../../UserInfo/UserInfoContext';

import { SEND_NOTIFICATION } from '../../../../apollo/mutations/notification';
import { ALL_NOTIFICATIONS, GET_UNSEEN_NOTIFICATIONS } from '../../../../apollo/queries/notification';

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
}));

const SetManager = ({
  data,
  currentEP,
  getSingleEP,
  setSingleEP,
  title,
  label,
  open,
  onClose,
  openautocomplete,
  setOpen,
  setManager,
  notificationFunction,
}) => {
  const classes = useStyles({});
  const { data: user } = useContext(UserInfoContext);
  const [personID, setPersonID] = useState(false);
  const [sendNotification] = useMutation(SEND_NOTIFICATION, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  const updateManager = (e) => {
    e.preventDefault();
    setManager({
      variables: {
        id: currentEP.id,
        personID,
      },
    }).then(() => {
      getSingleEP(currentEP.id).then((res) => {
        setSingleEP(res.data.data.getSingleEP);
        onClose();
        notificationFunction(
          sendNotification,
          currentEP,
          user,
          personID,
        );
      });
    });
  };

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      fullWidth
      scroll="paper"
    >
      <DialogTitle className={classes.title}>{`Set ${title}`}</DialogTitle>
      <DialogContent className={classes.content}>
        <Autocomplete
          open={openautocomplete}
          fullWidth
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionSelected={(option, value) => option.full_name === value.full_name}
          onChange={(_, value) => setPersonID(value?.id)}
          getOptionLabel={(option) => option.full_name}
          options={data}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" fullWidth />
          )}
        />
      </DialogContent>
      <DialogActions style={{ paddingRight: 16 }}>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={updateManager} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SetManager.propTypes = {
  loading: PropTypes.bool.isRequired,
  singleEP: PropTypes.object.isRequired,
};

export default SetManager;
