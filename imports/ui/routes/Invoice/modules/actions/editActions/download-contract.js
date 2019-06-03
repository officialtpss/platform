import jsPDF from 'jspdf';
import { toastr } from 'react-redux-toastr';
import { User } from 'meteor/populous:api';
import {COMPLETE_CONTRACT_DOWNLOAD} from '../../index';
// This thunk creates a PDF contact from the Invoice data
// in the current state. It triggers an automatic download
// for the client
const downloadContract = (fileType) => {
  return (dispatch, getState) => {
    const { invoiceDetail, invoiceDetail: { currentInvoice } } = getState();

    if (!currentInvoice) {
      throw new Error('No invoice found');
    }

    const borrower = User.findOne(currentInvoice.borrowerId);

    if (!borrower) {
      throw new Error('No user found for this invoice');
    }


    dispatch({
      type: COMPLETE_CONTRACT_DOWNLOAD,
      payload: {fileType}
    });
  };
};

export default downloadContract;

export const downloadReasonDocument = () => {
  return (dispatch, getState) => {
    toastr.info('', 'This document will be available in the future');
  };
};
