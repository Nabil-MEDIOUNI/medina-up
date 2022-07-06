import { gql } from 'apollo-boost';

import Axios from 'axios';

export const ALL_OPPORTUNITIES = gql`
  query allOpportunities {
    allOpportunities {
      id
      title
    }
  }
`;

export const GET_OPPORTUNITY = gql`
  query getOpportunity($id: ID!) {
    getOpportunity(id: $id) {
      id
      cover_photo {
        url
      }
    }
  }
`;

export const ALL_OGX_OPPORTUNITIES = (filters) => Axios.post(
  'https://api.aiesec.org/graphql',
  {
    query: `
    query allOpportunity($filters: OpportunityFilter, $page: Int, $per_page: Int) {
      allOpportunity(filters: $filters, page: $page, per_page: $per_page) {
        data{
          id
          title
          status
          programme{
            short_name_display
          }
          organisation{
            name
          }
        }
      }
    }
  `,
    variables: {
      page: 1,
      per_page: 25,
      filters,
    },
  },
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
          'fc26fa2d35871a49bd11f565ad4725a4594af8dc7114de62f68d52cfe9dd4692',
    },
  },
);

export const ALL_ICX_OPPORTUNITIES = () => Axios.post(
  'https://api.aiesec.org/graphql',
  {
    query: `
    query allOpportunity($filters: OpportunityFilter, $page: Int, $per_page: Int) {
      allOpportunity(filters: $filters, page: $page, per_page: $per_page) {
        data{
          id
          title
          status
          programme{
            short_name_display
          }
          organisation{
            name
          }
        }
      }
    }
  `,
    variables: {
      page: 1,
      per_page: 25,
      filters: {
        committee: 891,
      },
    },
  },
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
          'fc26fa2d35871a49bd11f565ad4725a4594af8dc7114de62f68d52cfe9dd4692',
    },
  },
);
