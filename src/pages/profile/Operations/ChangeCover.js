import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import Loading from '../../../components/_common/Loading/index';
import Alert from '../../../utils/alert';
import { PHOTO_UPDATE } from '../../../apollo/mutations/currentPerson';
import { USER_INFO } from '../../../apollo/queries/userQueries';

const ChangeCover = () => {
  const [openAlert, setAlert] = useState(false);

  const [changeCoverPhoto, { loading, error }] = useMutation(PHOTO_UPDATE, {
    refetchQueries: [
      {
        query: USER_INFO,
      },
    ],
  });

  const onDrop = useCallback(
    ([file]) => {
      changeCoverPhoto({ variables: { file } });
      setAlert(true);
    },
    [changeCoverPhoto],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loading) {
    return (
      <>
        <Box
          position="absolute"
          left="49%"
          zIndex="99"
          top="40%"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Loading />
        </Box>
        <Box
          position="fixed"
          width="100%"
          height="153vh"
          bgcolor="rgb(0 0 0 / 7%)"
          zIndex="3"
        />
      </>
    );
  }

  return (
    <>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <img className="edit_img" src="/static/icons/edit_pen.svg" alt="" />
        ) : (
          <img className="edit_img" src="/static/icons/edit_pen.svg" alt="" />
        )}
      </Box>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Photo is changed successfully!',
      )}
    </>
  );
};

export default ChangeCover;
