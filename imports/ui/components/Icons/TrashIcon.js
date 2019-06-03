import React from 'react';
import PropTypes from 'prop-types';

const TrashIcon = ({color="#A5ACB5", width = 30, height=30, ...props}) => {
  return(
    <svg width={width} height={height} viewBox="0 0 30 30" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1083.000000, -647.000000)" strokeWidth="2" stroke={color}>
          <g transform="translate(713.000000, 616.000000)">
            <g transform="translate(370.000000, 31.000000)">
              <g transform="translate(4.000000, 3.000000)">
                <polygon points="3 23 19 23 19 4 3 4"/>
                <path d="M0,4 L22,4" />
                <path d="M7,4 C7,1.791 8.791,0 11,0 C13.209,0 15,1.791 15,4" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};


TrashIcon.propsTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
export default TrashIcon;
