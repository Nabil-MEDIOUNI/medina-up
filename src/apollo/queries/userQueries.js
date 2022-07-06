import { gql } from 'apollo-boost';

export const USER_INFO = gql`
  query currentPerson {
    currentPerson {
      id
      first_name
      last_name
      full_name
      cover_photo {
        url
      }
      contact_detail {
        email
        phone
      }
      email
      gender
      dob
      is_admin
      is_eb
      is_tl
      is_member
      is_lcp
      is_manager
      is_alumni
      is_verified
      is_connected
      connected_once
      No_login
      is_deleted
      can_vote
      manager {
        id
        full_name
      }
      current_positions {
        position_name
        function {
          name
          function_short_name
        }
      }
    }
  }
`;
