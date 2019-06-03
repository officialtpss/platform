import React from 'react';
import styled from 'styled-components';

const ReasonCard = ({title, children}) => (
  <StyledDiv>
    <div className="card-title">{title}</div>
    <div className="card-description">{children}</div>
  </StyledDiv>
)

const StyledDiv = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 45px;

  .card-title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 12px;
  }
`

export default ReasonCard
