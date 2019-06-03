import React from 'react'
import styled from 'styled-components'

export const Block = styled.div`
  background: ${props => (props.invert ? props.theme.colors.secondary : 'white')};
  text-align: ${props => (props.center ? 'center' : false)};
  padding: 40px 30px 30px;
  margin-bottom: ${props => (props.headerForAnotherBlock ? 0 : '20px')};
  @media(max-width: 576px) {
    padding: 20px 10px;
  }
`;

export const Card = styled.div`
  background: ${props => (props.invert ? props.theme.colors.secondary : 'white')};
  text-align: ${props => (props.align ? props.align : false)};
  padding: 30px 30px 20px;
  box-shadow: 0px 0px 4px 4px rgba(0,0,0,0.05);
`;

export const MCard = styled.div`
  background: ${props => (props.invert ? props.theme.colors.secondary : 'white')};
  text-align: ${props => (props.align ? props.align : false)};
  box-shadow: 0px 0px 4px 4px rgba(0,0,0,0.05);
  position: relative;
  .card-header {
    border-bottom: 2px solid #E1E5EB;
    padding: 1.25rem;
    background-color: transparent;
  }
  .card-title {
    color: #212529;
    opacity: 0.7;
    font-size: 1.2rem;
    font-family: 'Helvetica',sans-serif;
    text-transform: uppercase;
    padding-left: 20px;
  }
  .title-main {
    flex: 1 1 auto;
  }
  .currency-selector {
    margin-right: 76px;
  }
  .card-right-icon {
    position: absolute;
    right: 15px;
    top: 0;
    height: calc(100% - 2px);
    width: 75px;
    background-color: rgba(245, 247, 250, 3);
    border-left: 2px solid #E1E5EB;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-body {
    padding: 40px 40px 20px;
  }
  @media(max-width: 767px) {
    .card-body {
      padding: 20px;
    }
  }
  @media(max-width: 576px) {
    .card-body {
      padding: 15px 5px 10px;
    }
  }
`;

export const PageHeader = styled.div`
  width: 100%;
  display: block;
  position: relative;
  background-color: ${props => (props.invert ? props.theme.colors.secondary : 'white')};
  text-align: ${props => (props.center ? 'center' : false)};
  padding: 20px 30px 20px;
  margin-bottom: ${props => (props.headerForAnotherBlock ? 0 : '20px')};
  box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  @media(max-width: 1199px) {
    background-size: 350px;
  }
  @media(max-width: 767px) {
    padding-top: 180px;
    background-position: 'top center';
    background-size: auto;
  }
`;

export const PageHeaderBGImg = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -60px;
  bottom: 0;
  background-image: ${props => (props.src ? 'url(' + props.src + ')' : false)};
  background-repeat: no-repeat;
  background-position: ${props => (props.position ? props.position : 'top left')};
`;

export const Footer = styled.footer`
  padding: 1rem 0 0;
  background-color: ${props => props.theme.colors.darkGrey };
  p {
    font-size: 14px;
  }
`;

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.purple };
`;

export const Content = styled.div`
  min-height: calc(100vh - 112px);
  .app & {
    min-height: calc(100vh - 126px);
  }
  .app .reset-page & {
    min-height: unset;
  }
`;

export const UnderLineDiv = styled.div`
  border-bottom: solid 2px #E1E5EB;
  height: ${props => props.heightAuto ? 'auto' : 'calc(2.25rem + 2px)' };
`;

export const SidebarBody = styled.div`
  padding: 16px;
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
  background-color: #2b3f5c;

  @media screen and (max-width: 991px) {
    bottom: 56px;
  }
`;
