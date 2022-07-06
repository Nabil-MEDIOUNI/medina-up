import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Field from './Field';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1),
    marginBottom: ({ marginBottom }) => (marginBottom ? theme.spacing(1) : theme.spacing(0)),
    width: '-webkit-fill-available',
  },
  iconButton: {
    backgroundColor: '#0000001A',
    marginTop: 10,
  },
}));

const AlignedField = ({
  text,
  data,
  icon,
  showIcon,
  marginBottom,
  whiteSpace,
  onClick,
  canCopy,
  copyAction,
}) => {
  const classes = useStyles({ marginBottom });
  return (
    <Box display="flex" alignItems="flex-end" flexDirection="row" className={classes.box}>
      <Box flex="0 90%">
        <Field
          whiteSpace={whiteSpace}
          text={text}
          data={data || '-'}
          onClick={canCopy ? copyAction : null}
        />
      </Box>
      <Box flex="0 15%">
        {showIcon && data && (
          <IconButton onClick={() => onClick()} className={classes.iconButton}>
            {icon}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

AlignedField.propTypes = {
  showIcon: PropTypes.bool,
  marginBottom: PropTypes.bool,
  text: PropTypes.string.isRequired,
  whiteSpace: PropTypes.bool,
  canCopy: PropTypes.bool,
  copyAction: PropTypes.func,
  icon: PropTypes.element,
};

AlignedField.defaultProps = {
  whiteSpace: true,
  showIcon: false,
  marginBottom: true,
  canCopy: false,
  copyAction: null,
  icon: undefined,
};

export default AlignedField;
