import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import LanguageIcon from '@material-ui/icons/Language';

import copy from 'copy-to-clipboard';

import Field from '../../_common/Field/Field';
import AlignedField from '../../_common/Field/AlignedField';
import SDGs from '../../../constants/SDGs';
import useStyles from '../../../pages/eps/ogx_eps/styles';

const OpportunityDetails = ({ singleEP }) => {
  const classes = useStyles();
  const targetIndex = SDGs.find((sdg) => sdg.value.toString() === singleEP.SDGNumber);

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
          Project Details
        </Typography>
      </Box>
      <AlignedField
        marginBottom
        text="Project Name"
        onClick={() => copy(singleEP.ProjectName)}
        data={singleEP.ProjectName}
        showIcon
        icon={<FileCopy className={classes.shownIcon} />}
      />
      <Box>
        <Field text="SUSTAINABLE DEVELOPMENT GOAL" />
        {singleEP.SDGNumber ? (
          <>
            <span>
              <Typography style={{ fontSize: 14 }}>
                {targetIndex ? `${targetIndex.name} ` : ''}
              </Typography>
              <Typography variant="caption">
                {targetIndex ? targetIndex.description : ''}
              </Typography>
            </span>
          </>
        ) : (
          '-'
        )}
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
          <Field text="Host MC" data={singleEP.HomeMC || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Home LC" data={singleEP.HomeLC || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Opportunity Name " data={singleEP.OpportunityName || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Interview Date" data={singleEP.InterviewDate || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Applied Date" data={singleEP.APLDate || '-'} />
        </Box>
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Aproved Date" data={singleEP.APDDate || '-'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box className={classes.wrapBox} flex="0 50%">
          <Field text="Realized Date" data={singleEP.REDate || '-'} />
        </Box>
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
