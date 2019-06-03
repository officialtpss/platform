import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BaseButton = styled.button`
  display: ${(props) => props.block ? 'block' : false};
  width: ${(props) => props.block ? '100%' : false};
  margin-bottom: 0.5rem;
  padding: ${props => props.sm ? '8px 16px' : (props.md ? '13px 21.5px' : '16px 32px')};
  border-width: 2px;
  border-radius: 1px;
  transition: all .2s linear;
  text-transform: ${(props) => props.noTransform ? false : 'uppercase'};
  font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '16px')};
  font-weight: 700;
  line-height: 1;
  box-shadow: ${(props) => props.theme.button.boxShadow};
  &, &:active {
    border-style: solid;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    &, &:hover, &:focus {
      box-shadow: none;
      cursor: not-allowed;
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.paleGrey};
      color: ${(props) => props.outline ? props.theme.colors.paleGrey : props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.paleGrey};
    }
  }

  @media(max-width: 991px) {
    padding: ${props => props.sm ? '8px 16px' : (props.md ? '10px 16px' : '14px 25px')};
    font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '14px')};
  }
`;

BaseButton.propTypes = {
  block: PropTypes.bool,
  outline: PropTypes.bool,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  sm: PropTypes.bool,
};

const DefaultButton = styled(BaseButton)`
  &:not([disabled]) {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.coolGrey};
    border-color: ${(props) => props.theme.colors.coolGrey};
    &:hover {
      background: transparent;
      color: ${(props) => props.theme.colors.coolGrey};
      border-color: ${(props) => props.theme.colors.coolGrey};
    }
  }
`;

export const LinkButton = styled(BaseButton)`
  display: inline-block;
  background: none;
  color: ${(props) => props.theme.colors.blue};

  &, &:focus {
    box-shadow: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.darkBlue};
  }
  &, &[disabled] {
    &, &:hover{
      border-color: transparent;
    }
  }
  &[disabled] {
    &, &:hover, &:focus{
      background: none;
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }
`;

export const PrimaryButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.outline ? props.theme.colors.blue : props.theme.colors.white};
    &:hover {
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkBlue};
      border-color: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.outline ? props.theme.colors.darkBlue : props.theme.colors.white};
    }
  }
`;

export const SuccessButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.green};
    border-color: ${(props) => props.theme.colors.green};
    color: ${(props) => props.outline ? props.theme.colors.green : props.theme.colors.white};
    &:hover{
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkGreen};
      border-color: ${(props) => props.theme.colors.darkGreen};
      color: ${(props) => props.outline ? props.theme.colors.darkGreen : props.theme.colors.white};
    }
  }
`;

export const DangerButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.red};
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.outline ? props.theme.colors.red : props.theme.colors.white};
    &:hover{
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.red};
      border-color: ${(props) => props.theme.colors.red};
      color: ${(props) => props.outline ? props.theme.colors.red : props.theme.colors.white};
    }
  }
`;

export const SwitchButtonItem = styled(BaseButton)`
  margin: 10px 0;
  padding: 3px 15px;
  font-size: 0.9em;
  font-weight: 300;
  border-width: 1px;
  line-height: 20px;
  &:not([disabled]){
    background: ${(props) => props.active?props.theme.newColors.primary:props.theme.newColors.white};
    border-color: ${(props) => props.active?props.theme.newColors.primary:props.theme.newColors.gray};
    color: ${(props) => props.active?props.theme.newColors.white:props.theme.colors.black};

    &:hover{
      background: ${(props) => props.theme.newColors.primaryHover};
      border-color: ${(props) => props.theme.newColors.primaryHover};
      color: ${(props) => props.theme.newColors.white};
    }
  }
`;

export const ButtonLink = styled(Link)`
  display: ${(props) => props.block ? 'block' : 'inline-block'};
  width: ${(props) => props.block ? '100%' : false};
  margin-bottom: 0.5rem;
  padding: ${props => props.sm ? '8px 16px' : (props.md ? '13px 21.5px' : '16px 32px')};
  border-width: 2px;
  border-radius: 1px;
  transition: all .2s linear;
  text-transform: uppercase;
  font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '16px')};
  font-weight: 700;
  line-height: 1;
  box-shadow: ${(props) => props.theme.button.boxShadow};
  text-decoration: none;
  &, &:active {
    border-style: solid;
    text-decoration: none;
  }
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
  &:focus {
    outline: none;
    text-decoration: none;
  }
  &[disabled] {
    &, &:hover, &:focus {
      box-shadow: none;
      cursor: not-allowed;
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.paleGrey};
      color: ${(props) => props.outline ? props.theme.colors.paleGrey : props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.paleGrey};
      text-decoration: none;
    }
  }
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.outline ? props.theme.colors.blue : props.theme.colors.white};
    &:hover {
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkBlue};
      border-color: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.outline ? props.theme.colors.darkBlue : props.theme.colors.white};
    }
  }

  @media(max-width: 991px) {
    padding: ${props => props.sm ? '8px 16px' : (props.md ? '10px 16px' : '14px 25px')};
    font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '14px')};
  }
`;

export const FundButton = styled.button`
  background-color: #78c58c;
  padding: 10px;
  color: white;
  margin-top: 5px;
  cursor: pointer;
  &:focus {
    outline: none;
    text-decoration: none;
  }
`;

export default DefaultButton;
