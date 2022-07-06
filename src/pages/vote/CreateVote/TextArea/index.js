import React, { useState, useEffect, useRef } from 'react';

import { Box, Typography } from '@material-ui/core';
import SelectPersmissionView from './SelectPersmissionView';
import useStyles from '../styles';

const PostTextArea = ({
  setTitle, setDescription, description, title,
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

  return (
    <>
      <SelectPersmissionView />
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
      <Box onClick={toggleEditing} mx={2} mt={2.5} className={classes.textArea}>
        <Box mb={1}>
          <Typography style={{ fontSize: 14 }}>Description</Typography>
        </Box>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={classes.textInput}
          placeholder="What do you want to talk about?"
          ref={inputRef}
        />
      </Box>
    </>
  );
};

export default PostTextArea;
