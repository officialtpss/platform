import React from 'react';
import { Col, Row, FormGroup, FormText } from 'reactstrap';
import { LABEL } from '../../../../components/styled-components/Typography';
import { StyledInput } from '../../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../../components/styled-components/Buttons'

import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { InputFloat } from '../../../../form-helpers/InputFloat';
import {floor} from '../../../../utils/formatter';

function calculateInitialSate() {
  const initialState = {
    usdpAmount: '',
    disableDeposit: false,
  };

  return initialState;
}

class PurchaseUSDpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...calculateInitialSate(props) };
  }

  onAmountChange = ({ target: { value: usdpAmount } }) => {
    let usdpAmountInt = Number.parseFloat(usdpAmount);

    if (usdpAmount === '' || typeof usdpAmountInt !== 'number' || usdpAmountInt < 0) {
      return this.setState({ usdpAmount: '' });
    }

    this.setState({ usdpAmount: usdpAmountInt });

  };

  onSubmit = (event) => {
    event.preventDefault();

    const {wallet, toggleExchandeUSDpModal} = this.props;
    const {usdpAmount, disableDeposit} = this.state;

    if (disableDeposit) {
      return;
    }

    this.setState({disableDeposit: true});
    toggleExchandeUSDpModal()
    // wallet.callMethod(
    //   'depositToCurrency',
    //   currencySymbol,
    //   pptAmount,
    //   (error) => {
    //     this.setState({disableDeposit: false});

    //     if (error) {
    //       return toastr.error(error.reason);
    //     }

    //     this.setState(calculateInitialSate(this.props));

    //     toastr.info('PPT successfully exchanged for Pokens');
    //   });
  };

  render() {
    const { availableUSDC } = this.props;
    const { usdpAmount } = this.state;

    return (
      <form
        className="form custom"
        onSubmit={this.onSubmit}
      >
        <Row>
          <Col xs={12}>
            <FormGroup>
              <LABEL>USDC Available</LABEL>
              <FormText color="muted">
                {availableUSDC}
              </FormText>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <FormGroup>
              <InputFloat
                value={usdpAmount}
                onChange={this.onAmountChange}
                precision={2}
                label="USDp Amount"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center m-t-20">
            <PrimaryButton md disabled={!usdpAmount}>
              Purchase USDp
            </PrimaryButton>
            <FormText color="muted">
              Transaction Fee: 0
            </FormText>
          </Col>
        </Row>
      </form>
    );
  }
}

PurchaseUSDpForm.protoTypes = {
  availableUSDC: PropTypes.number,
  wallet: PropTypes.object,
};

export default PurchaseUSDpForm
