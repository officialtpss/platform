import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  width: ${props => props.width}px;
  height: 4px;
  background-color: ${props => props.color};
`

export default Divider
