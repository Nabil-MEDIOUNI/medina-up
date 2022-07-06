import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AssignmentInd, Domain } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo';

import UserAvatar from '../../../../components/_common/Avatar';
import StatusLabel from '../../../../components/_common/Statuses';
import ProductBadge from '../../../../components/_common/Logos/ProductBadge';

import useStyles from '../styles';
import Pagination from '../Pagination';
import GetManagers from './GetManagers';

import { getSignUPDate } from '../../../../utils/dateTimeService';
import { getFilter } from '../../../../utils/checkFilters';
import SkeletonLoader from './SkeletonLoader';
import ChooseProduct from './ChooseProduct';
import EmptyList from '../../../../components/_common/EmptyList';
import LastDiv from '../../../../components/_common/LastDiv';
import ItemsBar from '../../../../components/_common/ItemsBar';
import WithSelect from '../../../../components/_common/Avatar/WithSelect';
import TopBar from '../../../../components/Navigation/TopBar';
import DrawerLeft from '../../../../components/Navigation/DrawerLeft';

import { DELETE_MULTIPLE_EPS } from '../../../../apollo/mutations/ep';
import AddEPModal from '../../../../components/AddActions/CreateEP';

const EpListItem = ({
  value, eps, getAllEPs, setEPs, loading, index, product, showBar,
}) => {
  const classes = useStyles();

  const [openDrawer, setDrawer] = React.useState(false);
  const [deleteMultipleEPs, { error }] = useMutation(DELETE_MULTIPLE_EPS);

  const [selectedEPS, setSelectEP] = useState([]);
  const [showAddEPModel, setAddEPModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [epsPerPage] = useState(15);
  // Get current eps
  const indexOfLastPost = currentPage * epsPerPage;
  const indexOfFirstPost = indexOfLastPost - epsPerPage;
  const currentEps = eps?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const selectEP = (ep) => {
    if (selectedEPS.find((id) => ep.id === id)) {
      const newList = selectedEPS.filter((id) => id !== ep.id);
      setSelectEP(newList);
    }
    if (!selectedEPS.find((id) => ep.id === id)) {
      setSelectEP((oldArray) => [...oldArray, ep.id]);
    }
  };

  const getSelectedEPs = (ep) => selectedEPS.find((epID) => epID === ep.id);

  return (
    <>
      {showBar && (
      <>
        <AddEPModal
          title="Add Exchange Participant"
          onClose={() => setAddEPModel(false)}
          open={showAddEPModel}
          setObjects={setEPs}
          refetchObjects={getAllEPs}
        />
        <TopBar
          product={product}
          showAddEp
          showAddEPModel={showAddEPModel}
          setAddEPModel={setAddEPModel}
          title="ogx eps"
          selectedObjects={selectedEPS}
          allObjects={eps}
          setObjects={setEPs}
          refetchObjects={getAllEPs}
          setSelectedObjects={setSelectEP}
          showBoxShadow
          setDrawer={() => setDrawer(!openDrawer)}
          deleteMultiple={deleteMultipleEPs}
          showAssignee
          error={error}
        />
        <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      </>
      )}
      <Box>
        {!loading || !navigator.onLine ? (
          <Box
            role="tabpanel"
            hidden={parseInt(value, 10) !== parseInt(index, 10)}
          >
            {parseInt(value, 10) === parseInt(index, 10) && (
              <>
                {getFilter('FILTER_EPS_PRODUCT') && (
                  <EmptyList page="EPs" data={currentEps} />
                )}
                {navigator.onLine && <ChooseProduct />}
                <ItemsBar paging={eps} />
                {(getFilter('FILTER_EPS_PRODUCT') || !navigator.onLine)
                  && currentEps
                  && currentEps.map((ep) => (
                    <Box
                      style={{
                        background: getSelectedEPs(ep) ? '#29abc41a' : 'white',
                      }}
                      className={classes.EPsList}
                      onClick={() => localStorage.setItem('EPID', ep.id)}
                      key={ep.id}
                    >
                      <Box display="flex" mx={2.5}>
                        <Box mr={2} onClick={() => selectEP(ep)}>
                          <WithSelect isSelected={getSelectedEPs(ep)}>
                            <UserAvatar size="38px" epName={ep.EPName} />
                          </WithSelect>
                        </Box>
                        <Link className={classes.link} to={`/ogx-eps/${ep.id}`}>
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
                              <Box display="flex" alignItems="center">
                                <Typography
                                  style={{ fontWeight: 600 }}
                                  variant="body2"
                                >
                                  {ep.EPName}
                                </Typography>
                                {ep.Is_sign_up === 'booth signup' && (
                                  <AssignmentInd
                                    style={{ marginLeft: 8, opacity: 0.6 }}
                                  />
                                )}
                              </Box>
                              <Box style={{ lineHeight: 0 }}>
                                <Typography
                                  style={{ fontSize: 10 }}
                                  variant="caption"
                                >
                                  {getSignUPDate(ep)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              mt={0.5}
                              width="100%"
                              justifyContent="space-between"
                            >
                              <Box display="flex" alignItems="center">
                                <ProductBadge
                                  product={ep.Product?.replace(/\s/g, '')}
                                />
                                <StatusLabel
                                  name={ep.Status?.toLowerCase()}
                                  type="person"
                                />
                                <Box className={classes.university}>
                                  <Domain className={classes.univIcon} />
                                  <Typography className={classes.univTypo}>
                                    {ep.EPUniversity.toUpperCase()}
                                  </Typography>
                                </Box>
                              </Box>
                              {navigator.onLine && <GetManagers ep={ep} />}
                            </Box>
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  ))}
                {eps?.length > 15 && (
                  <Pagination
                    dataPerPage={epsPerPage}
                    setPage={setCurrentPage}
                    changePage={currentPage}
                    totalPosts={eps?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                )}
                <LastDiv height="30px" />
              </>
            )}
          </Box>
        ) : (
          <>
            {[...Array(8)].map((i) => (
              <SkeletonLoader key={i} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

EpListItem.defaultProps = {
  index: 0,
  eps: [],
};

EpListItem.propTypes = {
  eps: PropTypes.array,
  index: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
};

export default EpListItem;
