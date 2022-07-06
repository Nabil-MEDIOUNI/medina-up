/* eslint-disable camelcase */
import Axios from 'axios';

export const SendNotificationForEPManager = (sendNotification, currentEP, user, personID) => {
  sendNotification({
    variables: {
      notification: {
        title: currentEP.EPName,
        type: 'new_ep',
        ep_id: currentEP.id,
        personal_notification: personID,
        notified_by: user.data?.currentPerson.id,
      },
    },
  });
  const os_data_1 = JSON.stringify({
    app_id: '7ca60e05-805b-4478-9dcc-e8e54e63531f',
    headings: {
      en: `${user.data?.currentPerson.full_name} assigned you a new EP`,
    },
    contents: {
      en: currentEP.EPName,
    },
    chrome_web_icon: user.data?.currentPerson.cover_photo.url,
    huawei_small_icon: user.data?.currentPerson.cover_photo.url,
    isAnyWeb: true,
    filters: [
      {
        field: 'tag',
        key: 'id',
        value: personID,
      },
      {
        field: 'tag',
        key: 'is_aiesecer',
        value: true,
      },
    ],
  });
  Axios.post(
    'https://onesignal.com/api/v1/notifications',
    os_data_1,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.REACT_APP_OS_API,
      },
    },
  );
};
