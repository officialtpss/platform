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
    pokensAmount: '',
    disableDeposit: false,
  };

  return initialState;
}

class PurchasePokensForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...calculateInitialSate(props) };
  }

  onAmountChange = ({ target: { value: pokensAmount } }) => {
    let pokensAmountInt = Number.parseFloat(pokensAmount);

    if (pokensAmount === '' || typeof pokensAmountInt !== 'number' || pokensAmountInt < 0) {
      return this.setState({ pokensAmount: '' });
    }

    this.setState({ pokensAmount: pokensAmountInt });

  };

  onSubmit = (event) => {
    event.preventDefault();

    const {wallet, togglePurchasePokensModal} = this.props;
    const {pokensAmount, disableDeposit} = this.state;

    if (disableDeposit) {
      return;
    }

    this.setState({disableDeposit: true});
    togglePurchasePokensModal()
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
    const { availableUSDp } = this.props;
    const { pokensAmount } = this.state;

    return (
      <form
        className="form custom"
        onSubmit={this.onSubmit}
      >
        <Row>
          <Col xs={12}>
            <FormGroup>
              <LABEL>USDp Available</LABEL>
              <FormText color="muted">
                {availableUSDp}
              </FormText>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <FormGroup>
              <InputFloat
                value={pokensAmount}
                onChange={this.onAmountChange}
                precision={2}
                label="Pokens Amount"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center m-t-20">
            <PrimaryButton md disabled={!pokensAmount}>
              Purchase Pokens
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

PurchasePokensForm.protoTypes = {
  availableUSDp: PropTypes.number,
  wallet: PropTypes.object,
};

export default PurchasePokensForm
