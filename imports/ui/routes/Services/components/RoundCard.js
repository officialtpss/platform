import React from 'react';
import styled from 'styled-components';

const RoundCard = (props) => (
  <StyledDiv {...props}>
    <div className="round-wrapper">
      <div className="last-wrapper">
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  </StyledDiv>
)

const StyledDiv = styled.div`
  width: 255px;
  height: 255px;
  border-radius: 125px;
  border: solid 4px white;
  filter: drop-shadow(0px 5px 5px black);
  display: inline-block;
  margin-right: 21px;
  margin-left: 21px;

  .round-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 125px;
    padding: 12px;
    background-image: linear-gradient(to right, #273442 0%, #385BB3 100%);
    
    .last-wrapper {
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 125px;
      display: flex;
      justify-content: center;
      align-items: center;

      .content {
        width: 180px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;;
        text-align: center;
      }
    }
  }
`

export default RoundCard;
