import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import generateProductSVGRout from '../../../utils/generateProductSVGRout';

const useStyles = makeStyles((theme) => ({
  badge: {
    borderRadius: theme.spacing(0.25),
    marginRight: theme.spacing(0.75),
    display: 'inline-flex',
    alignItems: 'center',
    height: ({ height }) => height || theme.spacing(1.75),
    width: ({ width }) => width,
    backgroundColor: ({ programName }) => theme.palette.products[programName],
  },
  avatar: {
    width: ({ size }) => size || theme.spacing(1.25),
    height: ({ size }) => size || theme.spacing(1.25),
    margin: ({ margin }) => margin || theme.spacing(0.25, 0.25, 0.25, 0.25),
    padding: ({ padding }) => padding,
  },
  text: {
    color: 'white',
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
}));

const ProductBadge = ({
  product, size, height, width, margin, padding,
}) => {
  const programName = product || '-';
  const classes = useStyles({
    programName, size, height, width, margin, padding,
  });
  return (
    <span className={classes.badge}>
      <img
        alt=""
        src={generateProductSVGRout(product) || '-'}
        className={classes.avatar}
      />
    </span>
  );
};

ProductBadge.propTypes = {
  product: PropTypes.string,
};

ProductBadge.defaultProps = {
  product: '',
};

export default ProductBadge;
