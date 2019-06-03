import React from 'react';

const Spinner = (props) => {
  return (
    <div className="spinner">
      <svg className="spinner-icon" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path className="logo-sign" fillRule="evenodd" d="M41 29c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zM38.9998 34v19M34.9998 34v11M43 35h-4v11h4c1.103 0 2.005-.902 2.005-2.005v-6.99C45.005 35.902 44.103 35 43 35z"/>
        <g>
          <circle className="outer-circle" cx="40" cy="40" r="34" />
          <circle className="inner-circle" cx="40" cy="40" r="22" />
        </g>
        <g>
          <circle className="dot1" cx="40" cy="6" r="4" />
          <circle className="dot2" cx="40" cy="74" r="4" />
        </g>
      </svg>
      <div className="overlay"></div>
    </div>
  );
};

export default Spinner;
