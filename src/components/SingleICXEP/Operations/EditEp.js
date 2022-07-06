import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitle, DialogContent, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import EditField from '../../_common/EditFields/EditField';
import { handleMany } from '../../../utils/handle';

import Selecter from '../../_common/EditFields/Selecter';
import { allStatuses } from '../../../constants/allStatuses';
import InputFields from './InputFields';

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
  open, onClose, title, name, singleEP, loading,
}) => {
  const classes = useStyles({});

  const product = sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT');

  const [currentEP, setEP] = useState({
    EPName: '',
    EXPAID: '',
    Email: '',
    WhatsupNumber: '',
    Country: '',
    Background: '',
    CV: '',
    Status: '',
    ifRejectedWhy: '',
    MemberResponsible: '',
    OPPmanager: '',
    HomeMC: '',
    HomeLC: '',
    SUBProduct: '',
    SDGNumber: '',
    ProjectName: '',
    OpportunityName: '',
    CONTACTED: '',
    InterviewDate: '',
    TIME: '',
    Interviewed: '',
    Intreviewoutput: '',
    APLDate: '',
    APDDate: '',
    REDate: '',
    FinDate: '',
  });

  useEffect(() => {
    if (singleEP) {
      setEP({ ...singleEP });
    }
  }, [name, singleEP]);

  if (navigator.onLine && loading) return '';

  const interviewedConditions = [
    { name: 'TRUE', value: 'TRUE' },
    { name: 'FALSE', value: 'FALSE' },
  ];

  const selecters = [
    {
      label: 'Status',
      actions: allStatuses,
      canview: true,
      handle: handleMany(currentEP, setEP, 'Status'),
      dfltVl: currentEP.Status,
    },
    {
      label: 'Interviewed',
      actions: interviewedConditions,
      canview: true,
      handle: handleMany(currentEP, setEP, 'Interviewed'),
      dfltVl: currentEP.Interviewed,
    },
  ];

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
              {selecters.map(
                (selector) => selector.canview && (
                <Selecter
                  key={selector.label}
                  label={selector.label}
                  handle={selector.handle}
                  actions={selector.actions}
                  dfltVl={selector.dfltVl}
                  required
                />
                ),
              )}
              {InputFields(currentEP, handleMany, setEP, product).map(
                (field) => (
                  <EditField
                    key={field.label}
                    margin
                    onChange={field.onChange}
                    type={field.type}
                    label={field.label}
                    dfltVl={field.dfltVl}
                  />
                ),
              )}
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button color="primary">Apply</Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

EditProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  SetSingleEP: PropTypes.func.isRequired,
  singleEP: PropTypes.object.isRequired,
  title: PropTypes.string,
};

EditProfile.defaultProps = {
  title: '',
};

export default EditProfile;
