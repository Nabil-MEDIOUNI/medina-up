/* eslint-disable camelcase */
import React, { useEffect } from 'react';

import { Box, Typography } from '@material-ui/core';
import { useMutation } from 'react-apollo';

import { clearToken } from '../../apollo/helpers/HandleToken';
import { CHANGE_USER_CONECTIVITY } from '../../apollo/mutations/currentPerson';

const Logout = () => {
  const [cahnge_user_connectivity] = useMutation(CHANGE_USER_CONECTIVITY);

  useEffect(() => {
    cahnge_user_connectivity({
      variables: {
        connectivity: false,
      },
    }).then(() => {
      clearToken();
    });
  }, [cahnge_user_connectivity]);

  return (
    <Box className="loader">
      <Box className="icon" />
      <Box className="subname">
        <Typography variant="h5" className="loader_subname">
          MEDINA UP
        </Typography>
      </Box>
    </Box>
  );
};

export default Logout;
