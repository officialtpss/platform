import styled from 'styled-components';

export const TotalSummaryContainer = styled.div`
  border-width: 2px 0 0 0;
  border-color: ${props => props.theme.colors.paleGrey};
  border-style: solid;
  padding: 1rem 1.25rem;
  height: 100%;

  div {
    p {
      margin-bottom: 5px;

      &:first-child {
        width: 50%;
        text-align: right;
        margin-right: 10px;
      }
    }

    &.total {
      font-weight: bold;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    border-width: 0 0 0 2px;

    div {
      margin-bottom: 10px;

      p:first-child {
        width: auto;
        text-align: left;
      }
    }
  }

  @media screen and (min-width: 992px) {
    div p:first-child {
      width: 65%;
    }
  }
`;
