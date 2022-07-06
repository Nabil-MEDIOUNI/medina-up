import React, { useState } from 'react';

import { useQuery } from 'react-apollo';

import { Box } from '@material-ui/core';
import Navigation from '../../components/Navigation';

import { ALL_PEOPLE } from '../../apollo/queries/people';
import FilterList from './FilterList';
import { getFilter } from '../../utils/checkFilters';
import PeopleCard from './Display/PeopleCard';

const People = () => {
  const setSessionFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const filters = {
    product: getFilter('FILTER_PEOPLE_PROGRAMM')
      ? setSessionFilter('FILTER_PEOPLE_PROGRAMM')
      : undefined,
    gender: getFilter('FILTER_PEOPLE_GENDER')
      ? setSessionFilter('FILTER_PEOPLE_GENDER')
      : undefined,
    team_responsible: getFilter('FILTER_PEOPLE_LEADERS')
      ? setSessionFilter('FILTER_PEOPLE_LEADERS')
      : undefined,
    current_positions: getFilter('FILTER_PEOPLE_POSITIONS')
      ? setSessionFilter('FILTER_PEOPLE_POSITIONS')
      : undefined,
    function: getFilter('FILTER_PEOPLE_FUNCTION')
      ? setSessionFilter('FILTER_PEOPLE_FUNCTION')
      : undefined,
  };

  const { data, loading } = useQuery(ALL_PEOPLE, {
    variables: {
      filters,
    },
  });

  const [search, setSearch] = useState('');
  const [openFilterList, setFilter] = useState(false);

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="101vh"
        zIndex={-1}
      />
      <PeopleCard
        people={data?.allPeople}
        loading={loading}
        search={search?.toLowerCase()}
        setSearch={setSearch}
        showModelFilter={openFilterList}
        setFilter={setFilter}
      />
      {openFilterList && (
        <FilterList
          openFilterList={openFilterList}
          setFilter={setFilter}
        />
      )}
      <Navigation />
    </>
  );
};

export default People;
