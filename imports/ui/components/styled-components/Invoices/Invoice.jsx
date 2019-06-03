import styled from 'styled-components';
import { Card, NavItem } from 'reactstrap';
import ReactSwitch from 'react-switch';

export const Text = styled.div`
  font-family: ${props => props.theme.font};
  font-size: ${props => (props.size ? props.size : '14px')};
  color: ${props => {
    switch(props.type) {
      case 'grey':
        return props.theme.colors.grey;
      case 'darkgrey':
        return props.theme.colors.darkGrey;
      case 'blue':
        return props.theme.newColors.primary;
      case 'red':
        return props.theme.colors.red;
      case 'darkblue':
        return props.theme.colors.darkBlue;
      default:
        return props.theme.colors.black;
    }
  }};
  font-weight: ${props => (props.weight ? props.weight : '400')};
  display: ${props => (props.display ? props.display : 'block')};
  text-transform: ${props => (props.transform ? props.transform : 'initial')}
`;

export const StatusCard = styled(Card)`
  border: none;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05), 0 1px 6px 0 rgba(67,68,69,0.10);
  margin-bottom: 20px;

  @media screen and (max-width: 575px) {
    text-align: center;
    margin-bottom: 0;
  }
`;

export const BidCard = styled(Card)`
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05), 0 1px 6px 0 rgba(67,68,69,0.10);
  margin-bottom: 20px;
`;

export const TabItem = styled(NavItem)`
  font-size: 14px;

  a.nav-link {
    border-radius: 0;
    padding: 1rem;
    text-transform: uppercase;
    color: ${props => props.theme.newColors.primary};
    border-color: #fff #fff #E1E5EB #fff;
    cursor: pointer;

    img {
      margin-right: 10px;
    }

    &:hover {
      color: ${props => props.theme.newColors.primary};
    }
    &.active {
      color: ${props => props.theme.colors.grey};
    }
  }

  &:first-child {
    .nav-link.active {
      border-color: #fff #E1E5EB #fff #fff;
    }
  }
  &:last-child {
    .nav-link.active {
      border-color: #fff #fff #fff #E1E5EB;
    }
  }
`;

export const Switch = styled(ReactSwitch)`
  vertical-align: text-bottom;
  text-align: left !important;

  .react-switch-bg {
    border: 1px solid #E1E5EB;
    border-radius: 0 !important;
  }
`;

export const CurrencyCard = styled.div`
  position: absolute;
  // top: 115px;
  top: 80px;
  right: 0;
  border: none;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05), 0 1px 6px 0 rgba(67,68,69,0.10);
  margin: 0;
  background: #FFF;

  .item {
    display: inline-block;
    padding: 8px 15px;
  }
  button {
    border-left: solid 2px #e1e5eb !important;
    padding: 5px 25px;
    margin: 0 0 0 15px;
  }

  @media screen and (max-width: 991px){
    display: ${props => (props.mobile ? 'none':'block')};
  }

  @media screen and (max-width: 991px) {
    top: 50px;
    right: 0;
    width: 100%;
    button {
      float: right;
      padding: 5px 20px;
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 479px) {
    .item:not(:first-child) {
      display: none;
    }
    button {
      padding: 5px 15px;
      margin: 0;
    }
  }
`;

export const CurrencyDesc = styled.div`
  position: absolute;
  // top: 168px;
  top: 132px;
  right: 28px;
  font-size: 14px;

  @media screen and (max-width: 991px){
    display: ${props => (props.mobile ? 'none':'block')};
  }
`;

export const CurrencyPadDesc = styled.div`
  display: none;

  @media screen and (max-width: 991px){
    display: block;
  }
  @media screen and (max-width: 479px){
    display: none;
  }
`;

export const CurrencyMobileDesc = styled.div`
  display: none;

  @media screen and (max-width: 479px){
    display: block;
  }
`;
