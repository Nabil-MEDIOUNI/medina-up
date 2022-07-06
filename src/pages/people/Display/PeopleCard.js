import React, { useState, useContext } from 'react';
import { useMutation } from 'react-apollo';

import { Box, Typography, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaceIcon from '@material-ui/icons/Place';
import ApartmentIcon from '@material-ui/icons/Apartment';

import Loading from '../../../components/_common/Loading';
import UserAvatar from '../../../components/_common/Avatar';

import {
  ALL_PEOPLE,
  GET_USER,
  ALL_TEAM_LEADERS,
} from '../../../apollo/queries/people';

import {
  UPDATE_PERSON,
  DELETE_PERSON,
  DELETE_MULTIPLE_PEOPLE,
} from '../../../apollo/mutations/person';

import useStyles from '../styles';
import PeopleModel from './Model';
import Operations from '../Operations';
import EmptyList from './EmptyList';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { getFilter } from '../../../utils/checkFilters';
import Pagination from '../../eps/ogx_eps/Pagination';
import WithSelect from '../../../components/_common/Avatar/WithSelect';
import TopBar from '../../../components/Navigation/TopBar';
import DrawerLeft from '../../../components/Navigation/DrawerLeft';

const PeopleCard = ({
  people,
  loading,
  search,
  setSearch,
  openFilterList,
  setFilter,
}) => {
  const classes = useStyles();
  const { data } = useContext(UserInfoContext);
  const isAdmin = data?.currentPerson.is_admin;
  const isLCP = (ppl) => ppl.is_lcp;
  const isAlumni = (ppl) => ppl.is_alumni;
  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const canViewAll = ['IM', 'TM'];
  const checkUser = () => {
    if (isAdmin) return 'All';
    return 'My';
  };

  const [showModel, setModel] = useState({ show: false, id: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPeople, setSelectPerson] = useState([]);
  const [openDrawer, setDrawer] = useState(false);
  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  const selectPerson = (person) => {
    if (selectedPeople.find((id) => person.id === id)) {
      const newList = selectedPeople.filter((id) => id !== person.id);
      setSelectPerson(newList);
    }
    if (!selectedPeople.find((id) => person.id === id)) {
      setSelectPerson((oldArray) => [...oldArray, person.id]);
    }
  };
  const getSelectedPeople = (person) => selectedPeople.find((personID) => personID === person.id);

  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(8);

  const object = people?.filter(
    (item) => item?.full_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1,
  );

  // Get current eps
  const indexOfLastPost = currentPage * peoplePerPage;
  const indexOfFirstPost = indexOfLastPost - peoplePerPage;
  const currentPeople = object?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUser = (id) => {
    setModel({
      show: !showModel.show,
      id,
    });
  };

  const [updatePerson, { error }] = useMutation(UPDATE_PERSON, {
    refetchQueries: [
      { query: GET_USER, variables: { id: showModel.id } },
      { query: ALL_TEAM_LEADERS },
    ],
  });

  const setSessionFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));

  const filters = {
    programm: getFilter('FILTER_PEOPLE_PROGRAMM')
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
  };

  const [deletePerson] = useMutation(DELETE_PERSON, {
    variables: { id: showModel && showModel.id },
    refetchQueries: [
      {
        query: ALL_PEOPLE,
        variables: {
          filters,
        },
      },
      {
        query: ALL_TEAM_LEADERS,
      },
    ],
  });

  const [deleteMultiplePeople, { error: deletePersonError }] = useMutation(
    DELETE_MULTIPLE_PEOPLE,
    {
      refetchQueries: [
        {
          query: ALL_PEOPLE,
          variables: {
            filters,
          },
        },
      ],
    },
  );

  return (
    <>
      <TopBar
        deleteMultiple={deleteMultiplePeople}
        error={deletePersonError}
        title={`${checkUser()} People`}
        placeholder="people"
        selectedObjects={selectedPeople}
        allObjects={people}
        setSelectedObjects={setSelectPerson}
        showBoxShadow
        setDrawer={() => setDrawer(!openDrawer)}
        withSearch
        showFilter
        search={search}
        setSearch={setSearch}
        UpdateSearch={UpdateSearch}
        showModelFilter={openFilterList}
        setFilter={setFilter}
      />
      <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      {!loading ? (
        <Box pt={10} pb={2}>
          {currentPeople?.map((ppl) => (
            <Box
              key={ppl.id}
              className={classes.card}
              style={{
                background: getSelectedPeople(ppl) ? '#29abc41a' : 'white',
              }}
            >
              <Box display="flex">
                {isAdmin ? (
                  <Box ml={3} mr={1} onClick={() => selectPerson(ppl)}>
                    <WithSelect isSelected={getSelectedPeople(ppl)}>
                      <UserAvatar size="40px" src={ppl.cover_photo.url} />
                    </WithSelect>
                  </Box>
                ) : (
                  <Box ml={3} mr={1}>
                    <UserAvatar size="40px" src={ppl.cover_photo.url} />
                  </Box>
                )}
                <Box className={classes.wrap}>
                  <Typography className={classes.surname || ' -'}>
                    {ppl.full_name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    {!isLCP(ppl) && !isAlumni(ppl) && (
                      <Box
                        display="flex"
                        alignItems="center"
                        mr={1.5}
                        width="auto"
                      >
                        <ApartmentIcon className={classes.pplDtlIcon} />
                        <Typography className={classes.pplDtl}>
                          {ppl.current_positions.function.function_short_name?.replace(
                            '_',
                            ' ',
                          ) || '-'}
                        </Typography>
                      </Box>
                    )}
                    <Box display="flex" alignItems="center" width="auto">
                      <PlaceIcon className={classes.pplDtlIcon} />
                      <Typography className={classes.pplDtl}>
                        {ppl.current_positions.position_name || '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                {isAdmin || canViewAll.includes(FunctionName) ? (
                  <IconButton onClick={() => getUser(ppl.id)}>
                    <MoreVertIcon className={classes.morebtn} />
                  </IconButton>
                ) : (
                  <Box p="0px 20px" />
                )}
              </Box>
              {showModel.show && showModel.id === ppl.id && (
                <PeopleModel
                  setShowDeleteModal={setShowDeleteModal}
                  setShowAddModal={setShowAddModal}
                  id={ppl.id}
                />
              )}
            </Box>
          ))}
          {object.length > 8 && (
            <Pagination
              dataPerPage={peoplePerPage}
              setPage={setCurrentPage}
              changePage={currentPage}
              totalPosts={object.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </Box>
      ) : (
        <div className="big_loading">
          <Loading height="45px" />
        </div>
      )}
      <Operations
        showDeleteModal={showDeleteModal}
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
        showModel={showModel}
        updatePerson={updatePerson}
        updateError={error}
        setModel={setModel}
        setShowDeleteModal={setShowDeleteModal}
        deletePerson={deletePerson}
      />
      {object?.length === 0 && <EmptyList />}
    </>
  );
};

export default PeopleCard;
