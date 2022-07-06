import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = {
  title: 'Logout',
  icon: () => <ExitToAppIcon style={{ fontSize: 17 }} />,
  link: '/logout',
};

export default Logout;
