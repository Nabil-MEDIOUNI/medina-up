import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DomainIcon from '@material-ui/icons/Domain';

import { Link } from 'react-router-dom';

import UserAvatar from '../../../../components/_common/Avatar';
import StatusLabel from '../../../../components/_common/Statuses';
import ProductBadge from '../../../../components/_common/Logos/ProductBadge';

import useStyles from '../styles';
import Pagination from '../Display/Pagination';

import { getFilter } from '../../../../utils/checkFilters';
import ChooseProduct from './ChooseProduct';
import EmptyList from '../../../../components/_common/EmptyList';
import LastDiv from '../../../../components/_common/LastDiv';
import ItemsBar from '../../../../components/_common/ItemsBar';
import SkeletonLoader from '../../ogx_eps/EpListItem/SkeletonLoader';

const EpListItem = ({ eps, loading }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [epsPerPage] = useState(15);
  // Get current eps
  const indexOfLastPost = currentPage * epsPerPage;
  const indexOfFirstPost = indexOfLastPost - epsPerPage;
  const currentEps = eps?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
      {(!loading || !navigator.onLine) ? (
        <Box
          role="tabpanel"
        >
          <>
            {getFilter('FILTER_ICX_EPS_PRODUCT') && <EmptyList page="EPs" data={currentEps} />}
            {navigator.onLine && <ChooseProduct />}
            <ItemsBar paging={eps} />
            {(getFilter('FILTER_ICX_EPS_PRODUCT') || !navigator.onLine) && currentEps && currentEps.map((ep) => (
              <Box
                className={classes.EPsList}
                onClick={() => localStorage.setItem('EPID', ep.EPName)}
              >
                <Link
                  className={classes.link}
                  to={`/icx-eps/${ep.EPName}`}
                >
                  <Box display="flex" ml={1} mr={2} overflow="hidden">
                    {navigator.onLine && (
                    <Box mx={2}>
                      <UserAvatar size="38px" epName={ep.EPName} />
                    </Box>
                    )}
                    <Box width="100%" display="flex" alignItems="self-start" flexDirection="column" mt={-0.5}>
                      <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <Box>
                          <Typography style={{ fontWeight: 600, whiteSpace: 'nowrap' }} variant="body2">{ep.EPName}</Typography>
                        </Box>
                      </Box>
                      <Box mt={1} display="flex" alignItems="center">
                        <ProductBadge product={sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT')} />
                        <StatusLabel name={ep.Status?.toLowerCase()} type="person" />
                        <Box whiteSpace="nowrap" className={classes.university}>
                          <DomainIcon className={classes.univIcon} />
                          <Typography className={classes.univTypo}>
                            {ep.ProjectName || '-'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
            {eps?.length > 15 && (
            <Pagination
              dataPerPage={epsPerPage}
              setPage={setCurrentPage}
              changePage={currentPage}
              totalPosts={eps && eps.length}
              paginate={paginate}
              currentPage={currentPage}
            />
            )}
            <LastDiv />
          </>
        </Box>
      ) : (
        <>
          {[...Array(8)].map(() => <SkeletonLoader />)}
        </>
      )}
    </Box>
  );
};

EpListItem.defaultProps = {
  eps: [],
};

EpListItem.propTypes = {
  eps: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default EpListItem;
