import Axios from 'axios';
import { getFilter } from '../../../utils/checkFilters';
import { getTokenWithExpiry } from '../../helpers/HandleToken';

const setFilter = (filterName) => JSON.parse(sessionStorage.getItem(filterName));
const token = getTokenWithExpiry();
export const ALL_ICX_EPS = () => {
  const filters = {
    Status: getFilter('FILTER_ICX_EPS_STATUS')
      ? setFilter('FILTER_ICX_EPS_STATUS')
      : undefined,
    MemberResponsible: getFilter('FILTER_ICX_EPS_RESPONSIBLE')
      ? setFilter('FILTER_ICX_EPS_RESPONSIBLE')
      : undefined,
    SDGNumber: getFilter('FILTER_ICX_EPS_SDGNumber')
      ? setFilter('FILTER_ICX_EPS_SDGNumber')
      : undefined,
    CONTACTED: getFilter('FILTER_ICX_EPS_CONTACTED')
      ? setFilter('FILTER_ICX_EPS_CONTACTED')
      : undefined,
    Interviewed: getFilter('FILTER_ICX_EPS_INTERVIEWED')
      ? setFilter('FILTER_ICX_EPS_INTERVIEWED')
      : undefined,
  };
  return Axios.post(
    process.env.REACT_APP_API_URL,
    {
      query: `
      query allICXEPs($product: String, $filters: ICXFilter) {
      allICXEPs(product: $product, filters: $filters) {
        EPName
        EXPAID
        Email
        WhatsupNumber
        Country
        Background
        CV
        Status
        ifRejectedWhy
        MemberResponsible
        OPPmanager
        HomeMC
        HomeLC
        SUBProduct
        SDGNumber
        ProjectName
        OpportunityName
        CONTACTED
        InterviewDate
        TIME
        Interviewed
        Intreviewoutput
        APLDate
        APDDate
        REDate
        FinDate
      }
      }
      `,
      variables: {
        product: getFilter('FILTER_ICX_EPS_PRODUCT'),
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

export const getSingleIGVEP = (name, product) => Axios.post(
  process.env.REACT_APP_API_URL,
  {
    query: `
    query getSingleICXEP($name: String!, $product: String) {
    getSingleICXEP(name: $name, product: $product) {
      EPName
      EXPAID
      Email
      WhatsupNumber
      Country
      Status
      ifRejectedWhy
      MemberResponsible
      HomeMC
      HomeLC
      SDGNumber
      ProjectName
      OpportunityName
      CONTACTED
      InterviewDate
      TIME
      Interviewed
      Intreviewoutput
      APLDate
      APDDate
      REDate
      FinDate
    }
    }
    `,
    variables: {
      name,
      product,
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
