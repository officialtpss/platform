import React from 'react';
import { Col, Row, FormGroup, FormText } from 'reactstrap';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { LedgerBalance } from 'meteor/populous:api';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { P, Small, Wrap, LABEL } from '../../../../components/styled-components/Typography';
import { StyledInput } from '../../../../components/styled-components/Inputs';
import { renderInputReactstrap } from '../../../../form-helpers/renderInputTextFields';
import { renderCurrencySelector, renderExternalWalletSelect, renderSelectReactstrap } from '../../../../form-helpers/renderSelectFields';
import { validateExternalWithdraw } from '../../../../form-helpers/validation';
import { InputFloat } from "../../../../form-helpers/InputFloat";
import { floor } from '../../../../utils/formatter';
import { DangerTextSpan } from "../../../../components/styled-components/Typography/index";
import DottedValue from '../../../../components/styled-components/DottedValue';


const initialState = {
  selectedAddresses: 'pending',
  isActiveAddress: false,
};

class ExternalForm extends React.Component {
  state = {...initialState};

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        selectedAddresses: this.props.externalsAddresses.length ? (this.props.externalsAddresses[0].address || this.props.externalsAddresses[0].newAddress)
          : 'pending'
      });
    }
  }

  handleChangeActiveAdress = (isActiveAddress) => {
    this.setState({isActiveAddress});
  };

  setAmountByClick = (value) => {
    if (value > 0) {
      const {change} = this.props;
      change('amount', value);
    }
  };

  onCurrencyChange = (value) => {
    const {change, onCurrencyChange} = this.props;
    change('amount', 0);
    onCurrencyChange(value);
  };

  render() {
    const {
      handleSubmit, activeScroll, currencies, getCurrenciesOption, wallet, isBorrower, valid, externalsAddresses,
      currenciesBalance, currentCurrency, onCurrencyChange, pristine, submitting, fee, canWithdrawXAUp
    } = this.props;

    const isXaup = currentCurrency === 'XAU';
    const canWithdraw = isXaup ? canWithdrawXAUp : true;
    const optionsCurrency = currencies.map(curency=>(
      {value: curency.symbol, label: curency.title}
    ));
    optionsCurrency.push({value: 'XAU', label: 'XAUp'})

    // we would loop from 1 to tokenId and if the user has any balance in any of the Ids
    const optionsTokenId = [{value: 1, label: 1}];

    let address = 'pending';
    if (wallet && wallet.address) {
      address = wallet.address;
    }

    let existAddress = address !== 'pending';
    let balance = 0;

    if(currenciesBalance && currenciesBalance[currentCurrency]){
       balance += currenciesBalance[currentCurrency].withdrawable;
    }

    return (
      <form className="form custom" onSubmit={handleSubmit}>
        {activeScroll &&
        // DEPOSIT
        <div>
          {!isBorrower &&
          <Row>
            <Col xs={4}>
              <FormGroup>
                <LABEL>Select Wallet</LABEL>
                <StyledInput type="select" value={currentCurrency} onChange={onCurrencyChange}>
                  {getCurrenciesOption(currencies)}
                </StyledInput>
              </FormGroup>
            </Col>
            <Col xs={8}>
              <FormGroup>
                <LABEL>Currency exchange rate</LABEL>
                <P>1 BTC = 5,000.00 GBPp</P>
                <Small>(all other cyptocurrencies will be converted to be BTC first. <a href="#">Learn
                  more</a>)</Small>
              </FormGroup>
            </Col>
          </Row>
          }

          <Row>
            <Col className="m-b-20">
              <Small style={{fontSize: '16px'}}>Deposit address for Pokens:</Small>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <Row>
                <Col xs={11} className="p-r-0">
                  <Wrap style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#636466',
                    lineHeight: '26px'
                  }}>{address}</Wrap>
                </Col>
                <Col xs={1} className="p-0">
                  {existAddress &&
                  <CopyToClipboard
                    text={address}
                    onCopy={() => toastr.success('Successfully copied to clipboard')}
                  >
                    <a href="#"><img src="/img/icons/clipboard.png" height={18}/></a>
                  </CopyToClipboard>
                  }
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={4}>
              {existAddress && <QRCode value={address}/>}
            </Col>
          </Row>

        </div>}
        {!activeScroll &&
        // WITHDRAW
        <div>
          {!canWithdraw &&
          <Row>
            <Col className="error-block m-b-20">
              Last withdraw request in progress. Please wait until operation is completed.
            </Col>
          </Row>
          }
          <Row>
            <Col xs={4}>
              <FormGroup>
                <Field
                  name={'currency'}
                  component={renderSelectReactstrap}
                  options={optionsCurrency}
                  label="Currency"
                  onChange={this.onCurrencyChange}
                  required={true}
                  placeholder={'Select currency'}
                />
              </FormGroup>
            </Col>
            {isXaup &&
            <Col xs={4}>
              <FormGroup>
                <Field
                  name={'tokenId'}
                  component={renderSelectReactstrap}
                  options={optionsTokenId}
                  onChange={this.onIdChange}
                  label="ID"
                  required={true}
                  placeholder={''}
                />
              </FormGroup>
            </Col>
            }
            <Col xs={isXaup ? 4 : 8}>
              <FormGroup>
                <Field
                  name={'amount'}
                  type="number"
                  precision={2}
                  component={InputFloat}
                  label="Amount"
                  placeholder={''}
                  required={true}
                  max={balance}
                />
                <FormText color="muted">
                  Withdrawable
                  <span onClick={()=>{this.setAmountByClick(balance)}} className="m-l-10">
                    <DottedValue primary={1} size={14}>
                      {floor(balance)}
                    </DottedValue>
                  </span>
                </FormText>
              </FormGroup>
            </Col>
          </Row>
          {!isBorrower &&
          <Row>
            <Col xs={10}>
              <FormGroup>
                <Field
                  externalsAddresses={externalsAddresses}
                  handleChangeActiveAdress={this.handleChangeActiveAdress}
                  name={'externalAddress'}
                  component={renderExternalWalletSelect}
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
          }
          {isBorrower &&
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Field
                  name={'externalAddress'}
                  type="text"
                  component={renderInputReactstrap}
                  label="External Wallet Address"
                  placeholder={''}
                  required={true}
                />
              </FormGroup>
            </Col>
          </Row>
          }

          <Row>
            <Col className="text-center m-t-20">
              <PrimaryButton disabled={pristine || submitting || !valid || !this.state.isActiveAddress || !canWithdraw} md>
                Withdraw funds
              </PrimaryButton>
            </Col>
          </Row>

          <Row>
            <Col className='text-center feeBlock'>
              <FormText color="muted">Withdrawal fee: <span className='feeValue'>{fee}</span> GBPp</FormText>
            </Col>
          </Row>
        </div>}
      </form>
    )
  }
}

const formName = 'ExternalForm';

export default reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validateExternalWithdraw,

  onSubmit: async ({ externalAddress: externalAddressId, amount, currency: currencySymbol, tokenId },
                   dispatch,
                   { wallet, withdrawPokens, withdrawXAUp }) => {

    if (currencySymbol === 'XAU') {
      withdrawXAUp({externalAddressId, amount, wallet, tokenId});
    } else {
      // TODO: CHECK whether this is obsolete
      // withdrawPokens({externalAddressId, amount, currencySymbol, wallet});
    }
  }
})(ExternalForm);
