import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import { useQuery } from 'react-apollo';
import useStyles from '../styles';
import Divider from '../../../../components/_common/Divider';
import SortBy from '../SortBy';
import FilterBlock from '../FilterBlock';
import genders from '../../../../constants/genders';
import FilterHeader from '../Header';
import FilterSelect from '../../../../components/_common/FilterSelect';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';
import { userFunctionTitles, userRoles } from '../../../../constants/users';
import { ALL_TEAM_LEADERS } from '../../../../apollo/queries/people';
import { getFilter } from '../../../../utils/checkFilters';

const FilterOperation = ({ setFilter }) => {
  const classes = useStyles();

  const user = useContext(UserInfoContext);

  const { data } = useQuery(ALL_TEAM_LEADERS);

  const isAdmin = user.data?.currentPerson.is_admin;
  const ebPosition = user.data?.currentPerson.is_eb;
  const isAlumni = user.data?.currentPerson.is_alumni;

  const getParsedFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const getChosenFilters = (filterName) => getParsedFilter(filterName).map(
    (f, index) => (index + 1 !== getParsedFilter(filterName).length ? `${f}, ` : f),
  );

  const filterCaption = (filterName) => (getFilter(filterName) ? getChosenFilters(filterName) : 'Any');

  const [openFunctionList, setFunctionList] = React.useState(false);
  const [openGenderList, setGenderList] = React.useState(false);
  const [openLeadersList, setLeadersList] = React.useState(false);
  const [openPositionsList, setPositionsList] = React.useState(false);

  const [showClearBtn, setClearBtn] = React.useState(true);

  const clearFilters = () => {
    sessionStorage.clear();
    setClearBtn(false);
  };

  const filterMenuItems = [
    {
      label: 'Function',
      caption: filterCaption('FILTER_PEOPLE_FUNCTION'),
      click: () => setFunctionList(true),
      canView: isAdmin || isAlumni,
    },
    {
      label: 'Position',
      caption: filterCaption('FILTER_PEOPLE_POSITIONS'),
      click: () => setPositionsList(true),
      canView: ebPosition || isAlumni,
    },
    {
      label: "Member's Leader",
      caption: filterCaption('FILTER_PEOPLE_LEADERS'),
      click: () => setLeadersList(true),
      canView: ebPosition,
    },
    {
      label: 'Gender',
      caption: filterCaption('FILTER_PEOPLE_GENDER'),
      click: () => setGenderList(true),
      canView: true,
    },
  ];

  const filterBlock = [
    {
      list: userFunctionTitles,
      open: openFunctionList,
      setList: setFunctionList,
      storageName: 'FILTER_PEOPLE_FUNCTION',
    },
    {
      list: genders,
      open: openGenderList,
      setList: setGenderList,
      storageName: 'FILTER_PEOPLE_GENDER',
    },
    {
      list: userRoles,
      open: openPositionsList,
      setList: setPositionsList,
      storageName: 'FILTER_PEOPLE_POSITIONS',
    },
  ];

  const filterSelect = [
    {
      title: 'Team Leaders',
      label: 'Responsibles',
      list: data?.allTeamLeaders,
      open: openLeadersList,
      setList: setLeadersList,
      storageName: 'FILTER_PEOPLE_LEADERS',
      isEb: ebPosition || isAlumni,
    },
  ];

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
        {filterMenuItems.map(
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
      {filterBlock.map((filter) => (
        <FilterBlock
          key={filter.storageName}
          open={filter.open}
          setList={filter.setList}
          storageName={filter.storageName}
          list={filter.list}
        />
      ))}
      {filterSelect.map((filter) => (
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
