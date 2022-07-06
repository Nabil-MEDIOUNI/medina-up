import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import LanguageIcon from '@material-ui/icons/Language';

import copy from 'copy-to-clipboard';

import Field from '../../_common/Field/Field';
import AlignedField from '../../_common/Field/AlignedField';
import useStyles from '../../../pages/eps/ogx_eps/styles';

const OpportunityDetails = ({ singleEP }) => {
  const classes = useStyles();

  return (
    <Box
      mx={2}
      boxShadow="0px 0px 10px #c7c7c7"
      borderRadius="4px"
      p={2}
      bgcolor="white"
      mt={2}
    >
      <Box display="flex">
        <LanguageIcon className={classes.epOppIcon} />
        <Typography className={classes.epOppTypo}>
          Opportunity Details
        </Typography>
      </Box>
      <AlignedField
        marginBottom
        text="Opportunity Link"
        onClick={() => copy(singleEP.OpportunityLink)}
        data={singleEP.OpportunityLink}
        showIcon
        icon={<FileCopy className={classes.shownIcon} />}
      />
      <AlignedField
        marginBottom
        text="Finance Corner"
        onClick={() => copy(singleEP.FinanceCorner)}
        data={singleEP.FinanceCorner}
        showIcon
        icon={<FileCopy className={classes.shownIcon} />}
      />
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
          <Field text="Host LC" data={singleEP.HostLC || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Sub Product" data={singleEP.SubProduct || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Country" data={singleEP.Country || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Accepted Date" data={singleEP.AccDate || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Aproved Date" data={singleEP.APDDate || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Realized Date" data={singleEP.REDate || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Fin Date" data={singleEP.FinDate || '-'} />
        </Box>
      </Box>
    </Box>
  );
};

OpportunityDetails.propTypes = {
  singleEP: PropTypes.object.isRequired,
};

export default OpportunityDetails;
