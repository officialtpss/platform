import React from 'react';

const DashboardIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
     xlink="http://www.w3.org/1999/xlink">
        <title>Dashboard</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="b-header" transform="translate(-915.000000, -12.000000)" fill={color}>
            <g id="header">
              <g id="Group" transform="translate(690.000000, 0.000000)">
                <g id="menu" transform="translate(110.000000, 12.000000)">
                  <g id="Group-3" transform="translate(115.000000, 0.000000)">
                      <path d="M22,16 L33,16 L33,17 C33,23.617 27.617,29 21,29 C19.596,29 18.253,28.745 17,28.3 L17,26.159 C18.226,26.697 19.578,27 21,27 C26.176,27 30.447,23.046 30.95,18 L20,18 L20,7.05 C16.73,7.376 13.927,9.289 12.353,12 L10.105,12 C12.006,7.876 16.169,5 21,5 L22,5 L22,16 Z M9,16 L13,16 L13,27 L9,27 L9,17 L9,16 Z M3,27 L7,27 L7,19 L3,19 L3,27 Z M7,17 L1,17 L1,29 L7,29 L9,29 L15,29 L15,14 L7,14 L7,17 Z M26,12 L26,3.05 C30.717,3.521 34.48,7.283 34.95,12 L26,12 Z M25,1 L24,1 L24,14 L37,14 L37,13 C37,6.383 31.617,1 25,1 L25,1 Z" id="Page-1"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div className="overlay"></div>
    </div>
  );
};

export default DashboardIcon;
