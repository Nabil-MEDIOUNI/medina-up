import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Toolbar, AppBar } from '@material-ui/core';

import useStyles from './styles';
import SearchInput from './SearchInput';
import Options from './Options';
import MenuDrawer from './MenuDrawer';

const TopBar = ({
  setDrawer,
  showBar,
  title,
  showFilter,
  product,
  showAddEp,
  showAddEPModel,
  showBoxShadow,
  withSearch,
  UpdateSearch,
  search,
  placeholder,
  setSearch,
  setFilter,
  setAddEPModel,
  showModelFilter,
  selectedObjects,
  setObjects,
  refetchObjects,
  allObjects,
  setSelectedObjects,
  deleteMultiple,
  seeMultiple,
  showEye,
  showAssignee,
  error,
}) => {
  const classes = useStyles({ showBoxShadow });

  const [showSearch, setSeach] = useState(false);
  const slicedSearch = search;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          height: 52,
          backgroundColor: '#FFF',
          boxShadow: showBoxShadow ? '0.05px 0px 8px #00000061' : 'none',
          top: showBar && 0,
        }}
        className={showBar ? 'showTopBar' : 'hideTopBar'}
      >
        <Toolbar className={classes.Toolbar}>
          <MenuDrawer
            setDrawer={setDrawer}
            title={title}
            showBoxShadow={showBoxShadow}
            showSearch={showSearch}
            selectedObjects={selectedObjects}
            allObjects={allObjects}
            setSelectedObjects={setSelectedObjects}
          />

          <SearchInput
            UpdateSearch={UpdateSearch}
            search={search}
            placeholder={placeholder}
            setSearch={setSearch}
            setSeach={setSeach}
            slicedSearch={slicedSearch}
            showSearch={showSearch}
          />

          <Box className={classes.seperator} />

          <Options
            showFilter={showFilter}
            withSearch={withSearch}
            product={product}
            setFilter={setFilter}
            setAddEPModel={setAddEPModel}
            showAddEPModel={showAddEPModel}
            showAddEp={showAddEp}
            showModelFilter={showModelFilter}
            showSearch={showSearch}
            setSeach={setSeach}
            selectedObjects={selectedObjects}
            setSelectedObjects={setSelectedObjects}
            deleteMultiple={deleteMultiple}
            seeMultiple={seeMultiple}
            setObjects={setObjects}
            refetchObjects={refetchObjects}
            showEye={showEye}
            showAssignee={showAssignee}
            error={error}
          />

        </Toolbar>
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  setDrawer: PropTypes.func.isRequired,
  showBar: PropTypes.bool,
  showFilter: PropTypes.bool,
  showBoxShadow: PropTypes.bool,
  title: PropTypes.string,
};

TopBar.defaultProps = {
  showBar: true,
  showBoxShadow: true,
  showFilter: false,
  title: '',
};
export default TopBar;
