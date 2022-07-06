import React from 'react';
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

const Upload = ({ children, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        children
      ) : (
        children
      )}
    </Box>
  );
};

export default Upload;
