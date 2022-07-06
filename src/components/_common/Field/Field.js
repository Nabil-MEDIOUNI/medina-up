import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: 'none',
    lineHeight: 'normal',
    paddingBottom: theme.spacing(0.75),
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.35)',
    wordWrap: 'break-word',
    marginTop: 8,
    maxWidth: '90%',
  },
  data: {
    color: '#00000099',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.22px',
    wordWrap: 'break-word',
    maxWidth: '95%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: ({ whiteSpace }) => (whiteSpace ? 'nowrap' : 'inherit'),
  },
  box: {
    display: 'grid',
    marginBottom: theme.spacing(1),
  },
}));

const Field = ({
  text, data, whiteSpace,
}) => {
  const classes = useStyles({ whiteSpace });
  return (
    <Box className={classes.box}>
      <Typography className={classes.title}>{text}</Typography>
      <Typography className={classes.data}>
        {data}
      </Typography>
    </Box>
  );
};

Field.defaultProps = {
  whiteSpace: true,
};

Field.propTypes = {
  whiteSpace: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default Field;
