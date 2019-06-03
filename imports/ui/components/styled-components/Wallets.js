import styled from 'styled-components';

export const BaseCurrency = styled.div`
  color: ${props => (props.invert ? 'white' : props.theme.colors.charcoalGrey)};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  padding-bottom: 10px;
  border-bottom: 2px solid ${props => props.theme.colors.paleGrey};
  font-size: 19px;
  display: inline-block;
  padding-right: 10px;

  .currency-mark {
    color: #c0c5cc;
    margin-left: 20px;
  }

  @media(min-width: 992px) {
    font-size: 1.11875rem;
    font-size: 22px;
    padding-right: 50px;
  }
`;

export const TransactionCardWrapper = styled.div`
  border: 2px solid ${props => props.theme.colors.paleGrey};
  margin-top: -2px;
  padding: 10px 20px;

  .info {
    margin-left: 58px;
    margin-top: 10px;
  }
`;
