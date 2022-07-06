import { gql } from 'apollo-boost';

export const CREATE_PERSON = gql`
  mutation createPerson($person: PersonInput) {
    createPerson(person: $person) {
      id
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation updatePerson($id: ID!,$person: PersonInput) {
    updatePerson(id: $id, person: $person) {
      id
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

export const DELETE_MULTIPLE_PEOPLE = gql`
  mutation deleteMultiplePeople($ids: [ID]) {
    deleteMultiplePeople(ids: $ids) {
      id
    }
  }
`;
