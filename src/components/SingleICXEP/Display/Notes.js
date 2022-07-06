import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { InsertDriveFile } from '@material-ui/icons';
import useStyles from '../../../pages/eps/ogx_eps/styles';

const Notes = ({ singleEP }) => {
  const classes = useStyles();

  return (
    <Box
      mx={2}
      boxShadow="0px 0px 10px #c7c7c7"
      borderRadius="4px"
      p={2}
      mt={2}
      bgcolor="white"
    >
      <Box display="flex" mb={2}>
        <InsertDriveFile className={classes.epNoteIcon} />
        <Typography className={classes.epNoteTypo}>Notes</Typography>
      </Box>
      <Typography style={{ fontSize: 14 }}>If rejected why?</Typography>
      <Typography variant="caption">{singleEP.ifRejectedWhy || '-'}</Typography>
      <Typography style={{ fontSize: 14, marginTop: 16 }}>Intreview output</Typography>
      <Typography variant="caption">{singleEP.Intreviewoutput || '-'}</Typography>
    </Box>
  );
};

Notes.propTypes = {
  singleEP: PropTypes.object.isRequired,
};

export default Notes;
