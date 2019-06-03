import React from 'react';
import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${props => (props.invert ? 'white' : props.theme.colors.naviBlue)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  @media(min-width: 992px) {
    font-size: 2rem;
  }
`;

export const H2 = styled.h2`
  color: ${props => (props.invert ? 'white' : props.theme.colors.slateGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  @media(min-width: 992px) {
    font-size: 1.375rem;
  }
`;

export const H3 = styled.h3`
  color: ${props => (props.invert ? 'white' : props.theme.colors.coolGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  @media(min-width: 992px) {
    font-size: 1.25rem;
  }
`;

export const H4 = styled.h4`
  color: ${props => (props.invert ? 'white' : props.theme.colors.coolGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
`;

export const Lead = styled.div`
  color: ${props => (props.invert ? 'white' : props.theme.colors.charcoalGrey)};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 16px;
  word-break: break-all;
  @media(min-width: 992px) {
    font-size: 1.11875rem;
  }
`;

const getColor = props => (props.invert
    ? 'white'
    : ( props.green
        ? props.theme.colors.green
        : ( props.cool
            ? props.theme.colors.coolGrey
            : (props.slate
                ? props.theme.colors.slateGrey
                : props.theme.colors.charcoalGrey
            )
        )
    )
);

export const ColorDiv = styled.div`
  color: ${getColor};
  font-size: ${props => props.fontSize || 16};
`;

export const PrimaryText = styled.span`
  color: ${props =>  props.theme.newColors.primary};
`;

export const P = styled.p`
  color: ${getColor};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  @media(min-width: 992px) {
    font-size: 1rem;
  }
`;

export const Small = styled.div`
  display: ${props => (props.inline ? 'inline' : 'block')};
  color: ${props => props.inheritColor ? 'inherit' : props.theme.colors.slateGrey};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
`;

export const LABEL = styled.label`
  color: ${props => props.theme.colors.slateGrey};
  line-height: 1.2;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.75rem;
`;

export const Mute = styled.div`
  color: ${props => props.theme.colors.coolGrey};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: ${(props) => props.fontSize + 'px' || '0.75rem'};
  @media(min-width: 992px) {
    font-size: ${(props) => props.fontSize  + 'px' || '0.875rem'};
  }
`;

export const LinkText = styled.span`
  display: ${props => (props.inline ? 'inline' : 'block')};
  color: ${props => props.theme.colors.blue};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  @media(min-width: 992px) {
    font-size: 1rem;
  }

  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`;

export const LabelText = styled.div`
  color: ${props => props.theme.colors.naviBlue};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 15px;
  @media(min-width: 992px) {
    font-size: 1.2725rem;
  }
`;

export const NaviText = styled.div`
  color: ${props => (props.invert ? 'white' : props.theme.colors.naviBlue)};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 13px;
  @media(min-width: 992px) {
    font-size: 1.11875rem;
  }
`;

export const DangerText = styled.div`
  font-size: 16px;
  font-family: 'PT Sans', sans-serif;
  line-height: 1.5;
  color: ${props => props.theme.colors.red};
`;

export const DangerTextSpan = styled.span`
  color: ${props => props.theme.colors.red};
`;

export const Wrap = styled.p`
  color: ${props => (props.invert ? 'white' : props.theme.colors.black)};
  opacity: ${props => props.opacity};
  font-size: 1rem;
  font-weight: bold;
  font-family: 'PT Sans', sans-serif;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;
