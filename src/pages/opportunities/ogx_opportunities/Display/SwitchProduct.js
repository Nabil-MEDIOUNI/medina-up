import React from 'react';

import {
  Box, Typography,
} from '@material-ui/core';

import useStyles from '../../ogx_opportunities/styles';
import { getFilter } from '../../../../utils/checkFilters';

const SwitchProduct = () => {
  const classes = useStyles();
  const product = getFilter('FILTER_OPPORTUNITIES_PRODUCT');

  return (
    <Box className={classes.productsContainer}>
      <Box
        onClick={() => {
          console.log('');
          sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', 'OGV');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(240, 92, 66, 1)', border: product === 'OGV' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGV</Typography>
      </Box>
      <Box
        onClick={() => {
          console.log('1');
          sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', 'OGTa');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(24, 181, 181, 1)', border: product === 'OGTa' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGTa</Typography>
      </Box>
      <Box
        onClick={() => {
          console.log('1');
          sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', 'OGTe');
        }}
        className={classes.productBtn}
        style={{ background: 'rgb(244, 137, 36)', border: product === 'OGTe' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGTe</Typography>
      </Box>
    </Box>
  );
};

export default SwitchProduct;
