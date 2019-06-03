import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { File } from 'meteor/populous:api';

import {
  REMOVE_FILE,
  FILE_LOADING,
} from '../';
import {setInvoice} from "./create-invoice-from-form";

const removeDocument = (fileType) => {
  return (dispatch, getState) => {
    const {
      addInvoiceProviders: { [fileType]: { savedFileId }, currentInvoice },
    } = getState();

    if (!savedFileId) {
      toastr.error('Error', 'No document found');
      return;
    }

    dispatch({
      type: FILE_LOADING,
      payload: {
        loading: true,
        fileType,
      }
    });

    const callback = (err, newInvoice) => {
      if (err) {
        toastr.error('Error', err.reason);
        return;
      }

      if(newInvoice){
        dispatch(setInvoice(newInvoice));
      }

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

    if(currentInvoice){
      currentInvoice.callMethod('removeDocument', fileType, callback)
    }else{
      Meteor.call('file.remove', savedFileId, callback);
    }
  };
};

export default removeDocument;
