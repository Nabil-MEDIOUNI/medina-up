import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import {
  PermPhoneMsg,
  Mail,
  Visibility,
  Person,
} from '@material-ui/icons';

import Field from '../../../_common/Field/Field';
import AlignedField from '../../../_common/Field/AlignedField';
import { getSignUPDate } from '../../../../utils/dateTimeService';
import StatusLabel from '../../../_common/Statuses';
import ProductBadge from '../../../_common/Logos/ProductBadge';
import GetManagers from './GetManagers';
import useStyles from '../../../../pages/eps/ogx_eps/styles';

const EPInformation = ({ singleEP, getSingleEP, setSingleEP }) => {
  const classes = useStyles();
  const getYear = new Date().getFullYear();

  const call = () => {
    window.location.replace(`tel:${parseInt(singleEP.EPPhone, 10)}`);
  };
  const sendEmail = () => {
    window.location.replace(`mailto:${singleEP.EPEmail}`);
  };

  return (
    <>
      <Box
        mt="-2rem"
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="100vh"
        zIndex={-1}
      />
      <Box
        mx={2}
        mt={9}
        boxShadow="0px 0px 10px #c7c7c7"
        borderRadius="4px"
        bgcolor="white"
        p={2}
      >
        <Box display="flex">
          <Person className={classes.epInformationIcon} />
          <Typography className={classes.epInformationTypo}>
            EP Information
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <AlignedField
            marginBottom
            text="Full name"
            data={singleEP.EPName}
          />
          <Box display="flex" alignItems="center" mt={2}>
            <ProductBadge
              size="14px"
              height="18px"
              product={singleEP.Product?.replace(/\s/g, '')}
            />
            <StatusLabel
              name={singleEP.Status?.toLowerCase()}
              type="person"
            />
          </Box>
        </Box>
        <AlignedField
          marginBottom
          text="Email"
          onClick={sendEmail}
          data={singleEP.EPEmail}
          showIcon
          icon={<Mail className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="Phone"
          onClick={call}
          data={singleEP.EPPhone}
          showIcon
          icon={<PermPhoneMsg className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="Expa ID"
          onClick={() => window.open(`https://expa.aiesec.org/people/${singleEP.ExpaID}`, '_blank')}
          data={`https://expa.aiesec.org/people/${singleEP.ExpaID}`}
          showIcon
          icon={<Visibility className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="Facebook Link"
          onClick={() => window.open(singleEP.FacebookLink, '_blank')}
          data={singleEP.FacebookLink}
          showIcon
          icon={<Visibility className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="CV Link"
          onClick={() => window.open(singleEP.CV, '_blank')}
          data={singleEP.CV}
          showIcon
          icon={<Visibility className={classes.shownIcon} />}
        />
        <Box display="flex" flexDirection="row" mt={2}>
          <Box className={classes.wrapBox} flex="0 50%">
            <Field
              text="Age"
              data={getYear - parseInt(singleEP.EPAge, 10) || '-'}
            />
          </Box>
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="Gender" data={singleEP.EPYear || '-'} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="Date of birth" data={singleEP.EPAge || '-'} />
          </Box>
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="University" data={singleEP.EPUniversity || '-'} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="Gender" data={singleEP.Gender || '-'} />
          </Box>
          <Box className={classes.wrapBox} flex="0 50%">
            <Field
              text="Signed Up"
              data={getSignUPDate(singleEP)}
            />
          </Box>
        </Box>
        <Box mx={-2} my={2}>
          <hr
            style={{
              with: '100%',
              margin: '0 auto',
              opacity: 0.2,
            }}
          />
        </Box>
        <GetManagers setSingleEP={setSingleEP} getSingleEP={getSingleEP} singleEP={singleEP} />
      </Box>
    </>
  );
};

EPInformation.propTypes = {
  singleEP: PropTypes.object.isRequired,
};

export default EPInformation;
