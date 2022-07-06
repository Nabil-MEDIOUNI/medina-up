import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  Box,
  Button,
  DialogActions,
  Dialog,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';
import Divider from '../../_common/Divider';
import EditField from '../../_common/EditFields/EditField';
import Selecter from '../../_common/EditFields/Selecter';
import genders from '../../../constants/genders';
import { handleMany } from '../../../utils/handle';
import { CREATE_EP } from '../../../apollo/mutations/ep';
import Alert from '../../../utils/alert';
import { priorityOptions } from '../../../constants/others';
import { InputFields, MarketQuestions, Selecters } from './InputFields';

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

const AddEPModal = ({
  open, onClose, title, setObjects, refetchObjects,
}) => {
  const classes = useStyles({});

  const [openAlert, setAlert] = useState(false);
  const [apply, setApply] = useState('');
  const [validationError, setError] = useState({ message: undefined });

  const initialState = {
    Product: '',
    EPName: '',
    EPEmail: '',
    EPPhone: '',
    FacebookLink: '',
    EPUniversity: '',
    EPAge: '',
    Gender: '',
    EPYear: '',
    CommunicationPrefrences: '',
    Travel: '',
    Obstacles: '',
    Prioritization: '',
    Expectation: '',
    Is_sign_up: '',
  };

  const [ep, setEP] = useState(initialState);
  const [createEP, { error }] = useMutation(CREATE_EP);

  const clean = () => {
    setEP({ ...initialState });
    setError(undefined);
    setApply('');
    onClose();
  };

  const addEP = (e) => {
    e.preventDefault();
    setApply(true);
    createEP({
      variables: {
        ep: {
          ...ep,
        },
      },
    })
      .then(() => {
        if (refetchObjects) {
          refetchObjects().then(({ data }) => {
            setObjects(data.data.allEPs);
          });
        }
        clean();
      })
      .catch(() => {
        setApply(false);
        setAlert(true);
      });
  };

  const checkFields = () => {
    if (
      !ep.EPName
      || !ep.Gender
      || !ep.EPUniversity
      || !ep.EPYear
      || !ep.EPAge
      || !ep.Product
      || !ep.Obstacles
      || !ep.Travel
      || !ep.Prioritization
      || !ep.Expectation
      || !ep.Is_sign_up
      || apply
    ) {
      return true;
    }
    return false;
  };

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
              {InputFields(ep, handleMany, setEP).map((field) => (
                <EditField
                  margin
                  key={field.key}
                  onChange={field.onChange}
                  type={field.type}
                  label={field.label}
                  required={field.req}
                />
              ))}
              <Box margin="0px 0px 8px 4px">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#037ef3', fontSize: 12, fontFamily: 'Lato' }}
                >
                  Open Facebook
                </a>
              </Box>
              <EditField
                margin
                onChange={handleMany(ep, setEP, 'FacebookLink')}
                type="text"
                label="Facebook Link"
              />
              <Selecter
                handle={handleMany(ep, setEP, 'Gender')}
                label="Gender"
                actions={genders}
                required
              />
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
                width="-1px"
              />
              {MarketQuestions(ep, handleMany, setEP).map((field) => (
                <EditField
                  margin
                  multiline
                  key={field.key}
                  onChange={field.onChange}
                  type={field.type}
                  label={field.label}
                  required={field.req}
                />
              ))}
              <Selecter
                handle={handleMany(ep, setEP, 'Prioritization')}
                label="Tell us your 1st prioritization"
                actions={priorityOptions}
                required
              />
              <EditField
                margin
                onChange={handleMany(ep, setEP, 'Expectation')}
                type="text"
                label="What do u expect from AIESEC?"
                required
              />
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
                width="-1px"
              />
              {Selecters(ep, handleMany, setEP).map((selector) => (
                <Selecter
                  key={selector.label}
                  label={selector.label}
                  handle={selector.handle}
                  actions={selector.actions}
                  required
                />
              ))}
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={clean} color="default">
            Cancel
          </Button>
          <Button disabled={checkFields()} onClick={addEP} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      {Alert(
        error || validationError,
        openAlert,
        () => setAlert(false),
        'EP is created successfully!',
      )}
    </>
  );
};

AddEPModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

AddEPModal.defaultProps = {
  title: '',
};

export default AddEPModal;
