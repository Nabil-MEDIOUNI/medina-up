import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from '../../pages/eps/ogx_eps/styles';

const EmptyList = ({ data, page }) => {
  const classes = useStyles();

  return (
    <>
      {data?.length === 0 && (
      <Box
        position="fixed"
        top="50%"
        left="50%"
        style={{ transform: 'translate(-50%, -50%)' }}
        width="100%"
        textAlign="center"
      >
        <Box>
          <img width="140px" src="/static/img/list.png" alt="" />
        </Box>
        <Typography>
          Couldn't find
          {' '}
          {page}
        </Typography>
        <Typography className={classes.emptyListTypo}>
          Contact Biggie if you're facing a trouble
        </Typography>
      </Box>
      )}
    </>
  );
};

EmptyList.propTypes = {
  page: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default EmptyList;
