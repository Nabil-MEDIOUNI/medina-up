import React from 'react';
import { Typography } from '@material-ui/core';

export const likeCommentContent = (notification, likedByMe) => {
  if (likedByMe) {
    return (
      <Typography
        style={{ overflowWrap: 'anywhere' }}
        variant="caption"
      >
        You liked your own
        {' '}
        <span style={{ fontWeight: 700 }}>comment!</span>
      </Typography>
    );
  }
  return (
    <Typography
      style={{
        marginLeft: 12,
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
      }}
      variant="caption"
    >
      {notification.notified_by.full_name}
      {' '}
      liked
      <span style={{ fontWeight: 700 }}> your comment</span>
      {' '}
      on
      {' '}
      <span style={{ fontWeight: 700 }}>
        post
        {' '}
        {notification.title}
      </span>
    </Typography>
  );
};

export const newEPContent = (notification, postedByMe) => {
  if (postedByMe) {
    return (
      <Typography
        style={{ overflowWrap: 'anywhere' }}
        variant="caption"
      >
        Congrats! your assignment of
        {' '}
        <span style={{ fontWeight: 700 }}>{notification.title}</span>
        {' '}
        went well
      </Typography>
    );
  }
  return (
    <Typography
      style={{
        marginLeft: 12,
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
      }}
      variant="caption"
    >
      you have been
      {' '}
      <span style={{ fontWeight: 700 }}>assigned</span>
      {' '}
      by
      <span style={{ fontWeight: 700 }}>
        {' '}
        {notification.notified_by.full_name}
      </span>
      {' '}
      to manage
      <span style={{ fontWeight: 700 }}>
        {' '}
        {notification.title}
      </span>
    </Typography>
  );
};

export const newPostContent = (notification, assignedByMe) => {
  if (assignedByMe) {
    return (
      <Typography
        style={{ overflowWrap: 'anywhere' }}
        variant="caption"
      >
        Congrats!
        {' '}
        <span style={{ fontWeight: 700 }}>Your post is ready to view!</span>
      </Typography>
    );
  }
  return (
    <Typography
      style={{
        marginLeft: 12,
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
      }}
      variant="caption"
    >
      {notification.notified_by.full_name}
      {' '}
      shared a
      <span style={{ fontWeight: 700 }}> post</span>
      , to
      <span style={{ fontWeight: 700 }}>
        {' '}
        {notification.notified_to.can_view}
        .
        {' '}
      </span>
      <span style={{ fontWeight: 700 }}>{notification.title}</span>
    </Typography>
  );
};
