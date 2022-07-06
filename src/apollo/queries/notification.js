import { gql } from 'apollo-boost';

export const GET_UNSEEN_NOTIFICATIONS = gql`
  query neverSeenNotifications {
    neverSeenNotifications {
      id
    }
  }
`;

export const ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications {
      id
      title
      body
      type
      post {
        id
        title
      }
      ep {
        id
      }
      notified_by {
        id
        full_name
        cover_photo {
          url
        }
      }
      notified_to {
        can_view
        department
      }
      seen_by {
        id
      }
      createdAt
    }
  }
`;
