import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { useMutation, useQuery } from 'react-apollo';

import {
  ALL_NOTIFICATIONS,
  GET_UNSEEN_NOTIFICATIONS,
} from '../../apollo/queries/notification';
import {
  SEE_NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_MULTIPLE_NOTIFICATIONS,
  SEE_MULTIPLE_NOTIFICATIONS,
} from '../../apollo/mutations/notification';

import EarliestNotifications from './SwitchNotifications/SwitchByDate/EarlierNotifications';
import RecentNotifications from './SwitchNotifications/SwitchByDate/RecentNotifications';
import EmptyList from '../../components/_common/EmptyList';

import TopBar from '../../components/Navigation/TopBar';
import DrawerLeft from '../../components/Navigation/DrawerLeft';
import Navigation from '../../components/Navigation';

const NotificationList = () => {
  const { data, loading } = useQuery(ALL_NOTIFICATIONS);

  const [selectedNotifications, setSelectNotification] = useState([]);
  const [openDrawer, setDrawer] = useState(false);

  const [
    deleteMultipleNotifications,
    { error: deleteNotificationError },
  ] = useMutation(DELETE_MULTIPLE_NOTIFICATIONS, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  const [
    seeMultipleNotifications,
    { error: seeNotificationError },
  ] = useMutation(SEE_MULTIPLE_NOTIFICATIONS, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  const selectNotification = (person) => {
    if (selectedNotifications.find((id) => person.id === id)) {
      const newList = selectedNotifications.filter((id) => id !== person.id);
      setSelectNotification(newList);
    }
    if (!selectedNotifications.find((id) => person.id === id)) {
      setSelectNotification((oldArray) => [...oldArray, person.id]);
    }
  };

  const getSelectedNotifications = (person) => selectedNotifications.find((personID) => personID === person.id);

  const [seeNotification] = useMutation(SEE_NOTIFICATION, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="101vh"
        zIndex={-1}
      />
      <EmptyList page="notifications" data={data?.allNotifications} />
      <RecentNotifications
        data={data}
        loading={loading}
        seeNotification={seeNotification}
        deleteNotification={deleteNotification}
        getSelectedNotifications={getSelectedNotifications}
        selectNotification={selectNotification}
      />
      <EarliestNotifications
        data={data}
        loading={loading}
        seeNotification={seeNotification}
        deleteNotification={deleteNotification}
        getSelectedNotifications={getSelectedNotifications}
        selectNotification={selectNotification}
      />
      <TopBar
        deleteMultiple={deleteMultipleNotifications}
        seeMultiple={seeMultipleNotifications}
        showEye
        error={deleteNotificationError || seeNotificationError}
        title="notifications"
        selectedObjects={selectedNotifications}
        allObjects={data?.allNotifications}
        setSelectedObjects={setSelectNotification}
        showBoxShadow
        setDrawer={() => setDrawer(!openDrawer)}
      />
      <DrawerLeft open={openDrawer} onClose={() => setDrawer(false)} />
      <Navigation />
    </>
  );
};

export default NotificationList;
