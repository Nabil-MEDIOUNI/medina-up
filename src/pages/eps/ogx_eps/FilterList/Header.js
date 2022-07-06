/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Button, IconButton,
} from '@material-ui/core';

import { Clear, ArrowBack } from '@material-ui/icons';
import useStyles from '../styles';
import { checkOGXEPFilters } from '../../../../utils/checkFilters';

const FilterHeader = ({
  setFilter, showClearBtn, clear, setClearBtn,
}) => {
  const classes = useStyles();

  const getFilter = useCallback((filterName) => Boolean(sessionStorage.getItem(filterName)));

  useEffect(() => {
    setClearBtn(true);
  }, [getFilter]);

  return (
    <Box className={classes.filtersHeader}>
      <Box ml={1}>
        {(showClearBtn && checkOGXEPFilters()) && (
        <IconButton onClick={clear}>
          <Clear style={{ fontSize: 22, color: 'white' }} />
        </IconButton>
        )}
        {!checkOGXEPFilters() && (
        <IconButton onClick={() => setFilter(false)}>
          <ArrowBack style={{ fontSize: 22, color: 'white' }} />
        </IconButton>
        )}
      </Box>
      <Box>
        <Typography style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Filter List</Typography>
      </Box>
      <Box mr={1}>
        <Button disabled={!checkOGXEPFilters()} onClick={() => setFilter(false)}>
          <Typography style={{
            color: !checkOGXEPFilters() ? '#ffffff80' : 'white',
            fontSize: 14,
            opacity: 1,
          }}
          >
            Apply
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

FilterHeader.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterHeader;
