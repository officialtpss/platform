import styled from 'styled-components';
import { PrimaryButton } from '../Buttons';
import { H1 as Header1 } from '../Typography';

export const InvoicesHeader = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 991px){
    padding-top: 40px;
    justify-content: space-between;
  }
`;

export const FilterButton = styled(PrimaryButton)`
  border: 0;
  box-shadow: 0 1px 10px 0 rgba(67, 68, 69, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.8px;
  text-align: center;
  padding: 0.4em 1em;
  margin: 0 0 0 32px;
  outline: none;

  &:not([disabled]) {
    background: ${props => (props.primary ? props.theme.colors.blue : props.theme.colors.white)};
    color: ${props => (props.primary ? props.theme.colors.white : props.theme.colors.darkBlue)};
    &:hover {
      background: ${(props) => props.primary ? props.theme.colors.darkBlue : props.theme.colors.white};
      color: ${props => (props.primary ? props.theme.colors.white : props.theme.colors.darkBlue)};
    }
  }

  @media (max-width: 991px){
    margin: 0;
    span {
      display: none;
    }
  }
`;
