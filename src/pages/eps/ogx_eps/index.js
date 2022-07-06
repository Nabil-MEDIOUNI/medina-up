import React, { useState, useContext, useEffect } from 'react';

import { Box } from '@material-ui/core';

import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import Navigation from '../../../components/Navigation';
import FilterList from './FilterList';

import TopSection from './TopSection';
import AllEPs from './tabs/AllEps';
import EpsImanage from './tabs/EpsImanage';

const Eps = () => {
  const { data, loading } = useContext(UserInfoContext);

  const [search, setSearch] = useState('');

  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const isEB = data?.currentPerson.is_eb;
  const isAlumni = data?.currentPerson.is_alumni;
  const isMember = data?.currentPerson.is_member;
  const isTL = data?.currentPerson.is_tl;
  const canViewAll = ['IM', 'MKT', 'F&L'];

  const checkPositionForallEPs = () => {
    if (isTL) return true;
    if (isEB || canViewAll.includes(FunctionName) || isAlumni) {
      return true;
    }
    return false;
  };
  const checkPositionForEpsImanage = () => {
    if (isTL || isMember) return true;
    return false;
  };

  const [openFilterList, setFilter] = useState(false);
  const [value, setValue] = useState(0);

  const TlPosOrTmPos = checkPositionForEpsImanage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!loading) {
      if (isMember) {
        setValue(1);
      }
    }
  });

  return (
    <>
      <TopSection
        search={search}
        setSearch={setSearch}
        value={value}
        setValue={setValue}
        setFilter={setFilter}
        showFilter
      />
      <Box mt="9rem" pt="1rem">
        {checkPositionForallEPs() && (
          <AllEPs showBar search={search?.toLowerCase()} value={value} />
        )}
        {TlPosOrTmPos && (
          <EpsImanage search={search?.toLowerCase()} value={value} />
        )}
      </Box>
      <FilterList openFilterList={openFilterList} setFilter={setFilter} />
      <Navigation />
    </>
  );
};

export default Eps;
