import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap'

const CustomButton = ({className, children, onClick}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  background-color: transparent;
  font-size: 18px;
  border-radius: 50px;
  border: none;
  padding: 8px 30px;
  text-decoration: none;
  color: white;

  &.active {
    background-color: #42B6FB !important;
    font-weight: bold;
  }

  &:hover {
    background-color: #42B6FB !important;
    color: white !important;
    font-weight: bold;
    text-decoration: none;
  }
`

export default CustomButton
