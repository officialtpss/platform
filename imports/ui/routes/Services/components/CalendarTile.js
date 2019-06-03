import React from 'react';
import styled from 'styled-components';

class CalendarTile extends React.Component {
  render() {
    const { imgSrc, title, payAmount, year } = this.props
    return (
      <StyledDiv>
        <div className="image-wrapper">
          <img src={imgSrc} />
          <div className="year">{year}</div>
        </div>
        <div className="title">{title}</div>
        <div className="pay-amount">{payAmount}</div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  display: inline-block;
  text-align: center;
  font-weight: bold;

  .image-wrapper {
    position: relative;

    img {
      margin-bottom: 10px;
    }

    .year {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .title {
    color: #589DF9;
  }
`

export default CalendarTile
