import React from 'react';

import {
  Box, Typography,
} from '@material-ui/core';

import useStyles from '../../ogx_eps/styles';
import { getFilter } from '../../../../utils/checkFilters';

const SwitchProduct = ({ setFilter }) => {
  const classes = useStyles();
  const product = getFilter('FILTER_ICX_EPS_PRODUCT');

  return (
    <Box className={classes.productsContainer}>
      <Box
        onClick={() => {
          setFilter('');
          sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', 'IGV');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(240, 92, 66, 1)', border: product === 'IGV' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">IGV</Typography>
      </Box>
      <Box
        onClick={() => {
          setFilter('1');
          sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', 'IGT');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(24, 181, 181, 1)', border: product === 'IGT' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">IGT</Typography>
      </Box>
    </Box>
  );
};

export default SwitchProduct;
