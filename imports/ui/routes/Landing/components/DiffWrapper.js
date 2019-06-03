import React from 'react'
import styled from 'styled-components'
import Divider from './Divider'

export default DiffWrapper = ({
  children,
  className,
  bgColor,
  titleColor,
  titleSrc,
  title,
  ctxColor,
  zIndex
}) => {
  return (
    <StyledWrapper
      className={`diff-wrapper ${className}`}
      bgColor={bgColor}
      titleColor={titleColor}
      ctxColor={ctxColor}
      zIndex={zIndex}
    >
      <div className="main-container">
        <div className="title">
          <span className="title-img">
            <img src={titleSrc} />
          </span>
          <span>{title}</span>
        </div>
        <Divider color={ctxColor} className="underline" width="150" />
        <i className="description">{children}</i>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  &.diff-wrapper {
    background-color: ${props => props.bgColor};
    filter: drop-shadow(0 0 10px black);
    z-index: ${props => props.zIndex};
    position: relative;
    padding: 50px 140px;

    .main-container {
      overflow-x: hidden;
      .title {
        font-size: 36px;
        font-weight: bold;
        width: 100%;
        display: flex;
        align-items: center;
        color: ${props => props.titleColor};
  
        .title-img {
          display: inherit;
          margin-right: 15px;
          width: 32px;
          height: 32px;
        }
      }

      .underline {
        margin-bottom: 15px;
      }
  
      .description {
        color: ${props => props.ctxColor};
        font-size: 18px;
      }
    }
  }
`
