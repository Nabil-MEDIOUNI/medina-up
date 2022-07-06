import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from 'react-apollo';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ALL_MANAGERS, ALL_TEAMS_RESPONSIBLE } from '../../../apollo/queries/eps/ogx-eps';
import { SET_MULTIPLE_MANAGERS } from '../../../apollo/mutations/ep';
import UserInfoContext from '../../UserInfo/UserInfoContext';

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

const AssigneeModel = ({
  open, onClose, product, ids, setObjects, refetchObjects,
}) => {
  const classes = useStyles({});
  const { data: user } = useContext(UserInfoContext);
  const isAdmin = user?.currentPerson.is_admin;
  const isEB = user?.currentPerson.is_eb;
  const isMember = user?.currentPerson.is_member;

  const [openAutocompleteManager, setOpenManager] = useState(false);
  const [openAutocompleteResponsible, setOpenResponsible] = useState(false);
  const [manager, setManagerID] = useState('');
  const [teamResponsible, setTeamResponsibleID] = useState('');
  const [setMultipleManagers] = useMutation(SET_MULTIPLE_MANAGERS);

  const { data: allManagers } = useQuery(ALL_MANAGERS, {
    variables: {
      product,
    },
  });

  const { data: allTeamResponsible } = useQuery(ALL_TEAMS_RESPONSIBLE, {
    variables: {
      product,
    },
  });

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      fullWidth
      scroll="paper"
    >
      <DialogTitle className={classes.title}>Set EPS Manager</DialogTitle>
      <DialogContent className={classes.content}>
        {(isAdmin || isEB) && (
        <Autocomplete
          open={openAutocompleteResponsible}
          fullWidth
          onOpen={() => setOpenResponsible(true)}
          onClose={() => setOpenResponsible(false)}
          getOptionSelected={(option, value) => option.full_name === value.full_name}
          onChange={(_, value) => setTeamResponsibleID(value?.id)}
          getOptionLabel={(option) => option.full_name}
          options={allTeamResponsible?.allTeamResponsible}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Team Responsible"
              variant="outlined"
              fullWidth
            />
          )}
        />
        )}
        <br />
        {!isMember && (
        <Autocomplete
          open={openAutocompleteManager}
          fullWidth
          onOpen={() => setOpenManager(true)}
          onClose={() => setOpenManager(false)}
          getOptionSelected={(option, value) => option.full_name === value.full_name}
          onChange={(_, value) => setManagerID(value?.id)}
          getOptionLabel={(option) => option.full_name}
          options={allManagers?.allManagers}
          renderInput={(params) => (
            <TextField
              {...params}
              label="EP Manager"
              variant="outlined"
              fullWidth
            />
          )}
        />
        )}
      </DialogContent>
      <DialogActions style={{ paddingRight: 16 }}>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => setMultipleManagers({
            variables: {
              ids,
              manager,
              teamResponsible,
            },
          }).then(() => {
            if (refetchObjects) {
              refetchObjects().then(({ data }) => {
                setObjects(data.data.allEPs);
                onClose();
              });
            } else {
              onClose();
            }
          })}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AssigneeModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssigneeModel;
