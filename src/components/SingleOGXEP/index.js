/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Header from './Header';
import NavigationBar from '../Navigation/NavigationBar';
import SingleEpDisplay from './Display';
import { getSingleEP } from '../../apollo/queries/eps/ogx-eps';
import Alert from '../../utils/alert';

const SingleEp = (props) => {
  const [singleEP, setSingleEP] = useState({});
  const [loading, setLoading] = useState(true);
  const [openAlert, setAlert] = useState(false);
  const [error, setError] = useState({ message: undefined });

  useEffect(() => {
    getSingleEP(props.match.params.id)
      .then((res) => {
        if (res.data.errors) {
          setError({
            message: `Graphql error: ${res.data.errors[0].message}`,
          });
          setAlert(true);
          setLoading(false);
        } else {
          setError('');
          setSingleEP(res.data.data.getSingleEP);
          setLoading(false);
        }
      })
      .catch(() => {
        // setSingleEP(storageSingleEP);
      });
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
          id={props.match.params.id}
          title="EP Profile"
          route="/ogx-eps"
          singleEP={singleEP}
          loading={loading}
          setEP={setSingleEP}
        />
      </Box>
      <SingleEpDisplay
        setSingleEP={setSingleEP}
        getSingleEP={getSingleEP}
        singleEP={singleEP}
        loading={loading}
        props={props}
      />
      <NavigationBar />
      {Alert(error, openAlert, () => setAlert(false))}
    </>
  );
};

export default SingleEp;
