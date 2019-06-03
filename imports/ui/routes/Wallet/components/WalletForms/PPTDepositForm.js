import React from 'react';
import { Col, Row, FormGroup, FormText } from 'reactstrap';
import { depositLogTypes } from 'meteor/populous:constants';
import { LABEL } from '../../../../components/styled-components/Typography';
import { StyledInput } from '../../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../../components/styled-components/Buttons'

import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { InputFloat } from '../../../../form-helpers/InputFloat';
import {floor} from '../../../../utils/formatter';

function calculateInitialSate({ currencies = [] }) {
  const initialState = {
    type: depositLogTypes.PPT,
    amount: '',
    currencySymbol: '',
    currencyTitle: '',
    receiveAmount: '',
    disableDeposit: false,
  };

  if (currencies.length) {
    const firstCurrency = currencies[0];

    initialState.currencyTitle = firstCurrency.title;
    initialState.currencySymbol = firstCurrency.symbol;
  }

  return initialState;
}

function findCurrencyTitleBySymbol(currencies, currencySymbol) {
  let currencyTitle = '';

  currencies.find(currency => {
    if (currency.symbol === currencySymbol) {
      currencyTitle = currency.title;
      return false;
    }
  });

  return currencyTitle;
}

class PPTDepositForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...calculateInitialSate(props) };
  }

  onCurrencyChange = ({ target: { value: currencySymbol } }) => {
    const currencyTitle = findCurrencyTitleBySymbol(this.props.currencies, currencySymbol);
    this.setState({ currencySymbol, currencyTitle, }, this.recalculateResultAmount);
  };

  ontypeChange = ({ target: { value: type } }) => {
    this.setState({ type }, this.recalculateResultAmount);
  };

  getTypesOption() {
    let options = Object.values(depositLogTypes).map((el, i) => <option key={i} value={el}>{el}</option>);
    return options;
  }

  getCurrenciesOption(currencies) {
    let options = [];

    if (currencies && currencies.length) {
      options = options.concat(currencies.map((el, i) => {
        return <option key={i} value={el.symbol}>{el.title}</option>
      }));
    } else {
      options.push(
        <option key='currency' value='' disabled={true} >No currency</option>
      );
    }

    return options;
  }

  recalculateResultAmount = () => {
    const { amount, currencySymbol, type } = this.state;
    const { wallet } = this.props;

    if (amount > 0 && currencySymbol) {
      if (type == depositLogTypes.PPT) {
        wallet.callMethod(
          'convertPptToCurrency',
          amount,
          currencySymbol,
          false,
          (error, receiveAmount) => {
            if (error) {
              return toastr.error(error.reason);
            }

            this.setState({ receiveAmount });
          });
      } else {
        wallet.callMethod(
          'convertUSDCToCurrency',
          amount,
          currencySymbol,
          false,
          (error, receiveAmount) => {
            if (error) {
              return toastr.error(error.reason);
            }

            this.setState({ receiveAmount });
          });
      }
    }
  };

  onAmountChange = ({ target: { value: amount } }) => {
    let amountInt = Number.parseFloat(amount);

    if (amount === '' || typeof amountInt !== 'number' || amountInt < 0) {
      return this.setState({ amount: '', receiveAmount: 0 });
    }

    this.setState({ amount: amountInt }, this.recalculateResultAmount);

  };

  onSubmit = (event) => {
    event.preventDefault();

    const {wallet, toggleExchandePPTModal} = this.props;
    const {type, currencySymbol, amount, disableDeposit,} = this.state;

    if (disableDeposit) {
      return;
    }

    this.setState({disableDeposit: true});

      if (type === depositLogTypes.PPT) {
        wallet.callMethod(
          'depositToCurrency',
          currencySymbol,
          amount,
          (error) => {
            this.setState({disableDeposit: false});

            if (error) {
              return toastr.error(error.reason);
            }

            this.setState(calculateInitialSate(this.props));

            toastr.info('PPT successfully exchanged for Pokens');
          });
      } else {
        wallet.callMethod(
          'depositUSDCToGBPp',
          currencySymbol,
          amount,
          (error) => {
            this.setState({disableDeposit: false});

            if (error) {
              return toastr.error(error.reason);
            }

            this.setState(calculateInitialSate(this.props));

            toastr.info('USDC successfully exchanged for Pokens');
          });
      }
  };

  render() {
    const { currencies, availablePPT, availableUSDC } = this.props;
    const { type, currencySymbol, amount, currencyTitle, receiveAmount } = this.state;

    return (
      <form
        className="form custom"
        onSubmit={this.onSubmit}
      >
        <Row>
          <Col xs={4}>
            <FormGroup>
              <LABEL>Currency</LABEL>
              <StyledInput type="select" value={type} onChange={this.ontypeChange}>
                {this.getTypesOption()}
              </StyledInput>
            </FormGroup>
          </Col>
          <Col xs={8}>
            <FormGroup>
              <InputFloat
                value={amount}
                onChange={this.onAmountChange}
                precision={2}
                label="Amount"
              />
              {currencyTitle &&
              <FormText color="muted">
                Available {floor(type === depositLogTypes.PPT ? availablePPT : availableUSDC)}
              </FormText>
              }
            </FormGroup>
          </Col>
          <Col xs={4}>
            <FormGroup>
              <LABEL>To Wallet</LABEL>
              <StyledInput type="select" value={currencySymbol} onChange={this.onCurrencyChange}>
                {this.getCurrenciesOption(currencies)}
              </StyledInput>
            </FormGroup>
          </Col>
          <Col xs={8}>
            <FormGroup>
              <LABEL>Will be received</LABEL>
              <StyledInput
                type="text"
                value={receiveAmount ? receiveAmount.toFixed(2) : receiveAmount}
                style={{background: 'transparent'}}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center m-t-20">
            <PrimaryButton md disabled={!type || !amount || !receiveAmount || !currencySymbol}>
              EXCHANGE {type === depositLogTypes.PPT ? 'PPT' : 'USDC'}
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }
}

PPTDepositForm.protoTypes = {
  currencies: PropTypes.array,
  onPptScreenChange: PropTypes.func,
  wallet: PropTypes.object,
};

export default PPTDepositForm
