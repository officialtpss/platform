import { toastr } from 'react-redux-toastr';
import { Invoice, Debtor } from 'meteor/populous:api';
import {invoiceDocumentTypes} from 'meteor/populous:constants';


import {
  SET_CURRENT_INVOICE,
  SET_SUGGESTIONS_COUNT,
  SELECT_DEBTOR,
  SELECT_SELLER,
  RESET_ADD_INVOICE,
} from '../';
import {push} from "react-router-redux";

export const setInvoice = (newInvoice) => {
  return {
    type: SET_CURRENT_INVOICE,
    invoice: newInvoice
  };
};

const createInvoice = (values, dispatch) => {

  const invoice = new Invoice({
    currency: values.currencies,
    invoiceNumber: values.Invoicenumber,
    dueDate: new Date(Date.parse(values.DueDate)),
    debtorId: values.debtorId,
    sellerId: values.sellerId,
    referenceInfo: values.referenceInfo,
    documents: {
      [invoiceDocumentTypes.invoice]: values.uploadedInvoiceId,
    }
  });

  // Make sure we pass a number to get the right error
  const amount = parseFloat(values.Amount);
  const salePrice = parseFloat(values.SaleGoal);

  // If parseInt fails, it will be falsy
  invoice.amount = amount ? amount : 0;
  invoice.salePrice = salePrice ? salePrice : 0;
  if (values.isMarketForm) {
    invoice.providerFeeAmount = parseFloat(values.providerFee);
  } else {
    invoice.soldPrice = parseFloat(values.SalePrice) || 0;
  }

  invoice.callMethod('create', !values.isMarketForm, (err, newInvoice) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      dispatch(push(`/invoice/${newInvoice._id}`));
      dispatch({ type: RESET_ADD_INVOICE });
    }
  });
}

// This thunk takes a form submission event's values
// object and attempts to create a new Invoice
export const createInvoiceFromForm = (values) => {
  return (dispatch, getState) => {
    const { uploadedInvoiceId } = values;

    if (!uploadedInvoiceId) {
      toastr.error('Error', 'Please upload your invoice');
      return;
    }

    if (values.newDebtor || values.newSeller) {
      const customer = values.newDebtor ?
        new Debtor({
          name: values.DebtorName,
          country: values.debtorCountry,
          companyNumber: values.debtorNumber
        }) :
        new Debtor({
          name: values.SellerName,
          country: values.sellerCountry,
          companyNumber: values.sellerNumber
        });

      customer.callMethod('create',(error, newCustomer) => {
        if (error) {
          toastr.error('Error', error.reason);
        } else {
          newCustomer.callMethod('getZScore');

          if (values.newDebtor && values.newSeller) {
            const seller = new Debtor({
              name: values.SellerName,
              country: values.sellerCountry,
              companyNumber: values.sellerNumber
            });
            seller.callMethod('create', (error, newSeller) => {
              if (error) {
                toastr.error('Error', error.reason);
              } else {
                newSeller.callMethod('getZScore');
                createInvoice({
                  ...values,
                  debtorId: newCustomer._id,
                  sellerId: newSeller._id,
                }, dispatch);
              }
            });
          } else {
            createInvoice({
              ...values,
              [values.newDebtor ? 'debtorId' : 'sellerId']: newCustomer._id,
            }, dispatch);
          }
        }
      });
    } else {
      createInvoice(values, dispatch);
    }
  };
};

export const suggestionsFetched = (count, type='debtor') => {
  return {
    type: SET_SUGGESTIONS_COUNT,
    isSeller: type === 'seller',
    count,
  }
};

export const suggestionSelected = (suggestion, type='debtor') => {
  if (type === 'seller') {
    return {
      type: SELECT_SELLER,
      seller: suggestion
    }
  } else {
    return {
      type: SELECT_DEBTOR,
      debtor: suggestion
    }
  }
};
