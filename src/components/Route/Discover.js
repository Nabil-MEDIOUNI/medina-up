import React from 'react';

const Discover = {
  title: 'Discover News',
  icon: () => (
    <svg
      style={{
        height: 24,
        transform: 'scale(1)',
        width: 24,
        opacity: 0.5,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
    >
      <path
        className="a"
        d="M10,10.559a1.419,1.419,0,1,0,2.007,0,1.419,1.419,0,0,0-2.007,0Zm1-10a11,11,0,1,0,11,11A11,11,0,0,0,11,.563Zm5.595,6.567-2.926,6.4a1.417,1.417,0,0,1-.7.7l-6.4,2.926A.877.877,0,0,1,5.405,16l2.927-6.4a1.417,1.417,0,0,1,.7-.7l6.4-2.926A.877.877,0,0,1,16.595,7.129Z"
        transform="translate(0 -0.563)"
      />
    </svg>
  ),
  icon_active: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 22 22"
      style={{
        opacity: 0.9,
      }}
    >
      <path
        className="a"
        d="M10,10.559a1.419,1.419,0,1,0,2.007,0,1.419,1.419,0,0,0-2.007,0Zm1-10a11,11,0,1,0,11,11A11,11,0,0,0,11,.563Zm5.595,6.567-2.926,6.4a1.417,1.417,0,0,1-.7.7l-6.4,2.926A.877.877,0,0,1,5.405,16l2.927-6.4a1.417,1.417,0,0,1,.7-.7l6.4-2.926A.877.877,0,0,1,16.595,7.129Z"
        transform="translate(0 -0.563)"
      />
    </svg>
  ),
  link: '/posts',
};

export default Discover;
