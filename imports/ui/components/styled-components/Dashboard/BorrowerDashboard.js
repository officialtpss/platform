import styled from 'styled-components';
import { Table } from 'reactstrap';

export const CurrencyLabel = styled.span`
  color: ${props => props.theme.colors.coolGrey};
  line-height: 1;
  letter-spacing: 0.8px;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: normal;
  text-transform: initial;
`;

export const ComingPaymentContainer = styled.div`
  border-width: 0 0 0 2px;
  border-color: ${props => props.theme.colors.paleGrey};
  border-style: solid;
  height: 100%;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .coming {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .alarm {
      width: 24px;
      height: 26px;
      margin: 10px;
    }

    p {
      margin-bottom: 0;
    }
  }

  .border-bottom-line {
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid ${props => props.theme.colors.paleGrey};
  }

  @media screen and (max-width: 767px) {
    border-width: 2px 0 0 0;

    .coming {
      flex-direction: row;
    }
  }
`;

export const CustomTable = styled(Table)`
  thead tr td {
    border: none;
  }
  tbody tr td {
    border-bottom: 2px solid #edf0f3;
    border-top: none;
  }
  tbody tr:last-child td {
    border-bottom: 2px solid #87afd6;
  }
  tbody tr td:first-child {
    border-right: 9px solid #f9fbfd;
    width: 45%;
  }
  tr td {
    text-align: right;
    vertical-align: middle;
  }
  p {
    margin-bottom: 0;
  }
  &.empty {
    tbody tr:last-child td {
      border-bottom: 2px solid #c9cdd3;
    }
  }
  .crossline {
    height: 4px;
    background-color: #edeef0;
    width: 100%;
    display: inline-block;
  }
  @media screen and (max-width: 767px) {
    tr td:first-child {
      text-align: center;
    }
  }
`;

export const TotalSummaryContainer = styled.div`
  border-width: 2px 0 0 0;
  border-color: ${props => props.theme.colors.paleGrey};
  border-style: solid;
  padding: 1.25rem 1.5rem;
  text-align: right;
  height: 100%;

  p {
    margin-bottom: 0.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    border-width: 0 0 0 2px;
  }
`;

export const DateRange = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.coolGrey};
  color: ${props => props.theme.colors.slateGrey};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: normal;

  &.empty {
    border-bottom: 2px solid ${props => props.theme.colors.paleGrey};
    color: ${props => props.theme.colors.coolGrey};
  }
`;
