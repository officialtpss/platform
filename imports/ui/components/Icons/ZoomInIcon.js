import React from 'react';
import PropTypes from 'prop-types';

const ZoomInIcon = ({color="#fff", width = 30, height=30, ...props}) => {
  return(
    <svg width={width} height={height} viewBox="0 0 30 30" {...props}>
      <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-1309.000000, -715.000000)">
        <g  transform="translate(584.000000, 272.000000)" stroke={color} strokeWidth="2">
          <g  transform="translate(720.000000, 438.000000)">
            <g  transform="translate(5.000000, 5.000000)">
              <g  transform="translate(3.000000, 3.000000)">
                <path d="M20,10 C20,15.522 15.523,20 10,20 C4.477,20 0,15.522 0,10 C0,4.478 4.477,0 10,0 C15.523,0 20,4.478 20,10 Z" />
                <path d="M17,17 L25,25" />
                <path d="M10,5 L10,15" />
                <path d="M15,10 L5,10" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};


ZoomInIcon.propsTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
export default ZoomInIcon;
