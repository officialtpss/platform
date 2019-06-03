import {Meteor} from 'meteor/meteor';
import {toastr} from 'react-redux-toastr';
import {File} from 'meteor/populous:api';

import {
  REMOVE_FILE,
  FILE_LOADING,
} from '../../index';
import {setInvoice} from "./invoiceEdit";

const onStart = (dispatch, fileType) => {
  dispatch({
    type: FILE_LOADING,
    payload: {
      loading: true,
      fileType,
    }
  });
};

const onEnd = (dispatch, fileType) => {
  dispatch({
    type: FILE_LOADING,
    payload: {
      loading: false,
      fileType,
    }
  });
  dispatch({
    type: REMOVE_FILE,
    payload: {
      fileType,
    }
  });
};

const removeDocument = (fileType) => {
  return (dispatch, getState) => {
    let {invoiceDetail: {currentInvoice}} = getState();

      onStart(dispatch, fileType);

      currentInvoice.callMethod('removeDocument', fileType, (error, newInvoice) => {
        if (error) {
          toastr.error('Error', error.reason);
          return;
        }
        dispatch(setInvoice(newInvoice));

        onEnd(dispatch, fileType);
      });
  };
};

export default removeDocument;
