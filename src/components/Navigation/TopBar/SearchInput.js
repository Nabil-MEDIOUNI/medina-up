import React from 'react';

import { Box, IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';

import useStyles from './styles';

const SearchInput = ({
  UpdateSearch,
  search,
  placeholder,
  setSearch,
  setSeach,
  slicedSearch,
  showSearch,
}) => {
  const classes = useStyles();

  const clearSearch = () => {
    setSearch('');
    setSeach(false);
  };

  return (
    <>
      <Box ml={-2}>
        {showSearch && (
        <IconButton
          onClick={clearSearch}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <ArrowBackIcon className={classes.icon} />
        </IconButton>
        )}
      </Box>

      {showSearch && (
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          id="search"
          autoFocus
          placeholder={`Search in ${placeholder}`}
          className="search_input"
          onChange={(e) => UpdateSearch(e)}
          value={slicedSearch}
        />
        {search.length > 1 && (
        <IconButton
          style={{ position: 'absolute', top: 0, right: '0.25rem' }}
          onClick={() => setSearch('')}
        >
          <ClearIcon style={{ fontSize: 17 }} />
        </IconButton>
        )}
      </div>
      )}
    </>
  );
};

export default SearchInput;
