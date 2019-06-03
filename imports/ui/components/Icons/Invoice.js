import React from 'react';

const Invoice = (props) => {
  const {color} = props;
  return (
  <div className="text-center">
    <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
   xlink="http://www.w3.org/1999/xlink">
      <title>Invoice</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      {/* <use xlinkHref="/img/icons/ico-invoice.svg#Group-15" transform="translate(-148.000000, -1455.000000)" stroke-width="2" stroke="green" fill="#2b3f5c"></use> */}
      <g id="wallets" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
        <g id="wallets-i-dt" transform="translate(-148.000000, -1455.000000)" strokeWidth="2" stroke={color}>
          <g id="Group-15" transform="translate(124.000000, 940.000000)">
            <g id="transact-table" transform="translate(0.000000, 117.000000)">
              <g id="Group-12-Copy-5" transform="translate(0.000000, 377.000000)">
                <g id="Group-23" transform="translate(24.000000, 12.000000)">
                  <g id="Group-21" transform="translate(0.000000, 9.000000)">
                    <g id="Page-1" transform="translate(11.000000, 3.000000)">
                      <polygon id="Stroke-1" points="18 23 0 23 0 0 15 0 18 3"></polygon>
                      <path d="M5,7 L13,7" id="Stroke-3"></path>
                      <path d="M5,12 L13,12" id="Stroke-4"></path>
                      <path d="M5,17 L8,17" id="Stroke-5"></path>
                      <path d="M15,0 L15,2.5 C15,2.776 15.224,3 15.5,3 L18,3" id="Stroke-6"></path>
                    </g>
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

export default Invoice;
