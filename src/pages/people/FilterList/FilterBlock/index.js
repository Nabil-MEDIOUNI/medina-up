import React from 'react';

import SwipeableDrawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Box, Typography, Button,
} from '@material-ui/core';

import useStyles from '../styles';
import Divider from '../../../../components/_common/Divider';

const FilterBlock = ({
  open, setList, storageName, list,
}) => {
  const classes = useStyles();
  const filters = JSON.parse(sessionStorage.getItem(storageName));

  const [state, setState] = React.useState(filters);

  if (!state) { setState([]); }

  const removeState = (filter) => {
    const newList = state.filter((item) => item !== filter);
    setState(newList);
    sessionStorage.setItem(storageName, JSON.stringify(newList));
  };

  const handleChange = (event) => {
    if (state.includes(event.target.value)) {
      removeState(event.target.value);
    }
    if (!state.includes(event.target.value)) {
      setState((oldArray) => [...oldArray, event.target.value]);
    }
  };

  const setFilter = () => {
    if (state.length === 0) {
      sessionStorage.removeItem(storageName);
      setList(false);
    }
    if (state.length !== 0) {
      sessionStorage.setItem(storageName, JSON.stringify(state));
      setList(false);
    }
  };

  return (
    <>
      <SwipeableDrawer
        className={classes.root}
        anchor="bottom"
        open={open}
        onClose={() => setList(false)}
      >
        <Box className={classes.filtersHeader}>
          <Box ml={1}>
            <Button onClick={() => setList(false)}>
              <Typography style={{
                color: 'white',
                fontSize: 12,
                opacity: 1,
              }}
              >
                Cancel
              </Typography>
            </Button>
          </Box>
          <Box>
            <Typography style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Statuses</Typography>
          </Box>
          <Box mr={1}>
            <Button onClick={setFilter}>
              <Typography style={{
                color: 'white',
                fontSize: 12,
                opacity: 1,
              }}
              >
                Done
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box className={classes.filterContent} my={3}>
          <FormControl fullWidth component="fieldset">
            {
                list.map((status) => (
                  <span key={status.value}>
                    <FormControlLabel
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        margin: '8px 24px',
                      }}
                      control={(
                        <Checkbox
                          defaultChecked={filters && filters.includes(status.value)}
                          color="default"
                          onChange={handleChange}
                          value={status.value}
                        />
                        )}
                      label={status.name}
                    />
                    <Divider marginTop="0px" />
                  </span>
                ))
              }
          </FormControl>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default FilterBlock;
