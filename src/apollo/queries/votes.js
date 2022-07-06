import { gql } from 'apollo-boost';
import Axios from 'axios';

import { getTokenWithExpiry } from '../helpers/HandleToken';

const token = getTokenWithExpiry();

export const ALL_VOTES = gql`
  query allVotes {
    allVotes {
      id
      title
      description
      location
      createdAt
      open
      candidates {
        full_name
      }
      room {
        id
        name
      }
    }
  }
`;

export const GET_ROOM = gql`
  query getRoom($id: String, $name: String) {
    getRoom(id: $id, name: $name) {
      id
      title
      description
      location
      open
      show_result
      room {
        id
        name
      }
      creator {
        full_name
        cover_photo
        current_positions {
          position_name
        }
      }
      poll_voters {
        voter {
          id
          full_name
          cover_photo
          current_positions {
            position_name
          }
        }
        voted
        can_vote
        votes {
          candidates
        }
      }
      candidates {
        full_name
        cover_photo
        points {
          with
          vs
        }
        short_bio
        location
      }
    }
  }
`;

export const getRoomquery = (id, name) => Axios.post(
  process.env.REACT_APP_API_URL,
  {
    query: `
  query getRoom($id: String, $name: String) {
  getRoom(id: $id, name: $name) {
    id
      title
      description
      location
      open
      show_result
      room {
        id
        name
      }
      creator {
        full_name
        cover_photo
        current_positions {
          position_name
        }
      }
      poll_voters {
        voter {
          id
          full_name
          cover_photo
          current_positions {
            position_name
          }
        }
        voted
        can_vote
        votes {
          candidates
        }
      }
      candidates {
        full_name
        cover_photo
        points {
          with
          vs
        }
        short_bio
        location
  }
}
  }
  `,
    variables: {
      id,
      name,
    },
  },
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  },
);

export const GET_VOTERS = gql`
  query getVoters($id: String, $name: String) {
    getVoters(id: $id, name: $name) {
      voter {
        id
        full_name
        cover_photo
        current_positions {
          position_name
        }
      }
      voted
      can_vote
    }
  }
`;

export const GET_CANDIDATE = gql`
  query getCandidate($id: String, $name: String, $candidate: String) {
    getCandidate(id: $id, name: $name, candidate: $candidate) {
      full_name
      cover_photo
      short_bio
      location
    }
  }
`;
