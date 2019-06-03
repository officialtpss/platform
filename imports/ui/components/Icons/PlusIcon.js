import React from 'react';
import PropTypes from 'prop-types';


const PlusIcon = ({color = '#5CA0F6', width = 20, height = 20}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20">
      <g id="admin-user-details-general-seller" stroke="none" strokeWidth="1"
         fill="none" fillRule="evenodd" transform="translate(-502.000000, -328.000000)">
        <g id="Group-10" transform="translate(470.000000, 296.000000)"
           stroke={color} strokeWidth="2">
          <g id="Page-1" transform="translate(32.000000, 32.000000)">
            <path d="M10,0 L10,20" id="Stroke-1"/>
            <path d="M20,10 L0,10" id="Stroke-3"/>
          </g>
        </g>
      </g>
    </svg>

  );
};

PlusIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PlusIcon;
