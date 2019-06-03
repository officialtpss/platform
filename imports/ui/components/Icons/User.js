import React from 'react';

const UserIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
     xlink="http://www.w3.org/1999/xlink">
        <title>User</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="menu" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="dt-menu" transform="translate(-1146.000000, -723.000000)" strokeWidth="2" stroke={color}>
            <g id="menu" transform="translate(1136.000000, 0.000000)">
              <g id="Group">
                <g transform="translate(10.000000, 723.000000)">
                  <g id="Group-2">
                    <g id="icon" transform="translate(5.000000, 4.000000)">
                      <path d="M9.4703,14 L9.4703,14 C6.7203,14 4.4703,11.484 4.4703,8.41 L4.4703,5.589 C4.4703,2.515 6.7203,0 9.4703,0 C12.2203,0 14.4703,2.516 14.4703,5.59 L14.4703,8.411 C14.4703,11.485 12.2203,14 9.4703,14 Z" id="Stroke-1"></path>
                      <path d="M6.4703,13 C2.0363,14.5 0.0003,17.227 0.0003,22" id="Stroke-3"></path>
                      <path d="M18.94,22 C18.94,17.227 16.731,14.5 12.47,13" id="Stroke-5"></path>
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

export default UserIcon;
