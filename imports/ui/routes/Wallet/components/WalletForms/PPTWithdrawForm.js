import React from 'react';
import { toastr } from 'react-redux-toastr';
import { Col, Row, FormGroup, FormText, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { reduxForm, Field, reset } from 'redux-form';

import { renderExternalWalletSelect } from '../../../../form-helpers/renderSelectFields';
import { validatePPTWithdraw } from '../../../../form-helpers/validation';
import { InputFloat } from '../../../../form-helpers/InputFloat';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { Small, NaviText } from '../../../../components/styled-components/Typography';

class PPTWithdrawForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveAddress: false,
    }
  }

  handleChangeActiveAdress = (isActiveAddress) => {
    this.setState({isActiveAddress});
  };

  render() {
    const {
      pristine, submitting, valid, externalsAddresses,
      wallet = {}, handleSubmit, canWithdrawPPT, fee,
    } = this.props;

    const { availableBalance = 0 } = wallet;

    return (
      <div>
        <form className="form custom" onSubmit={handleSubmit}>
          <Col xs={12} className="wallet-address p-t-10 m-b-20">
            <FormGroup>
              <Small transform="uppercase">PPT available</Small>
              <NaviText>
                {(availableBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </NaviText>
            </FormGroup>
          </Col>
          <Row>
            <Col md={4} xs={12}>
              <FormGroup>
                <Field
                  name={'amount'}
                  component={InputFloat}
                  label="PPT AMOUNT"
                  placeholder={''}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col md={8} xs={12}>
              <Row>
                <Col xs={10}>
                  <FormGroup>
                    <Field
                      handleChangeActiveAdress={this.handleChangeActiveAdress}
                      externalsAddresses={externalsAddresses}
                      component={renderExternalWalletSelect}
                      name={'externalAddress'}
                      label="External wallet address"
                      placeholder={'Ext. wallet address name'}
                      required={true}
                    />
                  </FormGroup>
                </Col>

                <Col xs={2} className="m-t-30">
                  <Link to="/settings#external-wallets"><img src="/img/icons/ico-plus.svg"/></Link>
                </Col>
              </Row>
            </Col>
          </Row>

          {!canWithdrawPPT &&
          <Alert color="primary">
            Last withdraw request is still in progress
          </Alert>
          }

          <Row>
            <Col className="text-center m-t-20">
              <PrimaryButton md disabled={pristine || submitting || !valid || !this.state.isActiveAddress || !canWithdrawPPT}>
                Withdraw PPT
              </PrimaryButton>
            </Col>
          </Row>

          <Row>
            <Col className='text-center feeBlock'>
              <FormText color="muted">Withdrawal fee: <span className='feeValue'>{fee}</span> PPT</FormText>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const formName = 'PPTWithdrawForm';
// TODO: NEED TO CHECK THIS. This maybe obsolete
export default reduxForm({
  form: formName,
  validate: validatePPTWithdraw,
  onSubmit: ({ amount: amountInput, externalAddress: externalAddressId }, dispatch, { wallet, withdrawPPT }) => {
    dispatch(requires2FA(withdrawPPT, null, null)(request));
    // withdrawPPT({AMOUNT: amountInput, externalAddressId, wallet});
  }
})(PPTWithdrawForm);
