import React from 'react';
import PropTypes from 'prop-types';

import SwipeableDrawer from '@material-ui/core/Drawer';

import useStyles from '../styles';
import FilterOperation from './Operation';

const FilterList = ({ openFilterList, setFilter }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      className={classes.root}
      anchor="bottom"
      open={openFilterList === true}
      onClose={() => setFilter(false)}
    >
      <FilterOperation setFilter={setFilter} />
    </SwipeableDrawer>
  );
};

FilterList.propTypes = {
  setFilter: PropTypes.func.isRequired,
  openFilterList: PropTypes.bool.isRequired,
};

export default FilterList;
