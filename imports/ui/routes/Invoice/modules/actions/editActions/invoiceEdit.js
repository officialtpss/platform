import {toastr} from 'react-redux-toastr';
import {User, File, Debtor} from 'meteor/populous:api';
import {push} from 'react-router-redux';
import {invoiceDocumentTypes, invoiceStatuses} from 'meteor/populous:constants';

import {
  RESET_INVOICE_DETAIL,
  SET_CURRENT_INVOICE,
  SET_SUGGESTIONS_COUNT,
  SELECT_DEBTOR,
  SELECT_SELLER,
} from '../../index';
import requireConfirmation from '../../../../../components/ConfirmModal/modules/actions/index';

export const deleteInvoice = requireConfirmation(() => {
  return (dispatch, getState) => {
    const {invoiceDetail: {currentInvoice}} = getState();
    if (currentInvoice && currentInvoice._id) {
      currentInvoice.callMethod('delete', ((err) => {
        if (err) {
          return toastr.error(err.reason);
        }

        dispatch({type: RESET_INVOICE_DETAIL});
        toastr.warning('Deleted invoice');
        dispatch(push('/invoices'));
      }))
    }
  }
}, {
  text: 'Are you sure that you are going delete this invoice?'
});

export const setInvoice = (invoice) => {

  return {
    type: SET_CURRENT_INVOICE,
    invoice
  };
};

export const suggestionsFetched = (count, type = 'debtor') => {
  return {
    type: SET_SUGGESTIONS_COUNT,
    isSeller: type === 'seller',
    count,
  }
};

export const suggestionSelected = (suggestion, type = 'debtor') => {
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
