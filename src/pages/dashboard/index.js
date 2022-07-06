/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import Axios from 'axios';
import { useMutation } from 'react-apollo';

import LastDiv from '../../components/_common/LastDiv';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import OfflineContainer from './OfflineContainer';
import Navigation from '../../components/Navigation';
import BetaContainer from './BetaContainer';
import { CHANGE_USER_CONECTIVITY } from '../../apollo/mutations/currentPerson';

const Dashboard = () => {
  const { data } = useContext(UserInfoContext);
  const [cahnge_user_connectivity] = useMutation(CHANGE_USER_CONECTIVITY);

  useEffect(() => {
    if (!navigator.onLine) {
      const OFFLINE_CONTAINER = document.getElementById('offline_container');
      const DASHBOARD_CONTAINER = document.getElementById(
        'dashboard_container',
      );
      OFFLINE_CONTAINER.style.display = 'block';
      DASHBOARD_CONTAINER.style.display = 'none';
    }
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));

      cahnge_user_connectivity({
        variables: {
          connectivity: true,
        },
      }).then(() => {
        console.log('is Connected: ', data.currentPerson?.is_connected);
      });

      if (data.currentPerson?.is_deleted) {
        window.location.href = '/logout';
      }

      const { FunctionName, isAlumni } = SET_OS_USER(data);

      if (!data?.currentPerson.is_admin && !isAlumni) {
        sessionStorage.setItem('FILTER_EPS_PRODUCT', FunctionName);
        sessionStorage.setItem('FILTER_ICX_EPS_PRODUCT', FunctionName);
      }
    }
  }, [cahnge_user_connectivity, data]);

  return (
    <>
      <OfflineContainer />
      <BetaContainer />
      <LastDiv />
      <Navigation withTopBar fixTopBar fixBar title="Dashboard" />
    </>
  );
};

export default Dashboard;

function SET_OS_USER(data) {
  const FunctionName = data?.currentPerson.current_positions.function.function_short_name;
  const isAlumni = data?.currentPerson.is_alumni;
  const isMember = data?.currentPerson.is_member;
  const manager = isMember && data?.currentPerson.manager?.id;
  const os_user = localStorage.getItem('os-user');
  const os_data = JSON.stringify({
    app_id: '2e7b8186-410c-415f-af86-c8dc2d48118c',
    tags: {
      id: data?.currentPerson.id,
      name: data?.currentPerson.full_name,
      position_name: data?.currentPerson.current_positions.position_name,
      function_short_name: FunctionName,
      is_aiesecer: true,
      manager: isMember ? manager : undefined,
    },
  });

  Axios.put(`https://onesignal.com/api/v1/players/${os_user}`, os_data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { FunctionName, isAlumni };
}
