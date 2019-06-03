import React from 'react';
import styled from 'styled-components';

class InvoiceCard extends React.Component {
  render() {
    const { title, direction, imgSrc, children } = this.props

    return (
      <StyledDiv direction={direction}>
        <div className="content-wrapper">
          <div className="title">{title}</div>
          <div className="description">
            {children}
          </div>
        </div>

        <div className="img-wrapper">
          <img src={imgSrc} />
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .content-wrapper {
    flex-basis: 49.5%;

    .title {
      font-size: 24px;
      line-height: 32px;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .description {
      font-size: 14px;
    }
  }

  .img-wrapper {
    flex-basis: 49.5%;
    order: ${props => props.direction == 'left' ? 1 : -1 };

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export default InvoiceCard
