import React, { useState } from 'react';

import { Box, IconButton } from '@material-ui/core';
import { EmojiEmotions } from '@material-ui/icons';
import Picker from 'emoji-picker-react';

import useStyles from '../styles';
import Upload from './Upload';

const PostOptions = ({ onDrop, onEmojiClick }) => {
  const classes = useStyles();
  const [showPicker, setPicker] = useState(null);

  return (
    <Box
      width="100%"
      position="fixed"
      bottom="0px"
      boxShadow="0px 0px 10px #f2f2f2"
      bgcolor="white"
    >
      <Box
        mx={2}
        mt={1.5}
        mb={0.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex">
          <Upload onDrop={onDrop}>
            <IconButton onClick={() => onDrop}>
              <img
                width="20px"
                style={{ opacity: 0.5 }}
                src="/static/icons/camera.svg"
                alt=""
                className={classes.optionIcons}
              />
            </IconButton>
          </Upload>
          <Upload onDrop={onDrop}>
            <IconButton onClick={() => onDrop}>
              <img
                width="20px"
                style={{ opacity: 0.5 }}
                src="/static/icons/file.svg"
                alt=""
                className={classes.optionIcons}
              />
            </IconButton>
          </Upload>
        </Box>
        <Box>
          <IconButton onClick={() => setPicker(!showPicker)}>
            <EmojiEmotions className={classes.optionIcons} />
          </IconButton>
          {showPicker && (
          <Picker
            pickerStyle={{
              position: 'absolute',
              right: '2rem',
              bottom: '2.5rem',
              zIndex: 9999,
            }}
            disableSearchBar
            disableAutoFocus
            disableSkinTonePicker
            onEmojiClick={onEmojiClick}
          />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PostOptions;
