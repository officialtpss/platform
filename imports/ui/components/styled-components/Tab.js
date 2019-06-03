import React from 'react';
import styled from 'styled-components';

// styled.tab is a function that returns a tab, assigning it to Tab creates a React
// component.
const Tab = styled.button.attrs({
  fontSize: props => props.size || '1em',
  type: props => `${props.type}` || 'button',
  disabled: props => !!props.disabled
})`
  position: relative;
  width: ${props => props.width || false};
  font-size: ${props => props.size || '1em'};
  background: #fff;
  color: ${props => props.theme.colors.primary };
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
  border: ${props => `1px solid ${props.theme.colors.primary}`};
  border-radius: 0px;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  letter-spacing: 1px;
  // Pseudo selectors work as well
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: #fff !important;
  }
  &:disabled {
    background: #77adf2;
    color: #fff;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  &.active {
    background: ${props => props.theme.colors.primary};
    color: #fff !important;
    border-color: ${props => props.theme.colors.primary};
    > i {
      display: inline-block;
    }
  }
  i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    display: none;
  }
  @media(max-width: 479px) {
    font-size: 0.7em;
    padding: 0.5em 0.8em 0.5em 1.2em;
    letter-spacing: 0px;
    i {
      left: 5px;
    }
  }
`;
export default Tab;
