import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, Input, FormText } from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import { ExchangeRate, apiHelpers, } from 'meteor/populous:api';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { LABEL } from '../../../../components/styled-components/Typography';
import { StyledInput } from '../../../../components/styled-components/Inputs';
import { validateBankAccount } from '../../../../form-helpers/validation.js';
import { renderSelectReactstrap, renderCurrencySelector } from '../../../../form-helpers/renderSelectFields';
import { withdrawFunds } from '../../modules/actions';
import { floor } from '../../../../utils/formatter';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';
import { DangerTextSpan } from '../../../../components/styled-components/Typography/index';
import { InputFloat } from '../../../../form-helpers/InputFloat';

let BankAccountForm = ({
                         handleSubmit, pristine, submitting, activeScroll, valid,
                         currentCurrency, currencies, depositAmount, dispatch,
                         getCurrenciesOption, onCurrencyChange, onAmountChange, currenciesBalance, isBorrower,
                         toggleConfirmationModal, getBankCurrenciesOption, userBanks, getBankAccountsOption, wallet, fee,
                         ...props
                       }) => {

  let balance = 0;

  if(currenciesBalance && currenciesBalance[currentCurrency]){
    balance += currenciesBalance[currentCurrency].withdrawable;
  }

  const getGBPAmount = (amount) => {
    // should i multiply buy amount of currency???
    const rate = ExchangeRate.findOne({ from: currentCurrency, to: 'GBP' });
    if(rate){
      return floor(rate.ask * amount);
    }
    return floor(amount);
  };

  const withdrawAmount = (props.BankAccountForm && props.BankAccountForm.values && Number.parseFloat(props.BankAccountForm.values.amount)) || 0;

  return (
    <form className="form custom">
      { activeScroll &&
      // DEPOSIT
      <div>
        <Row>
          <Col xs={4}>
            <FormGroup>
              <LABEL>To Wallet</LABEL>
              <StyledInput
                type="select"
                onChange={(event) => onCurrencyChange(event)}
                value={'GBP'}
                disabled={true}
                style={{backgroundColor: 'transparent'}}
              >
                {getCurrenciesOption(currencies)}
              </StyledInput>
            </FormGroup>
          </Col>
          <Col xs={8}>
            <FormGroup>
              <LABEL>Amount</LABEL>
              <Input type="number" name="text" onChange={(event) => onAmountChange(event)} />
              <FormText color="muted">To be deposited: {currentCurrency} {depositAmount}</FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center m-t-20">
            <PrimaryButton type="button" md onClick={() => toggleConfirmationModal(true)}
                           disabled={!Number(depositAmount)}
            >
              View Deposit Instruction
            </PrimaryButton>
          </Col>
        </Row>
      </div> }

      {!activeScroll &&
      // WITHDRAW
      <div>
        <Row>
          <Col xs={4}>
            <FormGroup>
              <Field
                name={'currency'}
                value={currentCurrency}
                component={renderCurrencySelector}
                label="From Wallet"
                onChange={onCurrencyChange}
                required={true}
                placeholder={''}
              />
            </FormGroup>
          </Col>
          <Col xs={8}>
            <FormGroup>
              <Field
                name={'amount'}
                type="number"
                component={InputFloat}
                label="Amount"
                placeholder={''}
                required={true}
                precision={2}
              />
              <FormText color="muted">
                Withdrawable: <DangerTextSpan>{floor(balance)}</DangerTextSpan>
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Field
                name={'userBank'}
                component={renderSelectReactstrap}
                options={userBanks.map(bank => ({value: bank._id, label: bank.name}))}
                label="To bank account"
                placeholder={'Select Bank...'}
                required={true}
              />
              <FormText color="muted">To be withdrawn: GBP {getGBPAmount(withdrawAmount)}</FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center m-t-20">
            <PrimaryButton
              disabled={pristine || submitting || !valid || apiHelpers.roundNumber(balance)<=0 }
              md
              type="button"
              onClick={handleSubmit}
            >
              Withdraw funds
            </PrimaryButton>
          </Col>
        </Row>

        <Row>
          <Col className='text-center feeBlock'>
            <FormText color="muted">Withdrawal fee: <span className='feeValue'>{isBorrower ? 5 : fee}</span>{isBorrower ? 'GBP' : 'PPT'}</FormText>
          </Col>
        </Row>
      </div>
      }
    </form>
  );
}

BankAccountForm = reduxForm({
  form: 'BankAccountForm',
  validate: (values, props) => validateBankAccount(values, props),
  onSubmit: (values, dispatch, props) => {

    const {currencies, userBanks} = props;
    let currency = '', bankName = '', bankCurrency = '', bankCurrencySymbol = '';
    for (let i = 0; i < userBanks.length; i ++) {
      if (userBanks[i]._id === values.userBank) {
        bankName = userBanks[i].name;
        bankCurrencySymbol = userBanks[i].currency;
      }
    }

    for (let i = 0; i < currencies.length; i ++) {
      if (currencies[i].symbol === values.currency) {
        currency = currencies[i].title;
      }
      if (currencies[i].symbol === bankCurrencySymbol) {
        bankCurrency = currencies[i].title;
      }
    }

    const data = {
      type: 'withdrawal',
      currency: currency,
      amount: values.amount,
      bankName: bankName,
      bankCurrency: bankCurrency,
    };

    const request = {
      currency: values.currency,
      bankId: values.userBank,
      amount: values.amount,
      wallet: props.wallet,
    };

    dispatch(requires2FA(withdrawFunds, null, data)(request));
  }
})(BankAccountForm);


export default connect(state => ({
  BankAccountForm: state.form.BankAccountForm,
}))(BankAccountForm);
