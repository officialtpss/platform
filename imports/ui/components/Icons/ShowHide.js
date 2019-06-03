import React from 'react';

const ShowHideIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Password</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="invoice-details" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="invoice-details-i-dt-auction-open-bid-individually" transform="translate(-567.000000, -459.000000)" strokeWidth="2" stroke={color}>
            <g id="comp-info-copy-2" transform="translate(566.000000, 459.000000)">
              <g id="Group-8">
                <g id="Page-1">
                  <path d="M19.1641,15 C19.1641,17.209 17.3731,19 15.1641,19 C12.9551,19 11.1641,17.209 11.1641,15 C11.1641,12.791 12.9551,11 15.1641,11 C17.3731,11 19.1641,12.791 19.1641,15 Z" id="Stroke-1"></path>
                  <path d="M25.1641,15 C25.1641,15 22.8961,20 15.1641,20 C7.4321,20 5.1641,15 5.1641,15 C5.1641,15 9.1641,10 15.1641,10 C21.1641,10 25.1641,15 25.1641,15 Z" id="Stroke-3"></path>
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

export default ShowHideIcon;
