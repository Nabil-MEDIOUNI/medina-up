import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import useStyles from '../styles';
import { getFilter } from '../../../../utils/checkFilters';

const ChooseProduct = () => {
  const classes = useStyles();

  return (
    <>
      {!getFilter('FILTER_ICX_EPS_PRODUCT') && (
      <Box
        display="flex"
        flexDirection="column"
        margin="25% auto"
        alignItems="center"
      >
        <Box>
          <img
            className="arrow_up_eps_list"
            width="140px"
            src="/static/img/arrow_up.png"
            alt=""
          />
        </Box>
        <Box mt={-2}>
          <Typography className={classes.selectProduct}>
            Please choose a product!
          </Typography>
        </Box>
      </Box>
      )}
    </>
  );
};

export default ChooseProduct;
