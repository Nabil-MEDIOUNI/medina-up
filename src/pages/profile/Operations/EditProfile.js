/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {
  DialogTitle,
  DialogContent,
  FormControl,
  Box,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';
import Divider from '../../../components/_common/Divider';
import EditField from '../../../components/_common/EditFields/EditField';
import DatePicker from '../../../components/_common/EditFields/DatePicker';
import Selecter from '../../../components/_common/EditFields/Selecter';
import genders from '../../../constants/genders';
import { handleMany } from '../../../utils/handle';
import Alert from '../../../utils/alert';
import { CURRENT_PERSON_UPDATE } from '../../../apollo/mutations/currentPerson';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { USER_INFO } from '../../../apollo/queries/userQueries';
import { getFullDate } from '../../../utils/dateTimeService';

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

const EditProfile = ({
  open, onClose, title, close,
}) => {
  const classes = useStyles({});
  const { data } = useContext(UserInfoContext);

  const [currentPersonUpdate, { error }] = useMutation(CURRENT_PERSON_UPDATE, {
    refetchQueries: [{ query: USER_INFO }],
  });

  const [openAlert, setAlert] = useState(false);
  const [person, addPerson] = useState({
    gender: '',
    dob: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (data) {
      setEmail(data?.currentPerson.email);
      setPhone(data?.currentPerson.contact_detail.phone);
      setSelectedDate(getFullDate(data?.currentPerson.dob));
      addPerson({ dob: getFullDate(data?.currentPerson.dob), gender: data?.currentPerson.gender });
    }
  }, [data]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    addPerson({ ...person, dob: date && date.toString() });
  };

  const addUser = (e) => {
    e.preventDefault();
    currentPersonUpdate({
      variables: {
        person: {
          ...person,
          contact_detail: { email, phone },
        },
      },
    })
      .then(() => {
        setAlert(true);
        onClose();
        close(false);
      })
      .catch(() => {
        setAlert(true);
      });
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      dfltVl: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'Phone',
      type: 'number',
      onChange: (e) => setPhone(e.target.value),
      dfltVl: phone,
    },
  ];
  const selecters = [
    {
      label: 'Gender',
      actions: genders,
      handle: handleMany(person, addPerson, 'gender'),
      dfltVl: person.gender,
    },
  ];

  const checkFields = () => {
    if (!email || !selectedDate || !phone || !person.gender || !person.dob) {
      return true;
    }
    return false;
  };

  const closeModel = () => {
    close(false);
    onClose();
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
              <FormControl style={{ width: '100%' }} className={classes.margin}>
                <DatePicker
                  handle={handleDateChange}
                  label="Date of birth"
                  selectedDate={selectedDate}
                  defaultValue={selectedDate}
                  inputVariant="filled"
                />
              </FormControl>
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
                width="-1px"
              />
              {selecters.map((selector) => (
                <Selecter
                  key={selector.label}
                  handle={selector.handle}
                  label={selector.label}
                  actions={selector.actions}
                  dfltVl={selector.dfltVl}
                  required
                />
              ))}
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={closeModel} color="default">
            Cancel
          </Button>
          <Button disabled={checkFields()} onClick={addUser} color="primary">
            Apply
          </Button>
        </DialogActions>
      </MuiDialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Profile is updated successfully!',
      )}
    </>
  );
};

EditProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

EditProfile.defaultProps = {
  title: '',
};

export default EditProfile;
