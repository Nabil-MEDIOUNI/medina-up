import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Drawer } from '@material-ui/core';

import useStyles from '../styles';

import Home from '../../Route/Home';
import EPs from '../../Route/EP';
import Opportunities from '../../Route/Opportunities';
import Discover from '../../Route/Discover';
import People from '../../Route/People';

import About from '../../Route/About';
import HelpCenter from '../../Route/HelpCenter';
import Logout from '../../Route/Logout';
import DrawerHeader from './DrawerHeader';
import DrawerPages from './DrawerPages';
import UserInfoContext from '../../UserInfo/UserInfoContext';

const DrawerLeft = ({ open, onClose }) => {
  const classes = useStyles();
  const { data } = useContext(UserInfoContext);

  const FunctionName = data?.currentPerson?.current_positions.function.function_short_name;
  const nonOperationFunctions = ['PR', 'TM'];

  const pages1 = [Home, EPs, Opportunities, Discover, People];
  const pages2 = [About, HelpCenter, Logout];

  if (nonOperationFunctions.includes(FunctionName)) {
    pages1.splice(1, 2);
  }

  return (
    <div className={classes.root}>
      {open && (
        <div
          role="presentation"
          className={classes.background}
          onClick={onClose}
        />
      )}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        onClose={onClose}
        open={open}
        classes={{
          paper: classes.drawerPaper,
          root: classes.drawerPaper,
        }}
      >
        <DrawerHeader />

        <hr
          style={{
            border: '0.5px dashed #0000001f',
            width: '85%',
            margin: '0 auto',
          }}
        />

        <DrawerPages pages={pages1} />

        <hr
          style={{
            border: '0.5px dashed #0000001f',
            width: '85%',
            margin: '0 auto',
          }}
        />

        <DrawerPages pages={pages2} />
      </Drawer>
    </div>
  );
};

DrawerLeft.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DrawerLeft;
