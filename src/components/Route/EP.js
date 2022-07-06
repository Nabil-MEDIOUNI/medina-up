import React from 'react';

const EPs = {
  title: 'EPS Page',
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
      <path d="m12 16v6h-9v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3zm5.5-3c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5v4.5h7v-4.5c0-1.4-1.1-2.5-2.5-2.5zm-11-13c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z" />
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
      <path d="m16.5 11c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" />
      <path d="m21 16c0-1.657-1.343-3-3-3h-3c-1.657 0-3 1.343-3 3v6h9z" />
      <path d="m3 9.5c0 1.933 1.566 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.566-3.5-3.5-3.5-3.5 1.567-3.5 3.5z" />
      <path d="m10 17.5c0-1.381-1.119-2.5-2.5-2.5h-2c-1.381 0-2.5 1.119-2.5 2.5v4.5h7z" />
    </svg>
  ),
  link: '/eps',
};

export default EPs;
