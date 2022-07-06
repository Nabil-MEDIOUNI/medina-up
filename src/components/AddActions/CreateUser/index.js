import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  FormControl,
  Box,
  Button,
  DialogActions,
  Dialog,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import { useMutation, useQuery } from 'react-apollo';
import Divider from '../../_common/Divider';
import EditField from '../../_common/EditFields/EditField';
import DatePicker from '../../_common/EditFields/DatePicker';
import Selecter from '../../_common/EditFields/Selecter';
import genders from '../../../constants/genders';
import { userRoles, userFunctionTitles } from '../../../constants/users';
import { handleMany } from '../../../utils/handle';
import { CREATE_PERSON } from '../../../apollo/mutations/person';
import Alert from '../../../utils/alert';
import { ALL_PEOPLE, ALL_TEAM_LEADERS } from '../../../apollo/queries/people';
import { ALL_MANAGERS } from '../../../apollo/queries/eps/ogx-eps';
import validateForm from '../../../utils/validateForm';
import { getFilter } from '../../../utils/checkFilters';

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

const AddUserModal = ({ open, onClose, title }) => {
  const classes = useStyles({});

  const { data, loading } = useQuery(ALL_TEAM_LEADERS);

  const [openAlert, setAlert] = useState(false);
  const [validationError, setError] = useState({ message: undefined });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [person, setPerson] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
  });

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [responsible, setResponsible] = useState(undefined);
  const [personFunction, setFunction] = useState('');
  const [apply, setApply] = useState('');

  const checkQueryForEps = () => {
    if (position === 'team leader') return ALL_TEAM_LEADERS;
    return ALL_MANAGERS;
  };

  const setSessionFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const filters = {
    programm: getFilter('FILTER_PEOPLE_PROGRAMM')
      ? setSessionFilter('FILTER_PEOPLE_PROGRAMM')
      : undefined,
    gender: getFilter('FILTER_PEOPLE_GENDER')
      ? setSessionFilter('FILTER_PEOPLE_GENDER')
      : undefined,
    team_responsible: getFilter('FILTER_PEOPLE_LEADERS')
      ? setSessionFilter('FILTER_PEOPLE_LEADERS')
      : undefined,
    current_positions: getFilter('FILTER_PEOPLE_POSITIONS')
      ? setSessionFilter('FILTER_PEOPLE_POSITIONS')
      : undefined,
  };

  const [createPerson, { error }] = useMutation(CREATE_PERSON, {
    refetchQueries: [
      {
        query: checkQueryForEps(),
      },
      {
        query: ALL_PEOPLE,
        variables: {
          filters,
        },
      },
    ],
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPerson({ ...person, dob: date && date.toString() });
  };

  const initialState = {
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
  };

  const clean = () => {
    setPerson({ ...initialState });
    setError(undefined);
    setEmail('');
    setPhone('');
    setPosition('');
    setFunction('');
    setApply('');
    onClose();
  };

  const addUser = (e) => {
    if (validateForm(person, email, setError, setAlert) === false) return false;
    e.preventDefault();
    setApply(true);
    createPerson({
      variables: {
        person: {
          ...person,
          email,
          contact_detail: { email, phone },
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
        clean();
      })
      .catch(() => {
        setApply(false);
        setAlert(true);
      });
  };

  const fields = [
    {
      label: 'First name',
      onChange: handleMany(person, setPerson, 'first_name'),
      key: 1,
      req: true,
    },
    {
      label: 'Last name',
      onChange: handleMany(person, setPerson, 'last_name'),
      key: 2,
      req: true,
    },
    {
      label: 'Email',
      type: 'email',
      onChange: (e) => setEmail(e.target.value),
      key: 3,
      req: true,
    },
    {
      label: 'Phone',
      type: 'number',
      onChange: (e) => setPhone(e.target.value),
      key: 4,
    },
  ];

  const checkFields = () => {
    if (
      email
      && person.gender
      && person.first_name
      && person.last_name
      && position === 'local committee president'
    ) {
      return false;
    }
    if (
      !email
      || !person.gender
      || !person.first_name
      || !person.last_name
      || !position
      || !personFunction
      || apply
    ) {
      return true;
    }
    return false;
  };

  if (loading) return '';

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
                  key={field.key}
                  onChange={field.onChange}
                  type={field.type}
                  label={field.label}
                  required={field.req}
                />
              ))}
              <FormControl style={{ width: '100%' }} className={classes.margin}>
                <DatePicker
                  handle={handleDateChange}
                  label="Date of birth"
                  defaultValue={selectedDate}
                  selectedDate={selectedDate}
                  inputVariant="filled"
                />
              </FormControl>
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
                width="-1px"
              />
              <Selecter
                handle={handleMany(person, setPerson, 'gender')}
                label="Gender"
                key={1}
                actions={genders}
                required
              />
              <Selecter
                handle={(e) => setPosition(e.target.value)}
                label="Position"
                key={6}
                actions={userRoles}
                required
              />
              {position !== 'local committee president'
                && position !== 'Alumni' && (
                  <Selecter
                    handle={(e) => setFunction(e.target.value)}
                    label="Function"
                    key={7}
                    actions={userFunctionTitles}
                    required
                  />
              )}
              {position === 'team member' && (
                <Autocomplete
                  options={data?.allTeamLeaders}
                  getOptionLabel={(option) => option.full_name}
                  onChange={(_, m) => setResponsible(m?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Team Responsible"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={(e) => setResponsible(e.target.value)}
                    />
                  )}
                />
              )}
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={clean} color="default">
            Cancel
          </Button>
          <Button disabled={checkFields()} onClick={addUser} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      {Alert(
        error || validationError,
        openAlert,
        () => setAlert(false),
        'Account created successfully!',
      )}
    </>
  );
};

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

AddUserModal.defaultProps = {
  title: '',
};

export default AddUserModal;
