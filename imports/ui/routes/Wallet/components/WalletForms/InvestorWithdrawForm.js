import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, FormText } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { apiHelpers, ExchangeRate } from 'meteor/populous:api';
import { currencyDefinitions, usdConversionFee } from 'meteor/populous:constants';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { validateInvestorWithdraw } from '../../../../form-helpers/validation.js';
import { renderSelectReactstrap } from '../../../../form-helpers/renderSelectFields';
import { withdrawXAUp, withdrawTUSD, withdrawUSDC, withdrawPXT, withdrawPPT, withdrawPokens } from '../../modules/actions';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';
import { InputFloat } from '../../../../form-helpers/InputFloat';
import { Small, NaviText } from '../../../../components/styled-components/Typography';
import { renderExternalWalletSelect } from '../../../../form-helpers/renderSelectFields';

let InvestorWithdrawForm = ({
  handleSubmit, pristine, submitting, activeScroll, valid,
  currentCurrency, currencies, depositAmount, dispatch, onCurrencyChange,
  onAmountChange, currenciesBalance, isBorrower, withdrawCurrency,
  toggleConfirmationModal, userBanks, wallet, fee, externalsAddresses, InvestorWithdrawForm: form,
  ...props
}) => {

  let availableBalance = 0

  // TODO need to implement with fetch currency service

  if (currenciesBalance && currenciesBalance[currentCurrency]) {
    availableBalance = currenciesBalance[currentCurrency].withdrawable;
  }

  let currentCurrencyInfo = currencyDefinitions.find(c => c.symbol === currentCurrency);
  if (currentCurrencyInfo && currentCurrencyInfo.getAvailableBalance && wallet) {
    if (currentCurrency === 'XAUToken') {
      availableBalance = currentCurrencyInfo.getAvailableBalance(wallet, form.values.series)
    } else {
      availableBalance = currentCurrencyInfo.getAvailableBalance(wallet)
    }
  }
  let additionalAmountInfo
  if (currentCurrency === 'GBP' && withdrawCurrency === 'USD' && form && form.values.amount) {
    let exchangeRate = ExchangeRate.findOne({from: 'GBP', to: 'USD'})
    if (exchangeRate) {
      additionalAmountInfo = `Eqv. $${(parseFloat(form.values.amount) * exchangeRate.ask * (1 - usdConversionFee)).toFixed(2)}`
    }
  }

  return (
    <form className="form custom">
      {/* INVESTOR WITHDRAW */}
      <div>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Field
                name={'currency'}
                component={renderSelectReactstrap}
                onChange={(event) => onCurrencyChange(event)}
                options={currencyDefinitions.map(currency => ({ value: currency.symbol, label: currency.title }))}
                placeholder={'Select Currency...'}
                required={true}
              />
            </FormGroup>
          </Col>
        </Row>
        {currentCurrency === 'XAUToken' &&
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Field
                  name={'series'}
                  component={renderSelectReactstrap}
                  options={wallet.balanceXAU.map(series => ({ value: series.xaup_id, label: series.xaup_id }))}
                  placeholder={'Series'}
                  required={true}
                />
              </FormGroup>
            </Col>
          </Row>
        }
        <Row>
          <Col xs={12} className="wallet-address p-t-10 m-b-20">
            <FormGroup>
              <Small transform="uppercase">Available</Small>
              <NaviText>
                {(availableBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </NaviText>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={4} xs={12}>
            <FormGroup>
              <Field
                name={'amount'}
                component={InputFloat}
                label="AMOUNT"
                placeholder={''}
                required={true}
              />
              {additionalAmountInfo && form && (!form.syncErrors || !form.syncErrors.amount) && <span>{additionalAmountInfo}</span>}
            </FormGroup>
          </Col>
          <Col md={8} xs={12}>
            <Row>
              <Col xs={10}>
                <FormGroup>
                  <Field
                    externalsAddresses={externalsAddresses}
                    handleChangeActiveAdress={(isActiveAddress) => console.log(isActiveAddress)}
                    name={'externalAddress'}
                    component={renderExternalWalletSelect}
                    label="External wallet address"
                    placeholder={'Ext. wallet address name'}
                    required={true}
                  />
                </FormGroup>
              </Col>
              <Col xs={2} className="m-t-30">
                <Link to="/settings#external-wallets"><img src="/img/icons/ico-plus.svg" /></Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-center m-t-20">
            <PrimaryButton
              disabled={pristine || submitting || !valid || apiHelpers.roundNumber(availableBalance) <= 0}
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
    </form>
  );
}

InvestorWithdrawForm = reduxForm({
  form: 'InvestorWithdrawForm',
  validate: (values, props) => validateInvestorWithdraw(values, props),
  onSubmit: (values, dispatch, props) => {

    const { currencies, withdrawCurrency } = props;
    let currency = '', bankName = '', bankCurrency = '', bankCurrencySymbol = '';

    for (let i = 0; i < currencies.length; i++) {
      if (currencies[i].symbol === values.currency) {
        currency = currencies[i].title;
      }
    }

    const data = {
      type: 'withdrawal',
      currency: currency,
      amount: values.amount,
      series: values.series,
      bankName: bankName,
      bankCurrency: bankCurrency,
      currencyName: values.currency,
      withdrawCurrency
    };

    const request = {
      currency: values.currency,
      externalAddressId: values.externalAddress,
      series: values.series,
      amount: values.amount,
      wallet: props.wallet,
      withdrawCurrency
    };

    switch (values.currency) {
      case 'XAUToken':
        dispatch(requires2FA(withdrawXAUp, null, data)(request));
        break;
      case 'PXTToken':
        dispatch(requires2FA(withdrawPXT, null, data)(request));
        break;
      case 'USDCToken':
        dispatch(requires2FA(withdrawUSDC, null, data)(request));
        break;
      case 'TUSDToken':
        dispatch(requires2FA(withdrawTUSD, null, data)(request));
        break;
      case 'PPTToken':
        dispatch(requires2FA(withdrawPPT, null, data)(request));
        break;
      default:
        dispatch(requires2FA(withdrawPokens, null, data)(request));
        break;
    }
  }
})(InvestorWithdrawForm);


export default connect(state => ({
  InvestorWithdrawForm: state.form.InvestorWithdrawForm,
}))(InvestorWithdrawForm);
