/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getAllEPs } from '../../../../apollo/queries/eps/ogx-eps';
import EpListItem from '../EpListItem';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';
import Alert from '../../../../utils/alert';
import { getFilter } from '../../../../utils/checkFilters';
import ToLower from '../../../../utils/others/toLower';

const AllEPs = ({ value, search, showBar }) => {
  const { data } = useContext(UserInfoContext);
  const [allEPs, setEPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setAlert] = useState(false);
  const [error, setError] = useState({ message: undefined });

  const epsStorage = JSON.parse(localStorage.getItem('eps'));

  useEffect(() => {
    if (data) {
      const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
      const isAlumni = data?.currentPerson.is_alumni;
      const isAdmin = data?.currentPerson.is_admin;
      const canViewAll = ['IM', 'MKT', 'F&L'];

      if (!isAdmin && !isAlumni && !canViewAll.includes(FunctionName)) {
        sessionStorage.setItem('FILTER_EPS_PRODUCT', FunctionName);
      }
    }
    setLoading(true);
    getAllEPs()
      .then((res) => {
        if (res.data.errors && getFilter('FILTER_EPS_PRODUCT')) {
          setError({
            message: `Graphql error: ${res.data.errors[0].message}`,
          });
          setAlert(true);
          setLoading(false);
        } else {
          setEPs(res.data.data.allEPs);
          localStorage.setItem('eps', JSON.stringify(res.data.data.allEPs));
          setLoading(false);
        }
      })
      .catch(() => setEPs(epsStorage));
  }, [
    getFilter('FILTER_EPS_STATUS'),
    getFilter('FILTER_EPS_Is_sign_up'),
    getFilter('FILTER_EPS_LNS'),
    getFilter('FILTER_EPS_GENDER'),
    getFilter('FILTER_EPS_UNIVERSITY'),
    getFilter('FILTER_EPS_RESPONSIBLE'),
    getFilter('FILTER_EPS_MANAGER'),
    getFilter('FILTER_EPS_PRODUCT'),
  ]);

  const eps = allEPs?.filter(
    (item) => ToLower(item?.EPName)?.indexOf(ToLower(search)) !== -1,
  );

  return (
    <>
      <EpListItem
        product={getFilter('FILTER_EPS_PRODUCT')}
        value={value}
        showBar={showBar}
        index={0}
        eps={eps}
        setEPs={setEPs}
        getAllEPs={getAllEPs}
        loading={loading}
      />
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

export default AllEPs;
