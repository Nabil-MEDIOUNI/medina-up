import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ArrowForwardIos } from '@material-ui/icons';
import useStyles from './styles';

const Pagination = ({
  dataPerPage, totalPosts, paginate, currentPage, setPage, changePage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const classes = useStyles();

  return (
    <Box my={4} display="flex" justifyContent="center">
      <Box display="flex" alignItems="end" justifyContent="center" width="80%">

        <IconButton
          disabled={changePage === 1}
          onClick={() => setPage(changePage - 1)}
        >
          <ArrowForwardIos style={{ transform: 'rotate(180deg)' }} />
        </IconButton>

        <ul className={classes.pagination}>
          {pageNumbers.map((number) => (
            <li key={number} className={classes.page_item}>
              <button
                style={{
                  color: currentPage === number ? 'white' : 'black',
                  backgroundColor: currentPage === number ? 'rgb(46, 191, 162)' : 'white',
                }}
                type="button"
                onClick={() => paginate(number)}
                className={classes.page_link}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>

        <IconButton
          disabled={changePage === pageNumbers.length}
          onClick={() => setPage(changePage + 1)}
        >
          <ArrowForwardIos />
        </IconButton>

      </Box>
    </Box>
  );
};

Pagination.defaultProps = {
  totalPosts: 0,
};

Pagination.propTypes = {
  dataPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.number.isRequired,
};

export default Pagination;
