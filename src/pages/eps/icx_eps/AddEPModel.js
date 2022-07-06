import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitle, DialogContent, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import Selecter from '../../../components/_common/EditFields/Selecter';
import EditField from '../../../components/_common/EditFields/EditField';
import { handleMany } from '../../../utils/handle';
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

const AddEPModel = ({ open, onClose }) => {
  const classes = useStyles({});

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

  const productStorage = sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT');

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
    },
    {
      label: 'Interviewed',
      actions: interviewedConditions,
      canview: true,
      handle: handleMany(currentEP, setEP, 'Interviewed'),
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
        <DialogTitle className={classes.title}>Add EP</DialogTitle>
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
              {InputFields(handleMany, currentEP, setEP, productStorage).map(
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

AddEPModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddEPModel;
