import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
} from '@material-ui/core';
import useStyles from '../../../pages/people/FilterList/styles';

const FilterSelect = ({
  open, setList, list, storageName, title, label,
}) => {
  const classes = useStyles();
  const filters = JSON.parse(sessionStorage.getItem(storageName));

  const [state, setState] = React.useState(filters);

  if (!state) {
    setState([]);
  }

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
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setList(false)}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <DialogContent className={classes.content}>
          <Autocomplete
            multiple
            id="size-small-standard-multi"
            size="small"
            options={list}
            getOptionLabel={(option) => option.full_name}
            onChange={(_, r) => {
              setState(r.map((e) => e.id));
            }}
            value={list?.filter((r) => state?.includes(r.id))}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label={label}
                placeholder="add.."
              />
            )}
          />
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button color="default" onClick={() => setList(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={setFilter}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FilterSelect.propTypes = {
  setFilter: PropTypes.func.isRequired,
  openFilterList: PropTypes.bool.isRequired,
};

export default FilterSelect;
