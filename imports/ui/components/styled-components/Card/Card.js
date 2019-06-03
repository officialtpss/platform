import React from 'react';
import styled from 'styled-components';
import { Card as CardRS } from 'reactstrap'

//https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap.css#L4138
const Card = styled(CardRS)`
  border: none;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05), 0 1px 6px 0 rgba(67,68,69,0.10);
`;

const PercentText = styled.div`
  color: ${props => props.theme.colors.darkBlue};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  @media(min-width: 992px) {
    font-size: 1.875rem;
  }
`;

export {
  Card,
  PercentText
};

export default Card;
