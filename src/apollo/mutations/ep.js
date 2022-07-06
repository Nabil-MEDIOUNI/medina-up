import { gql } from 'apollo-boost';

export const CREATE_EP = gql`
  mutation createEP($ep: EPInput) {
    createEP(ep: $ep) {
      id
    }
  }
`;

export const SET_EP_MANAGER = gql`
  mutation setEPManager($id: ID!, $personID: ID!) {
    setEPManager(id: $id, personID: $personID) {
      id
    }
  }
`;

export const SET_MULTIPLE_MANAGERS = gql`
  mutation setMultipleManagers(
    $ids: [ID]
    $manager: String
    $teamResponsible: String
  ) {
    setMultipleManagers(
      ids: $ids
      manager: $manager
      teamResponsible: $teamResponsible
    ) {
      id
    }
  }
`;

export const SET_EP_TEAM_RESPONSIBLE = gql`
  mutation setTeamResponsible($id: ID!, $personID: ID!) {
    setTeamResponsible(id: $id, personID: $personID) {
      id
    }
  }
`;

export const UPDATE_EP = gql`
  mutation updateEP($id: ID!, $ep: EPInput) {
    updateEP(id: $id, ep: $ep) {
      id
    }
  }
`;

export const DELETE_EP = gql`
  mutation deleteEP($id: ID!) {
    deleteEP(id: $id) {
      id
    }
  }
`;

export const DELETE_MULTIPLE_EPS = gql`
  mutation deleteMultipleEPs($ids: [ID]) {
    deleteMultipleEPs(ids: $ids) {
      id
      Status
      Product
      createdAt
      Is_sign_up
      Sent_lns
      EPName
      EPUniversity
      TeamResponsible {
        id
        cover_photo {
          url
        }
      }
      EPManager {
        id
        cover_photo {
          url
        }
      }
      Status
    }
  }
`;
