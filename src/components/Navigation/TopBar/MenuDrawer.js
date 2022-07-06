import React from 'react';

import {
  Box,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';

import { Close } from '@material-ui/icons';
import useStyles from './styles';

const MenuDrawer = ({
  setDrawer,
  title,
  showBoxShadow,
  showSearch,
  selectedObjects,
  setSelectedObjects,
  allObjects,
}) => {
  const classes = useStyles({ showBoxShadow });
  const allObjectsIDS = allObjects?.map(({ id }) => id);
  console.log(selectedObjects);
  return (
    <Box
      className={classes.menuButton}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {selectedObjects?.length !== 0 && (
        <>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setSelectedObjects([])}>
              <Close style={{ color: '#29abc4', fontSize: 20 }} />
            </IconButton>
            <Typography style={{ color: '#29abc4', fontSize: 18 }}>
              {selectedObjects?.length}
            </Typography>
          </Box>
          {allObjectsIDS?.length !== selectedObjects?.length && (
          <Box ml={1.5} mt={0.25}>
            <Button onClick={() => setSelectedObjects(allObjectsIDS)}>Select All</Button>
          </Box>
          )}
        </>
      )}

      {selectedObjects?.length === 0 && !showSearch && (
      <>
        <IconButton
          onClick={setDrawer}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <img
            src="/static/icons/menu_icon.svg"
            className={classes.icon}
            alt=""
          />
        </IconButton>
        <Typography varient="body2" className={classes.title}>
          {title}
        </Typography>
      </>
      )}
    </Box>
  );
};

export default MenuDrawer;
