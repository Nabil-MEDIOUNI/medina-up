import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from 'react-apollo';

import Divider from '../../../../../components/_common/Divider';
import FilterSelect from '../../../../../components/_common/FilterSelect';
import SortBy from '../SortBy';
import FilterBlock from '../FilterBlock';
import FilterHeader from '../Header';
import useStyles from '../../styles';

import {
  ALL_MANAGERS,
  ALL_TEAMS_RESPONSIBLE,
} from '../../../../../apollo/queries/eps/ogx-eps';
import UserInfoContext from '../../../../../components/UserInfo/UserInfoContext';

import { getFilter } from '../../../../../utils/checkFilters';
import { filterBlock, filterMenuItems, filterSelect } from './filters';

const FilterOperation = ({ setFilter }) => {
  const classes = useStyles();

  const user = useContext(UserInfoContext);
  const product = sessionStorage.getItem('FILTER_EPS_PRODUCT');

  const { data: responsible } = useQuery(ALL_TEAMS_RESPONSIBLE, {
    variables: {
      product,
    },
  });
  const { data: managers } = useQuery(ALL_MANAGERS, {
    variables: {
      product,
    },
  });
  const isEB = user.data?.currentPerson.is_eb;
  const isMember = user.data?.currentPerson.is_member;

  const getParsedFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const getChosenFilters = (filterName) => getParsedFilter(filterName).map((f, index) => (index + 1 !== getParsedFilter(filterName).length ? `${f}, ` : f));

  const filterCaption = (filterName) => (getFilter(filterName) ? getChosenFilters(filterName) : 'Any');

  const [openStatusList, setStatusList] = React.useState(false);
  const [openSignupList, setSignupList] = React.useState(false);
  const [openLNSList, setLNSList] = React.useState(false);
  const [openUniversityList, setUniversityList] = React.useState(false);
  const [openGenderList, setGenderList] = React.useState(false);
  const [openResponsiblerList, setResponsibleList] = React.useState(false);
  const [openManagerList, setManagerList] = React.useState(false);

  const [showClearBtn, setClearBtn] = React.useState(true);

  const clearFilters = () => {
    sessionStorage.removeItem('FILTER_EPS_STATUS');
    sessionStorage.removeItem('FILTER_EPS_Is_sign_up');
    sessionStorage.removeItem('FILTER_EPS_LNS');
    sessionStorage.removeItem('FILTER_EPS_UNIVERSITY');
    sessionStorage.removeItem('FILTER_EPS_RESPONSIBLE');
    sessionStorage.removeItem('FILTER_EPS_MANAGER');
    sessionStorage.removeItem('FILTER_EPS_GENDER');
    setClearBtn(false);
  };

  return (
    <>
      <FilterHeader
        clear={clearFilters}
        setClearBtn={setClearBtn}
        showClearBtn={showClearBtn}
        setFilter={setFilter}
      />
      <Box className={classes.filterContent} my={3}>
        <SortBy />
        <Divider />
        {filterMenuItems(
          filterCaption,
          setStatusList,
          setSignupList,
          setLNSList,
          setUniversityList,
          setResponsibleList,
          setManagerList,
          setGenderList,
          isEB,
          isMember,
        ).map(
          (filter) => filter.canView && (
          <span key={filter.label}>
            <Box mx={2} mt={2} mb={1} width="85%" onClick={filter.click}>
              <Typography variant="caption" style={{ fontWeight: 700 }}>
                {filter.label}
              </Typography>
              <Typography className={classes.filterCaption}>
                {filter.caption}
              </Typography>
            </Box>
            <Divider />
          </span>
          ),
        )}
      </Box>

      {filterBlock(
        openStatusList,
        setStatusList,
        openSignupList,
        setSignupList,
        openLNSList,
        setLNSList,
        openGenderList,
        setGenderList,
        openUniversityList,
        setUniversityList,
      ).map((filter) => (
        <FilterBlock
          key={filter.storageName}
          open={filter.open}
          setList={filter.setList}
          storageName={filter.storageName}
          list={filter.list}
        />
      ))}

      {filterSelect(
        responsible,
        openResponsiblerList,
        setResponsibleList,
        managers,
        openManagerList,
        setManagerList,
      ).map((filter) => (
        <FilterSelect
          key={filter.storageName}
          title={filter.title}
          label={filter.label}
          open={filter.open}
          setList={filter.setList}
          storageName={filter.storageName}
          list={filter.list}
        />
      ))}
    </>
  );
};

FilterOperation.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterOperation;
