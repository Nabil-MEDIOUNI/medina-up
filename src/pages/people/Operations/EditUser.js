import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { useQuery } from 'react-apollo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '../../../components/_common/Divider';
import EditField from '../../../components/_common/EditFields/EditField';
import Selecter from '../../../components/_common/EditFields/Selecter';
import { handleMany } from '../../../utils/handle';
import Alert from '../../../utils/alert';
import { GET_USER, ALL_TEAM_LEADERS } from '../../../apollo/queries/people';

import { userRoles, userFunctionTitles } from '../../../constants/users';
import validateForm from '../../../utils/validateForm';

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

const EditUser = ({
  open,
  onClose,
  title,
  id,
  updatePerson,
  updateError,
  close,
}) => {
  const classes = useStyles({});

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const { data: allTeamLeaders } = useQuery(ALL_TEAM_LEADERS);

  const [openAlert, setAlert] = useState(false);
  const [validationError, setError] = useState({ message: undefined });

  const [email, setEmail] = useState('');
  const [can_vote, setCan_vote] = useState(false);
  const [is_admin, setIs_admin] = useState(false);
  const [is_verified, setIs_verified] = useState(false);
  const [position, setPosition] = useState('');
  const [personFunction, setFunction] = useState('');
  const [responsible, setResponsible] = useState('');
  const [person, addPerson] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (data) {
      setEmail(data.getPerson.email);
      setPosition(data.getPerson.current_positions.position_name);
      setFunction(data.getPerson.current_positions.function.name);
      setResponsible(data.getPerson.manager?.id);
      setCan_vote(data.getPerson.can_vote);
      setIs_admin(data.getPerson.is_admin);
      setIs_verified(data.getPerson.is_verified);
      addPerson({
        first_name: data.getPerson.first_name,
        last_name: data.getPerson.last_name,
      });
    }
  }, [data]);

  const voteBoolean = [
    { name: 'Can vote', value: true },
    { name: "Can't vote", value: false },
  ];
  const adminBoolean = [
    { name: 'Is Admin', value: true },
    { name: 'Is not Admin', value: false },
  ];
  const verifyBoolean = [
    { name: 'Is Verified', value: true },
    { name: 'Is not Verified', value: false },
  ];

  if (loading) return '';

  const fields = [
    {
      label: 'Email',
      type: 'email',
      dfltVl: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'First name',
      type: 'text',
      onChange: handleMany(person, addPerson, 'first_name'),
      dfltVl: person.first_name,
    },
    {
      label: 'Last name',
      type: 'text',
      onChange: handleMany(person, addPerson, 'last_name'),
      dfltVl: person.last_name,
    },
  ];

  const selecters = [
    {
      label: 'Position',
      actions: userRoles,
      handle: (e) => setPosition(e.target.value),
      dfltVl: position,
      canview: true,
    },
    {
      label: 'Function',
      actions: userFunctionTitles,
      handle: (e) => setFunction(e.target.value),
      dfltVl: personFunction,
      canview: position !== 'local committee president',
    },
  ];

  const closeModel = () => {
    close(false);
    onClose();
  };

  const updateUser = (e) => {
    if (validateForm(person, email, setError, setAlert) === false) return false;
    e.preventDefault();
    updatePerson({
      variables: {
        id,
        person: {
          ...person,
          email,
          can_vote,
          is_admin,
          is_verified,
          contact_detail: { email },
          current_positions: {
            position_name: position,
            function: {
              name: personFunction,
            },
          },
          manager: responsible,
        },
      },
    })
      .then(() => {
        setAlert(true);
        close(false);
        onClose();
      })
      .catch(() => {
        setAlert(true);
        close(false);
      });
  };

  const isLCP = position === 'local committee president';
  const isVPIM = position === 'vice president'
    && personFunction === 'information management';

  return (
    <>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <form>
              {fields.map((field) => (
                <EditField
                  margin
                  key={field.label}
                  onChange={field.onChange}
                  type={field.type}
                  label={field.label}
                  dfltVl={field.dfltVl}
                />
              ))}
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
              />
              {selecters.map(
                (selector) => selector.canview && (
                <Selecter
                  key={selector.label}
                  handle={selector.handle}
                  label={selector.label}
                  actions={selector.actions}
                  dfltVl={selector.dfltVl}
                  required
                />
                ),
              )}
              {(isLCP || isVPIM) && (
                <FormControl variant="filled" className={classes.margin}>
                  <InputLabel>Admin member</InputLabel>
                  <Select
                    onChange={(e) => setIs_admin(e.target.value)}
                    defaultValue={is_admin}
                  >
                    {adminBoolean.map((action) => (
                      <MenuItem key={action.value} value={action.value}>
                        {action.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl variant="filled" className={classes.margin}>
                <InputLabel>Verified member</InputLabel>
                <Select
                  onChange={(e) => setIs_verified(e.target.value)}
                  defaultValue={is_verified}
                >
                  {verifyBoolean.map((action) => (
                    <MenuItem key={action.value} value={action.value}>
                      {action.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" className={classes.margin}>
                <InputLabel>Voting member</InputLabel>
                <Select
                  onChange={(e) => setCan_vote(e.target.value)}
                  defaultValue={can_vote}
                >
                  {voteBoolean.map((action) => (
                    <MenuItem key={action.value} value={action.value}>
                      {action.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {position === 'team member' && (
                <Autocomplete
                  options={allTeamLeaders?.allTeamLeaders}
                  getOptionLabel={(option) => option.full_name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(_, m) => setResponsible(m?.id)}
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
            </form>
          </Box>
        </DialogContent>
        <Box pr={2}>
          <DialogActions>
            <Button onClick={() => closeModel()} color="default">
              Cancel
            </Button>
            <Button onClick={updateUser} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {Alert(
        updateError || validationError,
        openAlert,
        () => setAlert(false),
        'User is updated successfully!',
      )}
    </>
  );
};

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

EditUser.defaultProps = {
  title: '',
};

export default EditUser;
