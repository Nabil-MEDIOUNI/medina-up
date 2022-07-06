import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';
import {
  Typography,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
} from '@material-ui/core';
import Alert from '../../../utils/alert';
import Loading from '../../../components/_common/Loading';
import { DISMISS_VOTER } from '../../../apollo/mutations/vote';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(-1),
    marginBottom: theme.spacing(1),
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

const DismissVoter = ({
  open, loading, id, name, voter,
}) => {
  const classes = useStyles({});
  const [dismissVoter, { error }] = useMutation(DISMISS_VOTER);

  const [openAlert, setAlert] = useState(false);

  const handleVoter = () => {
    dismissVoter({
      variables: {
        id,
        name,
        voterId: voter.voter.id,
      },
    })
      .then(() => {})
      .catch(() => {
        setAlert(true);
      });
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
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>Dismiss a voter</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography style={{ fontWeight: 300 }}>
              Are you sure you want to dismiss
              {' '}
              <span className={classes.userName}>
                {voter.voter?.full_name}
                ?
              </span>
            </Typography>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button color="default">Cancel</Button>
            <Button color="secondary" onClick={() => handleVoter()}>
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </MuiDialog>
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

DismissVoter.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default DismissVoter;
