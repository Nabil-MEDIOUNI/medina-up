/* eslint-disable camelcase */
import Axios from 'axios';
import { SEND_SUBSCRIPTION } from '../../../apollo/mutations/notification';

const SendNotification = (id, creator, posted_to, title, description, FunctionName) => {
  const department = () => {
    if (posted_to === 'My Team' || posted_to === 'My Department') {
      return FunctionName;
    }
    if (posted_to === 'Local Committee' || posted_to === 'All Alumni' || posted_to === 'Only EB') {
      return posted_to;
    }
  };
  SEND_SUBSCRIPTION({
    title,
    body: description,
    type: 'new_post',
    notified_to: {
      can_view: posted_to,
      department: department(),
    },
    notified_by: creator.id,
    post: id,
  });
  if (posted_to === 'Local Committee') {
    const os_data_1 = JSON.stringify({
      app_id: '2e7b8186-410c-415f-af86-c8dc2d48118c',
      headings: {
        en: `${creator.full_name} shared a post`,
      },
      contents: {
        en: title,
      },
      chrome_web_icon: creator.cover_photo.url,
      huawei_small_icon: creator.cover_photo.url,
      isAnyWeb: true,
      filters: [
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
  }

  if (posted_to === 'Only EB') {
    const os_data_1 = JSON.stringify({
      app_id: '2e7b8186-410c-415f-af86-c8dc2d48118c',
      headings: {
        en: `${creator.full_name} shared a post`,
      },
      contents: {
        en: title,
      },
      chrome_web_icon: creator.cover_photo.url,
      huawei_small_icon: creator.cover_photo.url,
      isAnyWeb: true,
      filters: [
        {
          field: 'tag',
          key: 'position_name',
          value: 'vice president',
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
  }

  if (posted_to === 'My Department') {
    const os_data_1 = JSON.stringify({
      app_id: '2e7b8186-410c-415f-af86-c8dc2d48118c',
      headings: {
        en: `${creator.full_name} shared a post`,
      },
      contents: {
        en: title,
      },
      chrome_web_icon: creator.cover_photo.url,
      huawei_small_icon: creator.cover_photo.url,
      isAnyWeb: true,
      filters: [
        {
          field: 'tag',
          key: 'function_short_name',
          value: FunctionName,
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
  }

  if (posted_to === 'My Team') {
    const os_data_1 = JSON.stringify({
      app_id: '2e7b8186-410c-415f-af86-c8dc2d48118c',
      headings: {
        en: `${creator.full_name} shared a post`,
      },
      contents: {
        en: title,
      },
      chrome_web_icon: creator.cover_photo.url,
      huawei_small_icon: creator.cover_photo.url,
      isAnyWeb: true,
      filters: [
        {
          field: 'tag',
          key: 'position_name',
          value: 'team member',
        },
        {
          field: 'tag',
          key: 'function_short_name',
          value: FunctionName,
        },
        {
          field: 'tag',
          key: 'manager',
          value: creator.id,
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
  }
};

export default SendNotification;
