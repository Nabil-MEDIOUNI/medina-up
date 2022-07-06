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
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Alert from '../../../utils/alert';
import Loading from '../../../components/_common/Loading';
import { VOTE } from '../../../apollo/mutations/vote';
import { getRoomquery } from '../../../apollo/queries/votes';
import { getTokenWithExpiry } from '../../../apollo/helpers/HandleToken';

const token = getTokenWithExpiry();

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

const ConfirmVote = ({
  open,
  onClose,
  loading,
  candidate,
  id,
  name,
  setRoom,
}) => {
  const classes = useStyles();
  const location = useHistory();
  const [vote, { error }] = useMutation(VOTE);
  const [openAlert, setAlert] = useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    localStorage.removeItem('voted');
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const votePerson = () => {
    vote({
      variables: {
        id,
        name,
        candidate: candidate.full_name,
        vote: value,
      },
    })
      .then(() => {
        onClose();
        setValue('');
        getRoomquery(id, name).then(({ data: { data: getRoom } }) => setRoom(getRoom));
        Axios.post(
          process.env.REACT_APP_API_URL,
          {
            query: `
          query getSingleVoter($id: String, $name: String) {
          getSingleVoter(id: $id, name: $name) {
            voter {
              id
            }
            voted
          }
          }
          `,
            variables: {
              id,
              name,
            },
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        ).then(({ data: { data } }) => {
          if (data.getSingleVoter?.voted) {
            localStorage.setItem('voted', true);
            location.push(`/vote-success/${id}/${name}`);
          }
        });
      })
      .catch(() => {
        setAlert(true);
      });
  };

  const closeModel = () => {
    onClose();
    setValue('');
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
        <DialogTitle className={classes.title}>Choose an Option</DialogTitle>
        <DialogContent className={classes.content}>
          {value && (
            <Box>
              <Typography style={{ fontWeight: 300 }}>
                Are you sure you want to vote
                {' '}
                <span className={classes.userName}>{value}</span>
                {' '}
                {candidate.full_name}
              </Typography>
            </Box>
          )}
          <RadioGroup
            style={{ marginTop: value && 16 }}
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="pour" control={<Radio />} label="Pour" />
            <FormControlLabel
              value="contre"
              control={<Radio />}
              label="Contre"
            />
          </RadioGroup>
        </DialogContent>
        <Box pr={2}>
          {value && (
            <DialogActions>
              <Button
                onClick={() => {
                  setValue('');
                  closeModel();
                }}
                color="default"
              >
                Cancel
              </Button>
              <Button color="secondary" onClick={() => votePerson()}>
                Confirm
              </Button>
            </DialogActions>
          )}
        </Box>
      </MuiDialog>
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

ConfirmVote.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmVote;
