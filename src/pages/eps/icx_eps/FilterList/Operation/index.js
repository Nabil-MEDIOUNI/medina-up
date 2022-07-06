import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import { useQuery } from 'react-apollo';
import useStyles from '../../styles';
import Divider from '../../../../../components/_common/Divider';
import SortBy from '../SortBy';
import { allStatuses } from '../../../../../constants/allStatuses';
import FilterBlock from '../FilterBlock';
import FilterHeader from '../Header';
import { getFilter } from '../../../../../utils/checkFilters';
import UserInfoContext from '../../../../../components/UserInfo/UserInfoContext';
import { ALL_MANAGERS } from '../../../../../apollo/queries/eps/ogx-eps';
import FilterSelect from '../../../../../components/_common/FilterSelect';
import SDGs from '../../../../../constants/SDGs';

const FilterOperation = ({ setFilter }) => {
  const classes = useStyles();
  const user = useContext(UserInfoContext);
  const product = sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT');

  const managers = useQuery(ALL_MANAGERS, {
    variables: {
      product,
    },
  });

  const isMember = user.data?.currentPerson.is_member;

  const getParsedFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const getChosenFilters = (filterName) => getParsedFilter(filterName).map((f, index) => (index + 1 !== getParsedFilter(filterName).length ? `${f}, ` : f));

  const filterCaption = (filterName) => (getFilter(filterName) ? getChosenFilters(filterName) : 'Any');

  const [openStatusList, setStatusList] = React.useState(false);
  const [openSDGList, setSDGList] = React.useState(false);
  const [openResponsiblerList, setResponsibleList] = React.useState(false);
  const [openContactedList, setContectedList] = React.useState(false);
  const [openInterviewList, setInterviewList] = React.useState(false);

  const [showClearBtn, setClearBtn] = React.useState(true);
  const interviewedConditions = [
    { name: 'TRUE', value: 'true' },
    { name: 'FALSE', value: 'false' },
  ];
  const contactedConditions = [
    { name: 'Email', value: 'email' },
    { name: 'Whatsapp', value: 'Whatsapp' },
  ];

  const clearFilters = () => {
    sessionStorage.removeItem('FILTER_ICX_EPS_STATUS');
    sessionStorage.removeItem('FILTER_ICX_EPS_RESPONSIBLE');
    sessionStorage.removeItem('FILTER_ICX_EPS_SDGNumber');
    sessionStorage.removeItem('FILTER_ICX_EPS_CONTACTED');
    sessionStorage.removeItem('FILTER_ICX_EPS_INTERVIEWED');
    setClearBtn(false);
  };

  const filterMenuItems = [
    {
      label: 'Statuses',
      caption: filterCaption('FILTER_ICX_EPS_STATUS'),
      click: () => setStatusList(true),
      canView: true,
    },
    {
      label: 'SDG',
      caption: filterCaption('FILTER_ICX_EPS_SDGNumber'),
      click: () => setSDGList(true),
      canView: product === 'IGV',
    },
    {
      label: 'Interviewed',
      caption: filterCaption('FILTER_ICX_EPS_INTERVIEWED'),
      click: () => setInterviewList(true),
      canView: true,
    },
    {
      label: 'Contacted',
      caption: filterCaption('FILTER_ICX_EPS_CONTACTED'),
      click: () => setContectedList(true),
      canView: true,
    },
    {
      label: 'Member Responsible',
      caption: filterCaption('FILTER_ICX_EPS_RESPONSIBLE'),
      click: () => setResponsibleList(true),
      canView: !isMember,
    },
  ];

  const filterBlock = [
    {
      list: allStatuses,
      open: openStatusList,
      setList: setStatusList,
      storageName: 'FILTER_ICX_EPS_STATUS',
    },
    {
      list: SDGs,
      open: openSDGList,
      setList: setSDGList,
      storageName: 'FILTER_ICX_EPS_SDGNumber',
    },
    {
      list: contactedConditions,
      open: openContactedList,
      setList: setContectedList,
      storageName: 'FILTER_ICX_EPS_CONTACTED',
    },
    {
      list: interviewedConditions,
      open: openInterviewList,
      setList: setInterviewList,
      storageName: 'FILTER_ICX_EPS_INTERVIEWED',
    },
  ];

  const filterSelect = [
    {
      title: 'Team Responsible',
      label: 'Responsibles',
      list: managers.data?.allManagers,
      open: openResponsiblerList,
      setList: setResponsibleList,
      storageName: 'FILTER_ICX_EPS_RESPONSIBLE',
      isEb: !isMember,
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
