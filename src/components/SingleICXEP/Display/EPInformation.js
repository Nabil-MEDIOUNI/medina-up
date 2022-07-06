import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import {
  PermPhoneMsg,
  Mail,
  Person,
  FileCopy,
} from '@material-ui/icons';

import copy from 'copy-to-clipboard';
import Field from '../../_common/Field/Field';
import AlignedField from '../../_common/Field/AlignedField';
import StatusLabel from '../../_common/Statuses';
import ProductBadge from '../../_common/Logos/ProductBadge';
import useStyles from '../../../pages/eps/ogx_eps/styles';

const EPInformation = ({ singleEP }) => {
  const classes = useStyles();

  const call = () => {
    window.location.replace(`tel:${parseInt(singleEP.WhatsupNumber, 10)}`);
  };
  const sendEmail = () => {
    window.location.replace(`mailto:${singleEP.Email}`);
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
              product={sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT')}
            />
            <StatusLabel
              name={singleEP.Status && singleEP.Status.toLowerCase()}
              type="person"
            />
          </Box>
        </Box>
        <AlignedField
          marginBottom
          text="Email"
          onClick={sendEmail}
          data={singleEP.Email}
          showIcon
          icon={<Mail className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="Phone"
          onClick={call}
          data={singleEP.WhatsupNumber}
          showIcon
          icon={<PermPhoneMsg className={classes.shownIcon} />}
        />
        <AlignedField
          marginBottom
          text="EXPA ID"
          data={singleEP.EXPAID}
          onClick={() => copy(singleEP.EXPAID)}
          showIcon
          icon={<FileCopy className={classes.shownIcon} />}
        />
        <Box display="flex" flexDirection="row">
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="Country " data={singleEP.Country || '-'} />
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
        <Box display="flex" flexDirection="row">
          <Box className={classes.wrapBox} flex="0 50%">
            <Field text="Member Responsible" />
            <Box display="flex" alignItems="center">
              <Box width="100%" whiteSpace="nowrap">
                <Typography className={classes.EPcontent}>
                  {singleEP.MemberResponsible || '-'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

EPInformation.propTypes = {
  singleEP: PropTypes.object.isRequired,
};

export default EPInformation;
