import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Copyright = () => {
  const now = new Date();

  return (
    <Box className="copyright" mb={1}>
      <Typography style={{ fontSize: 10 }} variant="caption">
        Copyright
        {' '}
        <span>
          <img src="/static/icons/copyright.svg" alt="c" />
        </span>
        {' '}
        {now.getFullYear()}
        {' '}
        AIESEC MEDINA Creation
      </Typography>
    </Box>
  );
};

export default Copyright;
