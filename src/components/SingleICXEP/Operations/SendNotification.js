/* eslint-disable camelcase */
import Axios from 'axios';

const SendNotification = (sendNotification, singleEP, currentEP, user) => {
  sendNotification({
    variables: {
      notification: {
        title: singleEP.EPName,
        ep_id: singleEP.EPName,
        type: 'new_ep',
        personal_notification: currentEP.MemberResponsible,
      },
    },
  });
  const os_data_1 = JSON.stringify({
    app_id: '7ca60e05-805b-4478-9dcc-e8e54e63531f',
    headings: {
      en: `${user?.currentPerson.full_name} assigned you a new EP`,
    },
    contents: {
      en: singleEP.EPName,
    },
    chrome_web_icon: user?.currentPerson.cover_photo.url,
    huawei_small_icon: user?.currentPerson.cover_photo.url,
    isAnyWeb: true,
    filters: [
      {
        field: 'tag',
        key: 'name',
        value: currentEP.MemberResponsible,
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

export default SendNotification;
