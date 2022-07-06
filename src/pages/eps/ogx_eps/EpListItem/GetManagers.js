/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Avatar } from '@material-ui/core';
import useStyles from '../styles';

const GetManagers = ({ ep }) => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <Box display="flex" flexDirection="row">
        {!ep.TeamResponsible?.id && !ep.EPManager?.id ? (
          <span>-</span>
        ) : ep.TeamResponsible?.id === ep.EPManager?.id ? (
          <Avatar className={classes.managerAvatar}>
            <img
              alt=""
              className={classes.managerImg}
              src={ep.TeamResponsible?.cover_photo.url}
            />
          </Avatar>
        ) : (
          <>
            {ep.EPManager?.id && (
              <Avatar className={classes.managerAvatar}>
                <img
                  alt=""
                  className={classes.managerImg}
                  src={ep.EPManager?.cover_photo.url}
                />
              </Avatar>
            )}
            {ep.TeamResponsible?.id && (
              <Avatar className={classes.managerAvatar}>
                <img
                  alt=""
                  className={classes.managerImg}
                  src={ep.TeamResponsible?.cover_photo.url}
                />
              </Avatar>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default GetManagers;
