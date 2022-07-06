import React from 'react';

import {
  Box, Typography,
} from '@material-ui/core';

import useStyles from './styles';
import { getFilter } from '../../../utils/checkFilters';

const SwitchProduct = ({ setFilter }) => {
  const classes = useStyles();
  const product = getFilter('FILTER_EPS_PRODUCT');

  return (
    <Box className={classes.productsContainer}>
      <Box
        onClick={() => {
          setFilter('');
          sessionStorage.setItem('FILTER_EPS_PRODUCT', 'OGT 1');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(24, 181, 181, 1)', border: product === 'OGT 1' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGT 1</Typography>
      </Box>
      <Box
        onClick={() => {
          setFilter('1');
          sessionStorage.setItem('FILTER_EPS_PRODUCT', 'OGT 2');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(24, 181, 181, 1)', border: product === 'OGT 2' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGT 2</Typography>
      </Box>
      <Box
        onClick={() => {
          setFilter('2');
          sessionStorage.setItem('FILTER_EPS_PRODUCT', 'OGV');
        }}
        className={classes.productBtn}
        style={{ background: 'rgba(240, 92, 66, 1)', border: product === 'OGV' && '2px solid #7d7d7d' }}
        mr={1.5}
      >
        <Typography className={classes.productTypo} variant="caption">OGV</Typography>
      </Box>
    </Box>
  );
};

export default SwitchProduct;
