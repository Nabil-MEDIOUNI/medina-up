/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Box } from '@material-ui/core';

import TopSection from './Display/TopSection';

import Navigation from '../../../components/Navigation';
import OpportunityListItem from './OpportunityListItem';
import { ALL_ICX_OPPORTUNITIES } from '../../../apollo/queries/opportunities';

const Opportunities = () => {
  const [search, setSearch] = useState('');

  const [showAddEPModel, setAddEPModel] = useState(false);

  const [allOpportunity, setOpportunity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ALL_ICX_OPPORTUNITIES().then((res) => {
      setOpportunity(res.data.data.allOpportunity.data);
      localStorage.setItem('opportunities', JSON.stringify(res.data.data.allOpportunity));
      setLoading(false);
    });
  }, []);

  const opportunities = allOpportunity?.filter(
    (item) => item?.title?.toLowerCase().indexOf(search?.toLowerCase()) !== -1,
  );

  return (
    <>
      <TopSection search={search} setSearch={setSearch} />
      <Box mt="9rem" pt="1rem">
        <OpportunityListItem opportunities={opportunities} loading={loading} />
      </Box>
      <Navigation
        showAddEPModel={showAddEPModel}
        setAddEPModel={setAddEPModel}
        fixTopBar
        showAddEp
        withTopBar
        title="ICX opportunities"
      />
    </>
  );
};

export default Opportunities;
