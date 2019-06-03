import React from 'react';

const LoadMoreSpinner = (props) => {
  return (
    <div className="load-more-spinner">
      <svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" className="m-r-10">
      <g id="my-invoices" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="my-invoices-i-dt" transform="translate(-598.000000, -1440.000000)" strokeWidth="2" stroke="#5CA0F6">
          <g id="invoices" transform="translate(14.000000, 581.000000)">
            <g transform="translate(104.000000, 53.000000)" id="Group-2">
              <g transform="translate(0.000000, 808.000000)">
                <g id="Group-13" transform="translate(482.000000, 0.000000)">
                  <g id="Group-16">
                    <g id="loader" className="animate-path" transform="translate(21.000000, 21.000000) rotate(-20.000000) translate(-21.000000, -21.000000) translate(5.000000, 5.000000)">
                      <path d="M16,32 C7.164,32 0,24.837 0,16 C0,12.396 1.192,9.069 3.204,6.394" id="Stroke-1" strokeLinecap="round"></path>
                      <path d="M16,0 C24.836,0 32,7.163 32,16 C32,19.604 30.808,22.931 28.797,25.605" id="Stroke-3" strokeLinecap="round"></path>
                      <path d="M24,16 C24,20.418 20.418,24 16,24 C11.582,24 8,20.418 8,16 C8,11.582 11.582,8 16,8 C20.418,8 24,11.582 24,16 Z" id="Stroke-5"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      </svg>
      { props.text }
    </div>
  );
};

export default LoadMoreSpinner;
