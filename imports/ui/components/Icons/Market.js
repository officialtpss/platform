import React from 'react';

const MarketIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
     xlink="http://www.w3.org/1999/xlink">
        <title>Market</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="b-header" transform="translate(-1123.000000, -12.000000)" fill={color}>
            <g id="header">
              <g id="Group" transform="translate(690.000000, 0.000000)">
                <g id="menu" transform="translate(110.000000, 12.000000)">
                  <g id="current" transform="translate(322.000000, 0.000000)">
                    <g id="Group-2" transform="translate(1.000000, 0.000000)">
                      <path d="M17,12 C17.553,12 18,11.553 18,11 C18,10.447 17.553,10 17,10 L9,10 C8.447,10 8,10.447 8,11 C8,11.553 8.447,12 9,12 L17,12 Z M9,6 C8.447,6 8,6.447 8,7 C8,7.553 8.447,8 9,8 L17,8 C17.553,8 18,7.553 18,7 C18,6.447 17.553,6 17,6 L9,6 Z M33,25 L33,19 L32,19 C31.447,19 31,18.553 31,18 L31,17 L13,17 L13,18 C13,18.553 12.553,19 12,19 L11,19 L11,25 L12,25 C12.553,25 13,25.447 13,26 L13,27 L31,27 L31,26 C31,25.447 31.447,25 32,25 L33,25 Z M9,29 L35,29 L35,15 L9,15 L9,29 Z M5,24 L7,24 L7,26 L3,26 L3,1 L23,1 L23,13 L21,13 L21,3 L5,3 L5,24 Z" id="Page-1-Copy"></path>
                      <path d="M22,24 C23.1045695,24 24,23.1045695 24,22 C24,20.8954305 23.1045695,20 22,20 C20.8954305,20 20,20.8954305 20,22 C20,23.1045695 20.8954305,24 22,24 Z M22,26 C19.790861,26 18,24.209139 18,22 C18,19.790861 19.790861,18 22,18 C24.209139,18 26,19.790861 26,22 C26,24.209139 24.209139,26 22,26 Z" id="Oval-4" fillRule="nonzero"></path>
                    </g>
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

export default MarketIcon;
