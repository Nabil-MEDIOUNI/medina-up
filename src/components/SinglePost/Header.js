import React from 'react';
import PropTypes from 'prop-types';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { Box, makeStyles, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  moreIcon: {
    color: '#525252',
    fontSize: 24,
  },
  header: {
    padding: theme.spacing(1, 0, 0.75, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 10px #e0e0e0',
    width: '100%',
  },
}));

const Header = ({ route }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box ml={0.5}>
        <Link to={route}>
          <IconButton>
            <ArrowBackIcon className={classes.moreIcon} />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Header;
