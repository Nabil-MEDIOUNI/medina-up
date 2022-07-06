/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Header from './Header';
import NavigationBar from '../Navigation/NavigationBar';
import SingleEpDisplay from './Display';
import { getSingleIGVEP } from '../../apollo/queries/eps/icx-eps';

const SigleICXEP = (props) => {
  const [singleEP, setSingleEP] = useState({});
  const [loading, setLoading] = useState(true);

  const productStorage = sessionStorage.getItem('FILTER_ICX_EPS_PRODUCT');

  useEffect(() => {
    getSingleIGVEP(props.match.params.name, productStorage)
      .then((res) => {
        setSingleEP(res.data.data.getSingleICXEP);
        setLoading(false);
      })
      .catch(() => console.log('object'));
  }, [props.match.params.id]);

  return (
    <>
      <Box
        position="fixed"
        top="0"
        width="100%"
        style={{
          boxShadow: '1px 1px 10px #c7c7c7',
          background: 'white',
          zIndex: 9,
        }}
      >
        <Header
          showMoreIcon
          name={props.match.params.name}
          title="EP Profile"
          route="/icx-eps"
          singleEP={singleEP}
          loading={loading}
          setEP={setSingleEP}
        />
      </Box>
      <SingleEpDisplay singleEP={singleEP} loading={loading} props={props} />
      <NavigationBar />
    </>
  );
};

export default SigleICXEP;
