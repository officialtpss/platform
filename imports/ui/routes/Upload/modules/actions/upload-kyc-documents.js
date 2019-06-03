import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { File } from 'meteor/populous:api';

import { UPDATE_SAVING_STATE } from '../';
import { ACCOUNTS_USER_SUBSCRIPTION_CHANGED } from '../../../../wrappers/PrivateApp/modules';


const sendToVerifyKYCDocuments = () => {
  return (dispatch, getState) => {
    const {currentUser} = getState().app;

    // Save the data
    currentUser.callMethod('sendToVerifyKYCDocuments', (err, user) => {
      if (err) {
        if (/phoneAreaCode/.test(err.reason)) {
          return toastr.error('Error while saving', 'Wrong Phone Area Code');
        }
        return toastr.error('Error while saving', err.reason);
      } else {

        dispatch(push('/settings'));
        toastr.success(
          'Saved successfully',
          "You'll hear from us within 48 hours"
        );

        // Update the user
        dispatch({type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user]});
      }

      dispatch({type: UPDATE_SAVING_STATE, state: false});
    });
  };
};

const saveTempData = (redirectToSettings = true) => {
  return async (dispatch, getState) => {
    const {currentUser} = getState().app;
    const state = getState();
    const KYCData = state.form.kycwizard.values;
    const {personalIdentification, addressIdentification, bankStatements, livePhoto} = KYCData;


    if (bankStatements && (bankStatements.length && !bankStatements[0]._id)) {
      KYCData.uploadedBankStatements = [await saveTempFile(bankStatements[0])];
    }

    if (addressIdentification && (addressIdentification.length && !addressIdentification[0]._id)) {
      KYCData.uploadedAddressDocuments = [await saveTempFile(addressIdentification[0])];
    }

    if (livePhoto && (livePhoto.length && !livePhoto[0]._id)) {
      KYCData.uploadedLivePhoto = [await saveTempFile(livePhoto[0])];
    }

    if (personalIdentification && personalIdentification.length) {
      KYCData.uploadedPersonalIdDocuments = [];
      if (!personalIdentification[0]._id) {
        KYCData.uploadedPersonalIdDocuments.push(await saveTempFile(personalIdentification[0]));
      } else if (personalIdentification[0]) {
        KYCData.uploadedPersonalIdDocuments.push(personalIdentification[0]._id);
      }

      if (personalIdentification[1] && !personalIdentification[1]._id) {
        KYCData.uploadedPersonalIdDocuments.push(await saveTempFile(personalIdentification[1]));
      } else if (personalIdentification[1]) {
        KYCData.uploadedPersonalIdDocuments.push(personalIdentification[1]._id);
      }
    }

    // Save the data
    currentUser.callMethod('saveTempKYCData', KYCData, currentUser.isBorrower(), (err, user) => {
      if (err) {
        if (/phoneAreaCode/.test(err.reason)) {
          return toastr.error('Error while saving', 'Wrong Phone Area Code');
        }
        return toastr.error('Error while saving', err.reason);
      } else {

        if (redirectToSettings) {
          dispatch(push('/settings'));
          toastr.success('Saved successfully');
        }

        // Update the user
        dispatch({type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user]});
      }
    });
  }
};


const saveTempFile = async (file) => {
  return await (new Promise(
    resolve => (File.insert(
      {
        file: file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
        meta: {crypto: true},
      },
      false
    ).on('end', (error, fileObj) => {resolve(fileObj._id)}).start())));
  };

export {
  sendToVerifyKYCDocuments,
  saveTempData
};
