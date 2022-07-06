/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';

import { Box } from '@material-ui/core';

import TopSection from './Display/TopSection';

import Navigation from '../../../components/Navigation';
import FilterList from './FilterList';
import AddEPModel from './AddEPModel';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { getFilter } from '../../../utils/checkFilters';
import { ALL_ICX_EPS } from '../../../apollo/queries/eps/icx-eps';
import EpListItem from './EpListItem';

const Eps = () => {
  const [search, setSearch] = useState('');

  const [openFilterList, setFilter] = useState(false);
  const [showAddEPModel, setAddEPModel] = useState(false);

  const { data } = useContext(UserInfoContext);
  const [allEPs, setEPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
    const isAlumni = data?.currentPerson.is_alumni;

    if (!data?.currentPerson.is_admin && FunctionName !== 'IM' && !isAlumni) {
      sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', FunctionName);
    }
    ALL_ICX_EPS().then((res) => {
      setEPs(res.data.data.allICXEPs);
      localStorage.setItem('eps', JSON.stringify(res.data.data.allICXEPs));
      setLoading(false);
    });
  }, [
    getFilter('FILTER_ICX_EPS_STATUS'),
    getFilter('FILTER_ICX_EPS_RESPONSIBLE'),
    getFilter('FILTER_ICX_EPS_SDGNumber'),
    getFilter('FILTER_ICX_EPS_PRODUCT'),
    getFilter('FILTER_ICX_EPS_CONTACTED'),
    getFilter('FILTER_ICX_EPS_INTERVIEWED'),
  ]);
  const eps = allEPs?.filter(
    (item) => item?.EPName?.toLowerCase().indexOf(search?.toLowerCase()) !== -1,
  );

  return (
    <>
      <TopSection search={search} setSearch={setSearch} setFilter={setFilter} />
      <Box mt="9rem" pt="1rem">
        <EpListItem eps={eps} loading={loading} />
      </Box>
      <FilterList openFilterList={openFilterList} setFilter={setFilter} />
      <AddEPModel
        setEPs={setEPs}
        open={showAddEPModel}
        onClose={() => setAddEPModel(false)}
      />
      <Navigation
        showAddEPModel={showAddEPModel}
        setAddEPModel={setAddEPModel}
        product={getFilter('FILTER_ICX_EPS_PRODUCT')}
        fixTopBar
        showAddEp
        withTopBar
        title="icx eps"
      />
    </>
  );
};

export default Eps;
