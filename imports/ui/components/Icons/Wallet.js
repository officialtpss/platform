import React from 'react';

const WalletIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
     xlink="http://www.w3.org/1999/xlink">
        <title>Wallets</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="b-header" transform="translate(-1227.000000, -12.000000)" fill={color}>
            <g id="header">
              <g id="Group" transform="translate(690.000000, 0.000000)">
                <g id="menu" transform="translate(110.000000, 12.000000)">
                  <g id="Group-5" transform="translate(427.000000, 0.000000)">
                    <path d="M15.1865,6.374 L10.2375,6.374 L24.6595,0 L27.6365,6.374 L25.4295,6.374 L24.5585,4.51 L23.5915,4.918 C23.0825,5.133 22.4965,4.895 22.2815,4.386 L21.8735,3.418 L15.1865,6.374 Z M27.9995,26.374 L8.9995,26.374 L8.9995,10.374 L27.9995,10.374 L27.9995,13.374 L22.9995,13.374 C21.8975,13.374 20.9995,14.271 20.9995,15.374 L20.9995,21.374 C20.9995,22.477 21.8975,23.374 22.9995,23.374 L27.9995,23.374 L27.9995,26.374 Z M28.9995,21.374 L27.9995,21.374 L22.9995,21.374 L22.9995,15.374 L27.9995,15.374 L28.9995,15.374 L28.9995,21.374 Z M30.9995,13.374 L29.9995,13.374 L29.9995,10.374 C29.9995,9.271 29.1025,8.374 27.9995,8.374 L8.9995,8.374 C7.8975,8.374 6.9995,9.271 6.9995,10.374 L6.9995,26.374 C6.9995,27.477 7.8975,28.374 8.9995,28.374 L27.9995,28.374 C29.1025,28.374 29.9995,27.477 29.9995,26.374 L29.9995,23.374 L30.9995,23.374 L30.9995,13.374 Z" id="Fill-1"></path>
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

export default WalletIcon;
