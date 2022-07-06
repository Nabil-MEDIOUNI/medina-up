/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';

import { Box, Typography } from '@material-ui/core';
import SelectPersmissionView from './SelectPersmissionView';
import useStyles from '../styles';
import LastDiv from '../../../_common/LastDiv';
import urlify from '../../../../utils/others/transformToLink';

const PostTextArea = ({
  setTitle,
  setDescription,
  setPosted_to,
  image,
  description,
  title,
  file,
  posted_to,
  video,
}) => {
  const classes = useStyles();

  const [isEditing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!isEditing);
  };
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  }

  return (
    <>
      <SelectPersmissionView
        posted_to={posted_to}
        setPosted_to={setPosted_to}
      />
      <Box mx={2} mt={2.5} width="80%">
        <Box mb={1}>
          <Typography style={{ fontSize: 14 }}>Title</Typography>
        </Box>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={classes.textInput}
          placeholder="Post title"
          ref={inputRef}
        />
      </Box>
      <Box
        onClick={toggleEditing}
        mx={2}
        mt={2.5}
        className={classes.textArea}
      >
        <Box mb={1}>
          <Typography style={{ fontSize: 14 }}>Description</Typography>
        </Box>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows="8"
          className={classes.textInput}
          placeholder="What do you want to talk about?"
          ref={inputRef}
        />
        <Box my={2}>
          <Typography style={{ textTransform: 'capitalize' }} variant="body1">{title}</Typography>
          <Box mt={1}>
            <Typography
              style={{ whiteSpace: 'break-spaces' }}
              className={classes.postDescription}
              variant="caption"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: urlify(description),
                }}
              />
            </Typography>
          </Box>
        </Box>
        {file?.type?.split('/')[0] === 'application' ? (
          <Box ml={-1} display="flex" alignItems="center">
            <img src={image} alt="" width="20%" />
            <Box ml={1.5} overflow="hidden">
              <Typography variant="body2">{file.name?.split('.')[0]}</Typography>
              <Typography variant="caption">
                <span className={classes.fileType}>
                  {file.name?.split('.')[1]}
                </span>
                {' '}
                file (
                {bytesToSize(file.size)}
                )
              </Typography>
            </Box>
          </Box>
        ) : file?.type?.split('/')[0] === 'image' ? (
          image && <img src={image} alt="" width="100%" />
        ) : (
          video && <video controls width="100%" src={video} />
        )}
        <LastDiv />
      </Box>
    </>
  );
};

export default PostTextArea;
