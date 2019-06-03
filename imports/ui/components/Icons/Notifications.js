import React from 'react';

const NotificationsIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="38px" height="30px" viewBox="0 0 38 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Notifications</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="b-header" transform="translate(-708.000000, -12.000000)" strokeWidth="2" stroke={color}>
            <g id="header">
              <g id="Group" transform="translate(690.000000, 0.000000)">
                <g id="submenu" transform="translate(0.000000, 6.000000)">
                  <g id="news-active">
                    <g id="news" transform="translate(18.000000, 6.000000)">
                      <polygon id="Stroke-1" points="31.4594 18.0144 16.8404 21.0924 12.0694 12.9364 21.9184 1.7024"></polygon>
                      <path d="M12.2661,23.7683 L16.8401,21.0923 L12.0701,12.9363 L7.4951,15.6123 C7.0191,15.8903 6.8581,16.5023 7.1371,16.9803 L10.8981,23.4103 C11.1761,23.8863 11.7891,24.0463 12.2661,23.7683 Z" id="Stroke-3"></path>
                      <path d="M14.1215,22.6824 L19.4595,28.1104" id="Stroke-5" strokeLinecap="round"></path>
                      <path d="M24.3032,5.781 C26.5562,4.464 29.4492,5.221 30.7672,7.473 C32.0842,9.725 31.3262,12.619 29.0742,13.936 L24.3032,5.781 Z" id="Stroke-7"></path>
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

export default NotificationsIcon;
