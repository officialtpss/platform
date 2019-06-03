import React from 'react';
import styled from 'styled-components';
import { CardTitle as CardTitleRS } from 'reactstrap';

const CardTitle = styled(CardTitleRS)`
  /* invoice receivables: */
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #A5ACB5;
  letter-spacing: 0;
  line-height: 1.71;
  font-size: 14px;
  text-transform: uppercase;
`;

export default CardTitle;
