import React from 'react';

const Error = () => {
  return (
    <svg
      className="noselect"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 50 50"
      style={{ enableBackground: 'new 0 0 50 50', width: '25px' }}
      xmlSpace="preserve"
    >
      <circle className="noselect" style={{ fill: '#FB5A36' }} cx="25" cy="25" r="25" />
      <polyline
        style={{
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeMiterlimit: '10'
        }}
        points="16,34 25,25 34,16"
      />
      <polyline
        style={{
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeMiterlimit: '10'
        }}
        points="16,16 25,25 34,34"
      />
    </svg>
  );
};
export default Error;
