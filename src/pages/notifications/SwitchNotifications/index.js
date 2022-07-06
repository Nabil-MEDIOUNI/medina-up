import React, { useContext } from 'react';

import NotificationDisplay from './Display';
import { likeCommentContent, newPostContent, newEPContent } from './SwitchContent';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';

const SwitchNotifications = ({
  data, seeNotification, deleteNotification, getSelectedNotifications, selectNotification,
}) => {
  const { data: user } = useContext(UserInfoContext);
  const likedByMe = (notification) => notification.notified_by.id === user?.currentPerson.id;
  const assignedByMe = (notification) => notification.notified_by.id === user?.currentPerson.id;
  const postedByMe = (notification) => notification.notified_by.id === user?.currentPerson.id;

  return (
    <>
      {data?.map((notification) => (
        <>
          {notification.type === 'like_comment' && (
          <NotificationDisplay
            seeNotification={seeNotification}
            deleteNotification={deleteNotification}
            notification={notification}
            content={likeCommentContent(notification, likedByMe(notification))}
            getSelectedNotifications={getSelectedNotifications}
            selectNotification={selectNotification}
          />
          )}
          {notification.type === 'new_post' && (
          <NotificationDisplay
            seeNotification={seeNotification}
            deleteNotification={deleteNotification}
            notification={notification}
            content={newPostContent(notification, assignedByMe(notification))}
            getSelectedNotifications={getSelectedNotifications}
            selectNotification={selectNotification}
          />
          )}
          {notification.type === 'new_ep' && (
          <NotificationDisplay
            seeNotification={seeNotification}
            deleteNotification={deleteNotification}
            notification={notification}
            content={newEPContent(notification, postedByMe(notification))}
            getSelectedNotifications={getSelectedNotifications}
            selectNotification={selectNotification}
          />
          )}
        </>
      ))}
    </>
  );
};

export default SwitchNotifications;
