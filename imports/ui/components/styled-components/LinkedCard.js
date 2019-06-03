import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  outline: none;
  &:hover, &:active, &:focus {
    text-decoration: none;
  }
`;

export const LinkedCard = styled(Card)`
  margin-bottom: 8px;
  padding: 15px;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 8px 0 rgba(67,68,69,0.15);
  transition: box-shadow .2s linear;
  // Pseudo selectors work as well
  &:hover {
    box-shadow: 0 1px 4px 0 rgba(63,119,191,0.30), 0 1px 20px 0 rgba(63,119,191,0.25);
  }
  @media (max-width: 768px){
    margin-bottom: 20px;
  }
`;
