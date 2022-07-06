import React from 'react';

const Notifications = {
  title: 'Notifications',
  icon: () => (
    <svg
      style={{
        height: 24,
        transform: 'scale(0.9)',
        width: 24,
        opacity: 0.5,
      }}
      className="global-nav__icon "
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.7 19C13.9 19.3 14 19.6 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 19.6 10.1 19.3 10.3 19H2V18C2 17 2.4 16.1 3.2 15.2L4.2 14H19.9L20.9 15.2C21.7 16.2 22.1 17.1 22.1 18V19H13.7ZM18.2 7.4C17.8 4.3 15.1 2 12 2C8.9 2 6.2 4.3 5.8 7.4L5 13H19L18.2 7.4Z" />
    </svg>
  ),
  icon_active: () => (
    <svg
      style={{
        height: 24,
        transform: 'scale(0.9)',
        width: 24,
        opacity: 0.9,
      }}
      className="global-nav__icon "
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.4 17L20.7 15.6L5.2 12.2L4 13.1C3 13.9 2.4 14.7 2.2 15.6L2 16.6L21.7 21L21.9 20C22 19.7 22 19.5 22 19.2C22 18.5 21.8 17.8 21.4 17Z" />
      <path d="M20.5 8.8C20.8 5.7 18.7 2.8 15.6 2.1C15.1 2 14.6 2 14.2 2C11.6 2 9.19999 3.6 8.29999 6.1L6.29999 11.4L20.1 14.5L20.5 8.8Z" />
      <path d="M11 20C11 21.1 11.9 22 13 22C14.1 22 15 21.1 15 20C15 19.8 15 19.7 14.9 19.5L11.4 18.7C11.2 19.1 11 19.5 11 20Z" />
    </svg>
  ),
  show_notif: true,
  link: '/notifications',
};

export default Notifications;
