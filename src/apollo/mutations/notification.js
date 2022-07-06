import { gql } from 'apollo-boost';
import Axios from 'axios';
import { API } from '../config';
import { getTokenWithExpiry } from '../helpers/HandleToken';

const token = getTokenWithExpiry();

export const SEND_NOTIFICATION = gql`
  mutation sendNotification($notification: NotificationInput) {
    sendNotification(notification: $notification) {
      id
    }
  }
`;

export const SEND_SUBSCRIPTION = (notification) => Axios.post(
  API,
  {
    query: `
      mutation sendNotification($notification: NotificationInput) {
        sendNotification(notification: $notification) {
            id
          }
      }
    `,
    variables: {
      notification: { ...notification },
    },
  },
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  },
);

export const SEE_NOTIFICATION = gql`
  mutation seeNotification($id: ID!) {
    seeNotification(id: $id) {
      id
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      id
    }
  }
`;

export const DELETE_MULTIPLE_NOTIFICATIONS = gql`
  mutation deleteMultipleNotifications($ids: [ID]) {
    deleteMultipleNotifications(ids: $ids) {
      id
    }
  }
`;

export const SEE_MULTIPLE_NOTIFICATIONS = gql`
  mutation seeMultipleNotifications($ids: [ID]) {
    seeMultipleNotifications(ids: $ids) {
      id
    }
  }
`;
