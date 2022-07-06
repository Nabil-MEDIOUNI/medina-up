import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';

const GlobalLoader = () => {
  useEffect(() => {
    if (!navigator.onLine) {
      const loader_container = document.getElementById(
        'loader_container',
      );
      loader_container.style.display = 'none';
    }
  });

  return (
    <Box id="loader_container" className="loader">
      <Box className="icon" />
      <Box className="subname">
        <Typography
          variant="h5"
          className="loader_subname"
        >
          MEDINA UP
        </Typography>
      </Box>
    </Box>
  );
};

export default GlobalLoader;
