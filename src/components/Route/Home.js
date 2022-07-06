import React from 'react';

const Home = {
  title: 'Home Page',
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
      <path d="m23 9v2h-2v7c0 1.7-1.3 3-3 3h-4v-6h-4v6h-4c-1.7 0-3-1.3-3-3v-7h-2v-2l11-7z" />
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
      <path d="m23 9v2h-2v7c0 1.7-1.3 3-3 3h-4v-6h-4v6h-4c-1.7 0-3-1.3-3-3v-7h-2v-2l11-7z" />
      <path d="m20 2h-3v3.2l3 1.9z" />
    </svg>
  ),
  link: '/',
};

export default Home;
