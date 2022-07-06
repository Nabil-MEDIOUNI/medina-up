import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

import { Typography } from '@material-ui/core';
import statusesColor from '../../../utils/static/statusesColor';
import statuses from '../../../constants/allStatuses';

const useStyles = makeStyles((theme) => ({
  root: {
    color: ({ color }) => color,
    backgroundColor: ({ backgroundColor }) => backgroundColor || theme.palette.background.default,
    textTransform: 'uppercase',
    userSelect: 'none',
    borderRadius: 2,
    whiteSpace: 'nowrap',
    display: 'inline-block',
    lineHeight: '100%',
    padding: theme.spacing(0.5, 1),
    fontSize: ({ fontSize }) => fontSize || 10,
  },
  'label-md': {
    padding: theme.spacing(0.75, 1.25),
  },
}));

const StatusLabel = ({
  name, type, children, fontSize,
}) => {
  let props = { fontSize };
  let status = {};

  status = statuses[type][name];
  props = { ...props, ...statusesColor[name] };

  const classes = useStyles(props);
  const displayName = status ? status.displayName : 'No status';
  return (
    <Typography className={classes.root} unselectable="on">
      {displayName}
      {children()}
    </Typography>
  );
};

StatusLabel.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['person', 'opportunity']).isRequired,
  children: PropTypes.func,
  fontSize: PropTypes.number,
};

StatusLabel.defaultProps = {
  children: () => null,
  name: 'Not found',
  fontSize: undefined,
};

export default StatusLabel;
