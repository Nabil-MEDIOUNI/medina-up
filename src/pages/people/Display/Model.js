import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import useStyles from '../styles';

const PeopleModel = ({ setShowAddModal, setShowDeleteModal }) => {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        width="fit-content"
        height="38px"
        className={classes.model}
      >
        <Box display="flex" alignItems="center" mr={1}>
          <Button onClick={() => setShowAddModal(true)}>
            <CreateIcon className={classes.editIcon} />
            <Typography style={{ color: '#30C39E', fontSize: 14 }}>
              Edit
            </Typography>
          </Button>
        </Box>
        <>
          <Box className={classes.seperator} />
          <Box display="flex" alignItems="center" ml={1}>
            <Button onClick={() => setShowDeleteModal(true)}>
              <DeleteIcon className={classes.deleteIcon} />
              <Typography style={{ color: '#EB5A44', fontSize: 14 }}>
                Delete
              </Typography>
            </Button>
          </Box>
        </>
      </Box>
    </>
  );
};

export default PeopleModel;
