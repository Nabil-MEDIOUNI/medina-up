import { gql } from 'apollo-boost';
import Axios from 'axios';
import { getFilter } from '../../../utils/checkFilters';
import { getTokenWithExpiry } from '../../helpers/HandleToken';

const setFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));
const token = getTokenWithExpiry();

const EPsGQL = `
query allEPs($filters: OGXFilter, $product: String) {
allEPs(filters: $filters, product: $product) {
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

export const getAllEPs = () => {
  const filters = {
    Status: getFilter('FILTER_EPS_STATUS')
      ? setFilter('FILTER_EPS_STATUS')
      : undefined,
    Gender: getFilter('FILTER_EPS_GENDER')
      ? setFilter('FILTER_EPS_GENDER')
      : undefined,
    EPUniversity: getFilter('FILTER_EPS_UNIVERSITY')
      ? setFilter('FILTER_EPS_UNIVERSITY')
      : undefined,
    TeamResponsible: getFilter('FILTER_EPS_RESPONSIBLE')
      ? setFilter('FILTER_EPS_RESPONSIBLE')
      : undefined,
    EPManager: getFilter('FILTER_EPS_MANAGER')
      ? setFilter('FILTER_EPS_MANAGER')
      : undefined,
    Is_sign_up: getFilter('FILTER_EPS_Is_sign_up')
      ? setFilter('FILTER_EPS_Is_sign_up')
      : undefined,
    Sent_lns: getFilter('FILTER_EPS_LNS')
      ? setFilter('FILTER_EPS_LNS')
      : undefined,
  };
  return Axios.post(
    process.env.REACT_APP_API_URL,
    {
      query: EPsGQL,
      variables: {
        filters,
        product: getFilter('FILTER_EPS_PRODUCT'),
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
};

export const getEPsIManage = () => {
  const filters = {
    Status: getFilter('FILTER_EPS_STATUS')
      ? setFilter('FILTER_EPS_STATUS')
      : undefined,
    Gender: getFilter('FILTER_EPS_GENDER')
      ? setFilter('FILTER_EPS_GENDER')
      : undefined,
    EPUniversity: getFilter('FILTER_EPS_UNIVERSITY')
      ? setFilter('FILTER_EPS_UNIVERSITY')
      : undefined,
    Is_sign_up: getFilter('FILTER_EPS_Is_sign_up')
      ? setFilter('FILTER_EPS_Is_sign_up')
      : undefined,
    Sent_lns: getFilter('FILTER_EPS_LNS')
      ? setFilter('FILTER_EPS_LNS')
      : undefined,
  };
  return Axios.post(
    process.env.REACT_APP_API_URL,
    {
      query: `
      query EPsIManage($filters: OGXFilter) {
      EPsIManage(filters: $filters) {
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
      `,
      variables: {
        filters,
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
};

export const ALL_MANAGERS = gql`
  query allManagers($product: String) {
    allManagers(product: $product) {
      id
      full_name
    }
  }
`;

export const ALL_TEAMS_RESPONSIBLE = gql`
  query allTeamResponsible($product: String) {
    allTeamResponsible(product: $product) {
      id
      full_name
      cover_photo {
        url
      }
    }
  }
`;

export const getSingleEP = (id) => Axios.post(
  process.env.REACT_APP_API_URL,
  {
    query: `
    query getSingleEP($id: String!) {
    getSingleEP(id: $id) {
      id
      ExpaID
      Product
      Dispatch
      createdAt
      Is_sign_up
      EPName
      EPEmail
      EPPhone
      FacebookLink
      EPUniversity
      CV
      EPAge
      Gender
      EPYear
      CommunicationPrefrences
      TeamResponsible {
        id
        full_name
        cover_photo {
          url
        }
      }
      EPManager {
        id
        full_name
        cover_photo {
          url
        }
      }
      Status
      Note
      FinanceCorner
      OpportunityLink
      SubProduct
      HostLC
      Country
      AccDate
      APDDate
      REDate
      FinDate
      Travel
      Obstacles
      Prioritization
      Expectation
    }
    }
    `,
    variables: {
      id,
      product: getFilter('FILTER_EPS_PRODUCT'),
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
