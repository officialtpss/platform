import {
  tierFees,
  invoiceSellerFee,
  minBidAmount,
  currencyDefinitions
} from 'meteor/populous:constants';
import { User, Invoice, Debtor } from 'meteor/populous:api'
import moment from 'moment';

import {floor} from '../utils/formatter';

export const validateRegistrationSeller = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.country) {
    errors.country = 'Required'
  }

  if (values.password) {
    const requiredSymbols = /[$@$!%*?&]/;
    const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!=+[()\]^’_{}*\-#~;<>£$€#|¦@,.:`%?&]{8,}/;

    if(values.password<8){
      errors.password = 'Password should be at least 8 characters.';
    } else if(!requiredSymbols.test(values.password)){
      errors.password = 'Password should have at least one special character.';
    } else if(!regularExpression.test(values.password)){
      errors.password = 'Too weak';
    }
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export const validateRegistrationBuyer = values => {
  const errors = {};
  
  if (!values.password) {
    errors.password = 'Required';
  }

  if (values.password) {
    const requiredSymbols = /[$@$!%*?&]/;
    const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!=+[()\]^’_{}*\-#~;<>£$€#|¦@,.:`%?&]{8,}/;

    if(values.password<8){
      errors.password = 'Password should be at least 8 characters.';
    } else if(!requiredSymbols.test(values.password)){
      errors.password = 'Password should have at least one special character.';
    } else if(!regularExpression.test(values.password)){
      errors.password = 'Too weak';
    }
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password doesn\'t match';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

export const validatePPTWithdraw = values => {

  const errors = {};
  if (!values.externalAddress) { // get regex
    errors.externalAddress = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (values.amount === 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  }

  return errors;
}

export const validateExternalWithdraw = values => {

  const errors = {};
  if (!values.externalAddress) { // get regex
    errors.externalAddress = 'Required';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (values.amount == 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }

  return errors;
}

export const validateBankAccount = (values, props) => {
  let balance = props.currenciesBalance && props.currenciesBalance[props.currentCurrency]
    && props.currenciesBalance[props.currentCurrency].amount;

  if (!(balance > 0)) {
    balance = 0;
  }

  const errors = {};

  if (!values.currency) {
    errors.currency = 'Required';
  }
  if (!values.userBank) {
    errors.userBank = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (values.amount === 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }
  if (values.amount > balance) {
    errors.amount = 'You don\'t have enough funds.';
  }

  return errors;
}

export const validateInvestorWithdraw = (values, props) => {

  let availableBalance = 0;

  if (values.currency) {
    if (props.currenciesBalance && props.currenciesBalance[props.currentCurrency]) {
      availableBalance = props.currenciesBalance[props.currentCurrency].withdrawable;
    }
    let currentCurrencyInfo = currencyDefinitions.find(c => c.symbol === values.currency);
    if (currentCurrencyInfo && currentCurrencyInfo.getAvailableBalance && props.wallet) {
      availableBalance = currentCurrencyInfo.getAvailableBalance(props.wallet, values.series)
    }
  }

  const errors = {};

  if (!values.currency) {
    errors.currency = 'Required';
  }
  if (!values.externalAddress) {
    errors.externalAddress = 'Required';
  }

  if (!values.amount) {
    errors.amount = '';
  }
  if (values.amount === 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }
  if (values.amount > availableBalance) {
    errors.amount = 'insufficient funds';
  }

  return errors;
}

export const validateResetPassword = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if(values.password){
    const regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    if(!regularExpression.test(values.password)){
      errors.password = 'Too weak';
    }
  }
  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password doesn\'t match';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }

  return errors;
};

/*
currencies"USD"
Amount"1000"
Invoicenumber"100"
DueDate"01-11-2017T00:00:00.000Z"
DebtorName"Satoshi Nakamoto"
SaleGoal"950"
 */
export const validateAddInvoice = (
  values, {type, currentUser, suggestionsDebtorCount, suggestionsSellerCount}
  ) => {
  const errors = {};
  const isMarket = type === 'market';
  const isBlockchain = type === 'blockchain';

  if (!values.currencies) {
    errors.currencies = 'Required, Please select a currency.';
  }
  if (!values.Amount) {
    errors.Amount = 'Required, Please enter an amount greater than 0.';
  }
  if (values.Amount === 0) {
    errors.Amount = 'Please enter an amount greater than 0.';
  }
  if (!values.Invoicenumber || values.Invoicenumber.trim() === "") {
    errors.Invoicenumber = 'Required.';
  }

  // if (values.Invoicenumber && !/^[a-zA-Z0-9\d$@$!=+[()\]^’_{}*\-#~;<>£$€#|¦@,.:`%?&]*$/.test(values.Invoicenumber)) {
  //   errors.Invoicenumber = 'You entered not permitted character or space.';
  // }
  if (!values.DueDate) {
    errors.DueDate= 'Required, please select a date in the future.';
  } else {
    const currentDate = moment().utc();
    const dueDate = moment(values.DueDate);
    if (currentDate.isAfter(dueDate)) {
      errors.DueDate = 'Incorrect due date.';
    }
  }
  if (!values.DebtorName || values.DebtorName.trim() == "") {
    errors.DebtorName = 'Required, please add the name of the debtor.';
  }
  if (values.DebtorName && /^\d+$/.test(values.DebtorName)) {
    errors.DebtorName = 'Please do not enter only numbers.';
  }
  if (suggestionsDebtorCount === 0) {
    if (!values.debtorCountry) {
      errors.debtorCountry = 'Required. Please select a country of debtor registration.';
    }
    if (!values.debtorNumber) {
      errors.debtorNumber = 'Required. Please enter the debtor number.';
    }
  }
  if(isMarket || isBlockchain) {
    if (!values.SellerName || values.SellerName.trim() == "") {
      errors.SellerName = 'Required, please add the name of the seller.';
    }
    if (values.SellerName && /^\d+$/.test(values.SellerName)) {
      errors.SellerName = 'Please do not enter only numbers.';
    }
    if (suggestionsSellerCount === 0) {
      if (!values.sellerCountry) {
        errors.sellerCountry = 'Required. Please select a country of seller registration.';
      }
      if (!values.sellerNumber) {
        errors.sellerNumber = 'Required. Please enter the seller number.';
      }
    }
  }

  if (!values.providerFee && isMarket) {
    errors.providerFee= 'Required, please enter a fee.';
  }
  if (!values.SalePrice && isBlockchain) {
    errors.SalePrice= 'Required, please select a sale price.';
  }


  return errors;
};

export const asyncValidateAddInvoice = async (values, undefined, {invoiceDocument}) => {
  const errors = {};
  let currentInvoiceNumber = (invoiceDocument && invoiceDocument.invoiceNumber) || null;

  if (values.referenceId) {
    const isReferenceIdExists = await (new Promise(
      resolve => (new User()).callMethod('isReferenceIdExists', values.referenceId,
        (error, result) => resolve(result))
    ));

    if (!isReferenceIdExists) {
      errors.referenceId = 'Reference No. is not valid';
    }
  }

  if (values.debtorNumber) {
    const isDebtorNumberUnique = await (new Promise(
      resolve => (new Debtor()).callMethod('isCompanyNumberUnique', values.debtorNumber,
        (error, result) => resolve(result))
    ));

    if (!isDebtorNumberUnique) {
      errors.debtorNumber = 'This debtor number already exists.';
    }
  }

  if (values.sellerNumber) {
    const isSellerNumberUnique = await (new Promise(
      resolve => (new Debtor()).callMethod('isCompanyNumberUnique', values.sellerNumber,
        (error, result) => resolve(result))
    ));

    if (!isSellerNumberUnique) {
      errors.sellerNumber = 'This seller number already exists.';
    }
  }

  if (values.Invoicenumber && values.Invoicenumber !== currentInvoiceNumber) {
    const isInvoiceNumberUnique = await (new Promise(
      resolve => (new Invoice()).callMethod('isInvoiceNumberUnique',
        values.Invoicenumber,
        (error, result) => resolve(result))
    ));

    if (!isInvoiceNumberUnique) {
      errors.Invoicenumber = 'This invoice number already exists.';
    }
  }

  if (Object.keys(errors).length) {
    throw errors;
  }
};

export const addBid = values => {
  const errors = {};
  const regex = /^(\d+\.?\d{0,9}|\.\d{1,9})$/;
  const {salePrice} = values.invoice;

  if(!regex.test(values.amount)) {
    errors.amount = 'Invalid amount';
  }

  if (salePrice < minBidAmount) {
    if(values.goal < salePrice){
      errors.goal = `Amount must be ${salePrice} or more.`;
    }
    if (values.amount < salePrice) {
      errors.amount = `Amount must be ${salePrice} or more.`;
    }
  } else {
    if(values.goal < minBidAmount){
      errors.goal = `Amount must be ${minBidAmount} or more.`;
    }
    if (values.amount < minBidAmount) {
      errors.amount = `Amount must be ${minBidAmount} or more.`;
    }
  }

  if(!regex.test(values.goal)) {
    errors.goal = 'Invalid amount';
  }

  return errors;
}

export const validateLogin = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const validateBankDetails = values => {
  const errors = {};
  if (!values.name || values.name.trim() == "") {
    errors.name = 'Required';
  }
  if (!values.country) {
    errors.country = 'Required, please select the country.';
  }
  if (!values.currency) {
    errors.currency = 'Required, please select the currency.';
  }
  if (!values.sortCode) {
    errors.sortCode = 'Required, please enter a sort code.';
  }
  if (!values.number) {
    errors.number = 'Required, please enter a bank account number.';
  }
  if (values.number && values.number.length < 4) {
    errors.number = 'Bank account number\'s length should be more than 3.';
  }

  return errors;
};

export const validateTermsConfirmation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export const validateQuote = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
}
