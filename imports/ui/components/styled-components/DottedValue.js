import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const dottedValue = ({color, children, className, ...props}) => {
  return (
    <span className={className} style={{borderBottomColor: color}} {...props}>{children}</span>
  );
};

dottedValue.propTypes = {
  color: PropTypes.string,
  primary: PropTypes.number,
  size: PropTypes.number,
};

export const DottedValue = styled(dottedValue)`
    border-bottom: 2px dotted ${props => props.primary ? props.theme.newColors.primary :props.theme.newColors.gray};
    color: ${props => props.primary ? props.theme.newColors.primary : undefined};
    cursor: pointer;
    font-size: ${props => props.size ? `${props.size}px` : '1rem'};
`;

export default DottedValue;
