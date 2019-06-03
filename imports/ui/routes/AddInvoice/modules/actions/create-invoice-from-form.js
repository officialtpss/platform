import { toastr } from 'react-redux-toastr';
import { Invoice, Debtor } from 'meteor/populous:api';
import {invoiceDocumentTypes} from 'meteor/populous:constants';

import {
  SET_CURRENT_INVOICE,
  SET_SUGGESTIONS_COUNT,
  SELECT_DEBTOR,
  RESET_ADD_INVOICE
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
    referenceId: values.referenceId,
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

  invoice.callMethod('create',(err, newInvoice) => {
    if (err) {
      toastr.error('Error', err.reason);
    } else {
      dispatch(push(`/invoice/${newInvoice._id}`));
      dispatch({ type: RESET_ADD_INVOICE });
      dispatch(setInvoice(newInvoice));
    }
  });
};

// This thunk takes a form submission event's values
// object and attempts to create a new Invoice
export const createInvoiceFromForm = values => {
  return (dispatch, getState) => {
    const { uploadedInvoiceId } = values;

    if (!uploadedInvoiceId) {
      toastr.error('Error', 'Please upload your invoice');
      return;
    }

    if (values.newDebtor) {
      const debtor = new Debtor({
        name: values.DebtorName,
        country: values.debtorCountry,
        companyNumber: values.debtorNumber
      });

      debtor.callMethod('create', (error, newDebtor) => {
        if (error) {
          toastr.error('Error', error.reason);
        } else {
          newDebtor.callMethod('getZScore', (err) => {
            createInvoice({
              ...values,
              debtorId: newDebtor._id
            }, dispatch);
          });
        }
      });
    } else {
      createInvoice(values, dispatch);
    }
  };
};

export const suggestionsFetched = count => {
  return {
    type: SET_SUGGESTIONS_COUNT,
    count,
  };
};

export const suggestionSelected = suggestion => {
  return {
    type: SELECT_DEBTOR,
    debtor: suggestion
  }
};
