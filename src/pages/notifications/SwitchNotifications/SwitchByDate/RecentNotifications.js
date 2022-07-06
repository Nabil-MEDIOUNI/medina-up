import React from 'react';
import { Box, Typography } from '@material-ui/core';

import SkeletonLoader from '../../SkeletonLoader';
import SwitchNotifications from '..';

const RecentNotifications = ({
  data,
  seeNotification,
  deleteNotification,
  loading,
  getSelectedNotifications,
  selectNotification,
}) => {
  const now = new Date();
  const getDay = (createdAt) => Math.abs(now.getDate() - new Date(parseInt(createdAt, 10)).getDate());
  const getMonth = (createdAt) => Math.abs(now.getMonth() - new Date(parseInt(createdAt, 10)).getMonth());
  const getFullYear = (createdAt) => Math.abs(
    now.getFullYear() - new Date(parseInt(createdAt, 10)).getFullYear(),
  );

  const recentNotifications = data?.allNotifications.filter(
    ({ createdAt }) => getFullYear(createdAt) < 1
      && getDay(createdAt) < 1
      && getMonth(createdAt) === 0,
  );
  const earliestNotification = data?.allNotifications.filter(
    ({ createdAt }) => getFullYear(createdAt) > 1
      || getDay(createdAt) >= 1
      || getMonth(createdAt) >= 1,
  );

  return (
    <>
      {(recentNotifications?.length > 0 || loading) && (
        <>
          <Box pl={2} mb={1.25} pt="4.5rem">
            <Typography variant="caption" style={{ fontWeight: 700 }}>
              Recent
            </Typography>
          </Box>
          {loading && [...Array(2)].map(() => <SkeletonLoader />)}
          <Box
            mb={earliestNotification?.length === 0 && '4rem'}
            bgcolor="white"
          >
            <SwitchNotifications
              data={recentNotifications}
              seeNotification={seeNotification}
              deleteNotification={deleteNotification}
              getSelectedNotifications={getSelectedNotifications}
              selectNotification={selectNotification}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default RecentNotifications;
