import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import useStyles from '../styles';
import ProfileCard from './ProfileCard';
import AddEPModal from '../../../components/AddActions/CreateEP';

const BetaContainer = () => {
  const classes = useStyles();
  const [showEPModal, setEPModal] = useState(false);

  return (
    <Box id="dashboard_container">
      <Box className={classes.boxkbir} pt="10px" />
      <Box
        height="fit-content"
        pt="5rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <ProfileCard />
        <Box
          style={{
            width: '20rem',
            position: 'absolute',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            left: '50%',
          }}
          onClick={() => setEPModal(true)}
        >
          <img src="/static/img/sign-up.png" alt="" width="100%" />
        </Box>
        <AddEPModal
          title="Add Exchange Participant"
          onClose={() => setEPModal(false)}
          open={showEPModal}
        />
      </Box>
    </Box>
  );
};
export default BetaContainer;
