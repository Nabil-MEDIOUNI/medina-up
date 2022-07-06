/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getEPsIManage } from '../../../../apollo/queries/eps/ogx-eps';
import EpListItem from '../EpListItem';
import UserInfoContext from '../../../../components/UserInfo/UserInfoContext';
import Alert from '../../../../utils/alert';
import { getFilter } from '../../../../utils/checkFilters';
import ToLower from '../../../../utils/others/toLower';

const EpsImanage = ({ value, search, showBar }) => {
  const { data } = useContext(UserInfoContext);
  const [allEPs, setEPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setAlert] = useState(false);
  const [error, setError] = useState({ message: undefined });

  const functionName = data?.currentPerson.current_positions.function.function_short_name;
  const epsStorage = JSON.parse(localStorage.getItem('eps'));
  const epsIManageStorage = epsStorage?.filter(
    (ep) => ToLower(ep.EPManager?.full_name)
      === ToLower(data?.currentPerson.full_name),
  );

  useEffect(() => {
    sessionStorage.setItem('FILTER_EPS_PRODUCT', functionName);
    getEPsIManage()
      .then((res) => {
        if (res.data.errors && getFilter('FILTER_EPS_PRODUCT')) {
          setError({
            message: `Graphql error: ${res.data.errors[0].message}`,
          });
          setAlert(true);
          setLoading(false);
        } else {
          setEPs(res.data.data.EPsIManage);
          setLoading(false);
        }
      })
      .catch(() => setEPs(epsIManageStorage));
  }, [
    getFilter('FILTER_EPS_STATUS'),
    getFilter('FILTER_EPS_Is_sign_up'),
    getFilter('FILTER_EPS_LNS'),
    getFilter('FILTER_EPS_GENDER'),
    getFilter('FILTER_EPS_UNIVERSITY'),
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
        index={1}
        eps={eps}
        setEPs={setEPs}
        getAllEPs={getEPsIManage}
        loading={loading}
      />
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

export default EpsImanage;
