import React from 'react';
import styled from 'styled-components';

const InvoiceCheckParagraph = ({children}) => {
  return (
    <StyledPara>
      <img src="/img/checked.svg" />
      <span>{children}</span>
    </StyledPara>
  )
}

const StyledPara = styled.p`
  display: flex;
  align-items: flex-start;

  img {
    padding: 5px;
  }
`

export default InvoiceCheckParagraph
