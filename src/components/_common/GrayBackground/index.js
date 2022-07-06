import React from 'react';

import { Box } from '@material-ui/core';

const GrayBackground = () => (
  <Box
    position="fixed"
    bgcolor="#f7f7f7"
    width="100%"
    height="100vh"
    zIndex={-1}
  />
);

export default GrayBackground;
