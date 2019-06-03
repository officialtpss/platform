import React from 'react';
import {Col, Row, FormGroup, FormText, Alert} from 'reactstrap';
import { ExchangeRate, apiHelpers } from 'meteor/populous:api';

import { P, LABEL } from '../../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { toastr } from 'react-redux-toastr';
import { InputFloat } from '../../../../form-helpers/InputFloat';
import { StyledInput } from '../../../../components/styled-components/Inputs';

const currencyTitle = {
  USDCToken: 'USDC',
  TUSDToken: 'TUSD',
};

const initialState = {
  xaupAmount: '',
  receiveAmount: '',
  disableDeposit: false,
  populousBalanceOf: 0,
  currency: 'USDCToken',
};


class XAUpExchangeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      usdToXauRate: ExchangeRate.findOne({ from: 'XAU', to: 'USD' }),
    };
  }

  recalculateResultAmount = () => {
    const { xaupAmount, usdToXauRate} = this.state;
    if (xaupAmount > 0 && usdToXauRate) {
      // * 1.005 - increase of 0.5%
      // * 0.91 - subtract of 9%
      let receiveAmount = ((xaupAmount * (usdToXauRate.bid)*1.005*0.91));
      receiveAmount = apiHelpers.roundNumber(receiveAmount);
      this.setState({receiveAmount});
      Meteor.call('populous.balanceOf', (err, result)=>{
        this.setState({ populousBalanceOf: result })
      });
    }
  };

  toggleCurrency = (currency) => {
    this.setState({currency}, this.recalculateResultAmount)
  };

  onAmountChange = ({target:{value:xaupAmount}}) => {
    let xaupAmountInt = Number.parseFloat(xaupAmount);
    if (xaupAmount === '' || typeof xaupAmountInt !== 'number' || xaupAmountInt < 0) {
      return this.setState({ xaupAmount: '', receiveAmount: 0 });
    }
    this.setState({ xaupAmount: xaupAmountInt }, this.recalculateResultAmount);
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {wallet, toggleExchandeXAUpModal} = this.props;
    const {xaupAmount, disableDeposit, populousBalanceOf, currency} = this.state;

    if (xaupAmount > populousBalanceOf) {
      return toastr.error('The amount exceeds the maximum possible');
    }

    if (disableDeposit) {
      return;
    }

    this.setState({disableDeposit: true});

    wallet.callMethod(
      'depositToXAUP',
      xaupAmount, currency,
      (error) => {
        this.setState({disableDeposit: false});

        if (error) {
          return toastr.error(error.reason);
        }

        toggleExchandeXAUpModal();
        toastr.info(`${this.state.currency} successfully exchanged for XAUp`);
      });
  };

  render() {
    const {xaupAmount, receiveAmount, usdToXauRate, currency} = this.state;
    const {canExchangeXAUp} = this.props;
    // * 1.005 - increase of 0.5%
    // * 0.91 - subtract of 9%
    const exchangeValue = (usdToXauRate ? apiHelpers.roundNumber(usdToXauRate.bid * 1.005 * 0.91, 6) : 0);
    return (
      <form
        className="form custom"
        onSubmit={this.onSubmit}
      >
        <Row>
          <Col className="m-b-30">
            <P>Enter XAUp amount you would like to receive below</P>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <LABEL>Currency:</LABEL>
              <StyledInput
                type="select"
                name="currency"
                value={currency}
                onChange={(event) => {this.toggleCurrency(event.nativeEvent.target.value)}}
              >
                <option value='USDCToken' key='USDCToken'>USDC</option>
                <option value='TUSDToken' key='TUSDToken'>TUSD</option>
              </StyledInput>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="m-b-20">
            <FormGroup>
              <InputFloat
                value={xaupAmount}
                onChange={this.onAmountChange}
                precision={0}
                label="XAUP AMOUNT"
              />
              <FormText color="muted">
                {currencyTitle[currency]}/XAUp
                {apiHelpers.roundNumber(exchangeValue, 2)}
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <LABEL>Total cost, {currencyTitle[currency]}:</LABEL>
              <div className="m-t-20 text-bold" style={{fontSize: 20}}>
                {receiveAmount.toLocaleString('fullwide', {useGrouping:false})}
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center m-t-40">
            {!canExchangeXAUp &&
            <Alert color="primary" className="m-b-30">
              Last exchange request is still in progress
            </Alert>
            }
            <PrimaryButton md disabled={!xaupAmount || !receiveAmount || !canExchangeXAUp}>
              EXCHANGE
            </PrimaryButton>
          </Col>
        </Row>
      </form>
    );
  }
}

export default XAUpExchangeForm
