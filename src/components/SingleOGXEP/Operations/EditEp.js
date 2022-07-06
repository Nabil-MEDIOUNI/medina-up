import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitle, DialogContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Divider from '../../_common/Divider';
import EditField from '../../_common/EditFields/EditField';
import Selecter from '../../_common/EditFields/Selecter';
import { allStatuses } from '../../../constants/allStatuses';
import { getSingleEP } from '../../../apollo/queries/eps/ogx-eps';
import { handleMany } from '../../../utils/handle';

import Alert from '../../../utils/alert';
import InputFields from './InputFields';
import { UPDATE_EP } from '../../../apollo/mutations/ep';
import genders from '../../../constants/genders';
import { allUniversities } from '../../../constants/allUniversities';

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
  open, onClose, title, id, loading, SetSingleEP, singleEP,
}) => {
  const classes = useStyles({});
  const [updateEP, { error }] = useMutation(UPDATE_EP);

  const [update, setUpdate] = useState(false);
  const [currentEP, setEP] = useState({
    Product: '',
    EPName: '',
    ExpaID: '',
    EPEmail: '',
    EPPhone: '',
    FacebookLink: '',
    CV: '',
    EPUniversity: '',
    EPAge: '',
    Gender: '',
    EPYear: '',
    CommunicationPrefrences: '',
    Status: '',
    Note: '',
    FinanceCorner: '',
    OpportunityLink: '',
    SubProduct: '',
    HostLC: '',
    Country: '',
    AccDate: '',
    APDDate: '',
    REDate: '',
    FinDate: '',
  });

  const [openAlert, setAlert] = useState(false);

  React.useEffect(() => {
    setEP({
      Product: singleEP.Product,
      EPName: singleEP.EPName,
      ExpaID: singleEP.ExpaID,
      EPEmail: singleEP.EPEmail,
      EPPhone: singleEP.EPPhone,
      FacebookLink: singleEP.FacebookLink,
      CV: singleEP.CV,
      EPUniversity: singleEP.EPUniversity,
      EPAge: singleEP.EPAge,
      Gender: singleEP.Gender,
      EPYear: singleEP.EPYear,
      CommunicationPrefrences: singleEP.CommunicationPrefrences,
      Status: singleEP.Status,
      Note: singleEP.Note,
      FinanceCorner: singleEP.FinanceCorner,
      OpportunityLink: singleEP.OpportunityLink,
      SubProduct: singleEP.SubProduct,
      HostLC: singleEP.HostLC,
      Country: singleEP.Country,
      AccDate: singleEP.AccDate,
      APDDate: singleEP.APDDate,
      REDate: singleEP.REDate,
      FinDate: singleEP.FinDate,
    });
  }, [singleEP]);

  if (navigator.onLine && loading) return '';

  const updateEPSubmit = () => {
    setUpdate(true);
    updateEP({
      variables: {
        id,
        ep: {
          ...currentEP,
        },
      },
    })
      .then(() => {
        getSingleEP(id).then(() => {
          setEP({ ...currentEP });
          SetSingleEP({ ...currentEP });
          setAlert(true);
          onClose();
          setUpdate(false);
        });
      })
      .catch(() => {
        setAlert(true);
        setUpdate(false);
      });
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
              <Selecter
                label="Status"
                handle={handleMany(currentEP, setEP, 'Status')}
                actions={allStatuses}
                dfltVl={currentEP.Status}
                required
              />
              <Selecter
                label="University"
                handle={handleMany(currentEP, setEP, 'EPUniversity')}
                actions={allUniversities}
                dfltVl={currentEP.EPUniversity}
                required
              />
              <Divider
                marginRight="-24px"
                marginLeft="-38px"
                marginBottom="28px"
                width="1"
              />
              <Selecter
                label="Gender"
                handle={handleMany(currentEP, setEP, 'Gender')}
                actions={genders}
                dfltVl={currentEP.Gender}
                required
              />
              {InputFields(currentEP, handleMany, setEP).map((field) => (
                <EditField
                  key={field.label}
                  margin
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
                width="1"
              />
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button disabled={update} onClick={updateEPSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </MuiDialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'EP updated successfully!',
      )}
    </>
  );
};

EditProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  SetSingleEP: PropTypes.func.isRequired,
  title: PropTypes.string,
};

EditProfile.defaultProps = {
  title: '',
};

export default EditProfile;
