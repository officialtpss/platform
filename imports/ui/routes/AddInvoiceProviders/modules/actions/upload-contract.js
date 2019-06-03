import { toastr } from 'react-redux-toastr';
import { File } from 'meteor/populous:api';
import { push } from 'react-router-redux';
import { invoiceDocumentTypes } from 'meteor/populous:constants';

import {
  SET_REJECTED_FILE,
  FILE_LOADING,
  SET_SAVED_FILE,
  SET_SAVED_FILE_ID,
} from '../';
import {setInvoice} from "./create-invoice-from-form";

// This thunk is the handler for the contact upload
// Dropzone component. If there are any files of
// incorrect format, we set them to the state. Accepted
// files are uploaded to IPFS and the hash saved to the
// current invoice
const uploadContract = (acceptedFiles, rejectedFiles, fileType) => {
  return (dispatch, getState) => {
    const {
      app: { currentUser },
      addInvoiceProviders: { currentInvoice },
    } = getState();

    if (!currentInvoice && fileType !== invoiceDocumentTypes.invoice) {
      toastr.error('Error', 'No invoice found');
      return;
    }

    if (rejectedFiles.length > 0) {
      const file = rejectedFiles[0];
      dispatch({
        type: SET_REJECTED_FILE,
        payload: {
          file,
          fileType,
        }
      });
      return;
    }

    dispatch({
      type: SET_REJECTED_FILE,
      payload: {
        file: null,
        fileType,
      }
    });

    if (acceptedFiles.length === 0) {
      return;
    }

    dispatch({
      type: FILE_LOADING,
      payload: {
        loading: true,
        fileType,
      }
    });

    const signedContract = acceptedFiles[0];
    const upload = File.insert(
      {
        file: signedContract,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      },
      false
    );
    upload.on('end', function (error, fileObj) {
      dispatch({
        type: FILE_LOADING,
        payload: {
          loading: false,
          fileType,
        }
      });
      if (error) {
        toastr.error('Error', error);
      } else {
        if(currentInvoice) {
          currentInvoice.callMethod('uploadContract', {
            [fileType]: fileObj._id,
          }, (error, newInvoice) => {
            if (!error) {
              dispatch(setInvoice(newInvoice));
            }
          });
        }

        dispatch({ type: SET_SAVED_FILE_ID, payload: { fileId: fileObj._id, fileType } });
        dispatch({
          type: SET_SAVED_FILE,
          payload: {
            file: signedContract,
            fileType,
          }
        });
      }
    });
    upload.start();
  };
};

export default uploadContract;
