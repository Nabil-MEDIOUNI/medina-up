export const checkOGXEPFilters = () => {
  const getFilter = (filterName) => Boolean(sessionStorage.getItem(filterName));
  if (getFilter('FILTER_EPS_STATUS')) return true;
  // if (getFilter('FILTER_EPS_PRODUCT')) return true;
  if (getFilter('FILTER_EPS_GENDER')) return true;
  if (getFilter('FILTER_EPS_Is_sign_up')) return true;
  if (getFilter('FILTER_EPS_LNS')) return true;
  if (getFilter('FILTER_EPS_UNIVERSITY')) return true;
  if (getFilter('FILTER_EPS_RESPONSIBLE')) return true;
  if (getFilter('FILTER_EPS_MANAGER')) return true;
  return null;
};

export const checkICXEPFilters = () => {
  const getFilter = (filterName) => Boolean(sessionStorage.getItem(filterName));
  if (getFilter('FILTER_ICX_EPS_STATUS')) return true;
  if (getFilter('FILTER_ICX_EPS_RESPONSIBLE')) return true;
  if (getFilter('FILTER_ICX_EPS_SDGNumber')) return true;
  if (getFilter('FILTER_ICX_EPS_INTERVIEWED')) return true;
  if (getFilter('FILTER_ICX_EPS_CONTACTED')) return true;
  return null;
};

export const peopleFilters = () => {
  const getFilter = (filterName) => Boolean(sessionStorage.getItem(filterName));
  if (getFilter('FILTER_PEOPLE_PROGRAMM')) return true;
  if (getFilter('FILTER_PEOPLE_POSITIONS')) return true;
  if (getFilter('FILTER_PEOPLE_LEADERS')) return true;
  if (getFilter('FILTER_PEOPLE_GENDER')) return true;
  if (getFilter('FILTER_PEOPLE_FUNCTION')) return true;
  return null;
};

export const getFilter = (filterName) => sessionStorage.getItem(filterName);
