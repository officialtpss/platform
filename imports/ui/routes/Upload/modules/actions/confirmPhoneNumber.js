import { toastr } from 'react-redux-toastr';
import { SET_CONFIRMED_PHONE } from '../';


const confirmPhoneNumber = (phoneNumber) => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;
    dispatch({ type: SET_CONFIRMED_PHONE, payload: {isConfirmedPhoneNumber: false, confirmedPhoneNumber: null}});

    currentUser.callMethod('sendVerificationCode', phoneNumber, (err, response) => {
      if (err && err.message.search(/The 'To' number|To number:/) !== -1) {
        return toastr.error(err.message);
      } else if (err) {
        return toastr.error('An error occurred, please try again later');
      }

      if (response) {
        return toastr.success('Sending the verification code was successful');
      }
    });
  }
};

const verifySmsCode = (smsCode, confirmedPhoneNumber) => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;

    currentUser.callMethod('verifySmsCode', Number(smsCode), (err, isConfirmedPhoneNumber) => {
      if (isConfirmedPhoneNumber) {
        toastr.success('Checking the sms code was successful');
        dispatch({ type: SET_CONFIRMED_PHONE, payload: {isConfirmedPhoneNumber, confirmedPhoneNumber} });
      } else {
        toastr.error('Invalid sms code');
      }
    });
  }
};

export {
  confirmPhoneNumber,
  verifySmsCode
};
