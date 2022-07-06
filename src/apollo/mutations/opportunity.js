import { gql } from 'apollo-boost';

export const CREATE_OPPORTUNITY = gql`
  mutation createOpportunity($opportunity: OpportunityInput) {
    createOpportunity(opportunity: $opportunity) {
      id
    }
  }
`;

export const UPDATE_OPPORTUNITY = gql`
  mutation updateOpportunity($id: ID!, $opportunity: OpportunityInput) {
    updateOpportunity(id: $id, opportunity: $opportunity) {
      id
    }
  }
`;

export const DELETE_OPPORTUNITY = gql`
  mutation deleteOpportunity($id: ID!) {
    deleteOpportunity(id: $id) {
      id
    }
  }
`;
