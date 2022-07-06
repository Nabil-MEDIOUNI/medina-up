import React, { useContext } from 'react';

import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@material-ui/core';
import { Search, Clear } from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';

import useStyles from '../../ogx_eps/styles';
import SwitchProduct from './SwitchProduct';
import GrayBackground from '../../../../components/_common/GrayBackground';

const TopSection = ({ search, setSearch, setFilter }) => {
  const product = 'gv';

  const classes = useStyles({ product });
  const { data } = useContext(UserInfoContext);

  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const isAlumni = data?.currentPerson.is_alumni;
  const isAdmin = data?.currentPerson.is_admin;
  const canViewAll = ['IM', 'MKT', 'F&L'];

  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };
  const slicedSearch = search;

  return (
    <>
      <GrayBackground />
      <Box
        display="flex"
        alignItems="center"
        position="fixed"
        width="100%"
        mt="-6rem"
        pb="0rem"
        bgcolor="#f7f7f7"
        zIndex={8}
      >
        <Box
          display="flex"
          margin="0 auto"
          mt="1.5rem"
          flexDirection="column"
          width="100%"
        >
          <Box className={classes.searchContatiner}>
            <Search className={classes.searchIcon} />
            <input
              className={classes.searchInput}
              value={slicedSearch}
              onChange={(e) => UpdateSearch(e)}
              placeholder="Search EP by name"
            />
            {search?.length > 1 && (
              <IconButton
                style={{ position: 'absolute', right: '2.5rem' }}
                onClick={() => setSearch('')}
              >
                <Clear style={{ fontSize: 17 }} />
              </IconButton>
            )}
          </Box>
          <Box mx="auto" mt={1} display="flex" alignItems="center" width="80%">
            <RadioGroup style={{ display: 'block' }} name="tab" value={0}>
              <FormControlLabel
                value={0}
                style={{ fontSize: 14 }}
                control={<Radio color="primary" />}
                label="All"
              />
            </RadioGroup>
            {navigator.onLine
              && (isAdmin || canViewAll.includes(FunctionName) || isAlumni) && (
                <SwitchProduct setFilter={setFilter} />
            )}
            <Box flexGrow="1" />
            <IconButton onClick={() => setFilter(true)}>
              <FilterListIcon style={{ color: '#29abc4', fontSize: 22 }} />
            </IconButton>
          </Box>
          <Box height="2px" width="80%" margin="0 auto" bgcolor="#dfdede" />
        </Box>
      </Box>
    </>
  );
};

export default TopSection;
