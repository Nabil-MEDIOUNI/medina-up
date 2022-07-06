import React, { useState, useEffect } from 'react';

import AddUserModal from '../AddActions/CreateUser';
import AddActions from '../AddActions';
import DrawerLeft from './DrawerLeft';
import TopBar from './TopBar';
import NavigationBar from '../Navigation/NavigationBar';
import pageOffset from '../../utils/others/onScroll';
import CreateVote from '../../pages/vote/CreateVote';
import CreatePost from '../AddActions/CreatePost';
import AddEPModal from '../AddActions/CreateEP';

const Navigation = ({
  placeholder,
  title,
  product,
  search,
  setSearch,
  showFilter,
  setFilter,
  showModelFilter,
  showBoxShadow,
  withTopBar,
  withSearch,
  fixTopBar,
  showAddEp,
  fixBar,
  showAddEPModel,
  setAddEPModel,
  noAddActions,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [openPostModel, setPostModel] = useState(false);
  const [showEPModal, setEPModal] = useState(false);

  const [openDrawer, setDrawer] = useState(false);
  const [showBar, setShowBar] = useState(true);

  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  useEffect(() => {
    pageOffset(setShowBar);
  }, []);

  return (
    <>
      {withTopBar && (
        <TopBar
          placeholder={placeholder}
          UpdateSearch={UpdateSearch}
          setSearch={setSearch}
          search={search}
          withSearch={withSearch}
          title={title}
          showAddEPModel={showAddEPModel}
          setAddEPModel={setAddEPModel}
          showAddEp={showAddEp}
          showBar={fixTopBar || showBar}
          showBoxShadow={showBoxShadow}
          showFilter={showFilter}
          showModelFilter={showModelFilter}
          setFilter={setFilter}
          setDrawer={() => setDrawer(!openDrawer)}
          selectedObjects={[]}
          product={product}
        />
      )}
      <NavigationBar showBar={fixBar || showBar} />
      <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      <AddUserModal
        title="Add Account"
        onClose={() => setShowAddModal(false)}
        open={showAddModal}
      />
      <AddEPModal
        title="Add Exchange Participant"
        onClose={() => setEPModal(false)}
        open={showEPModal}
      />
      <CreateVote
        openVoteModel={showPollModal}
        setVoteModel={setShowPollModal}
      />
      <CreatePost headerTitle="Post" setPostModel={setPostModel} openPostModel={openPostModel} />
      {(fixBar || showBar) && !noAddActions && (
        <AddActions
          addPost={() => setPostModel(true)}
          addEP={() => setEPModal(true)}
          Poll={() => setShowPollModal(true)}
          addUser={() => setShowAddModal(true)}
        />
      )}
    </>
  );
};

export default Navigation;
