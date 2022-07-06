import { gql } from 'apollo-boost';

export const ALL_PEOPLE = gql`
  query PeopleQuery($filters: PeopleFilter) {
    allPeople(filters: $filters) {
      id
      full_name
      is_eb
      is_tl
      is_member
      is_lcp
      is_alumni
      is_manager
      is_connected
      connected_once
      No_login
      cover_photo {
        url
      }
      current_positions {
        position_name
        function {
          name
          function_short_name
        }
      }
      manager {
        id
        full_name
      }
    }
  }
`;

export const GET_USER = gql`
  query getPerson($id: ID!) {
    getPerson(id: $id) {
      id
      first_name
      last_name
      full_name
      email
      contact_detail {
        email
      }
      current_positions {
        position_name
        function {
          name
          function_short_name
        }
      }
      is_eb
      is_admin
      is_tl
      is_member
      is_lcp
      is_alumni
      is_manager
      is_verified
      is_connected
      connected_once
      No_login
      can_vote
      manager {
        id
        full_name
      }
    }
  }
`;

export const ALL_TEAM_LEADERS = gql`
  query allTeamLeaders {
    allTeamLeaders {
      id
      full_name
      cover_photo {
        url
      }
    }
  }
`;
