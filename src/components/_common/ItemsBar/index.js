import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const styles = (theme) => ({
  typo: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.87)',
    opacity: 0.85,
    letterSpacing: 0.42,
  },
  arrow_icon: {
    color: 'rgba(0, 0, 0, 0.38)',
    fontSize: 14,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.25),
  },
});

const ItemsBar = ({ paging, classes }) => (
  <>
    {paging?.length > 0 && (
      <Box display="flex" m="16px auto" p="6px 0px" width="85%">
        <Box display="flex" mr={1}>
          <Box mr={0.5}>
            <Typography className={classes.typo}>{paging.length}</Typography>
          </Box>
          <Typography className={classes.typo}>found</Typography>
        </Box>

        <Box display="flex">
          <ArrowDownwardIcon className={classes.arrow_icon} />
          <Typography className={classes.typo}>By date created</Typography>
        </Box>
      </Box>
    )}
  </>
);

ItemsBar.propTypes = {
  classes: PropTypes.object.isRequired,
  paging: PropTypes.array.isRequired,
};

export default withStyles(styles)(ItemsBar);
