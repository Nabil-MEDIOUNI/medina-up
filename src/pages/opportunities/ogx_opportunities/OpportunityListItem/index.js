import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DomainIcon from '@material-ui/icons/Domain';

import { Link } from 'react-router-dom';

import StatusLabel from '../../../../components/_common/Statuses';

import useStyles from '../styles';

import EmptyList from '../../../../components/_common/EmptyList';
import LastDiv from '../../../../components/_common/LastDiv';
import ItemsBar from '../../../../components/_common/ItemsBar';
import ProductBadge from '../../../../components/_common/Logos/ProductBadge';
import SkeletonLoader from '../../../eps/ogx_eps/EpListItem/SkeletonLoader';

const OpportunityListItem = ({ opportunities, loading }) => {
  const classes = useStyles();
  return (
    <Box>
      {!loading || !navigator.onLine ? (
        <Box role="tabpanel">
          <>
            <EmptyList page="Opportunities" data={opportunities} />
            <ItemsBar paging={opportunities} />
            {opportunities.map((opportunity) => (
              <Box
                className={classes.EPsList}
                onClick={() => localStorage.setItem('OpportunityID', opportunity.EPName)}
              >
                <Link
                  className={classes.link}
                  to={`/ogx-opportunities/${opportunity.id}`}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    ml={1}
                    mr={2}
                    overflow="hidden"
                  >
                    {navigator.onLine && (
                    <Box mx={2}>
                      <ProductBadge
                        product={opportunity.programme?.short_name_display}
                        height="fit-content"
                        width="100%"
                        size="30px"
                        margin="auto"
                        padding="4px 2px"
                      />
                    </Box>
                    )}
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="self-start"
                      flexDirection="column"
                      mt={-0.5}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            style={{ fontWeight: 600, whiteSpace: 'nowrap' }}
                            variant="body2"
                          >
                            {opportunity.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Box mt={1} display="flex" alignItems="center">
                        <StatusLabel
                          name={opportunity.status?.toLowerCase()}
                          type="opportunity"
                        />
                        <Box
                          whiteSpace="nowrap"
                          className={classes.university}
                        >
                          <DomainIcon className={classes.univIcon} />
                          <Typography className={classes.univTypo}>
                            {opportunity.organisation?.name || '-'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
            <LastDiv />
          </>
        </Box>
      ) : (
        <>
          {[...Array(8)].map(() => (
            <SkeletonLoader />
          ))}
        </>
      )}
    </Box>
  );
};

OpportunityListItem.defaultProps = {
  opportunities: [],
};

OpportunityListItem.propTypes = {
  opportunities: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default OpportunityListItem;
