import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import {helpers} from 'meteor/populous:ui';

import { ACCOUNTS_USER_SUBSCRIPTION_CHANGED } from '../../../../wrappers/PrivateApp/modules';


// This thunk verifies the users code and saves
// the secret key to their user object
const verifyCode = code => {
  return (dispatch, getState) => {
    const {
      app: {currentUser},
      setup2FA: {secret},
    } = getState();

    helpers.TwoFactorHelpers.saveSecret(currentUser, secret.string, code)
      .then((user) => {
        toastr.success(
          'Success',
          'Your 2-factor authentication is now setup'
        );

        dispatch({type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user]});
        localStorage.setItem('isNewUser', false);
        dispatch(push('/invoices'));
      })
      .catch((isVerificationError) => {
        return toastr.error(
          'Error',
          (isVerificationError
              ? 'That code is invalid, please try again'
              : 'There was an error saving your 2FA code. Please try again'
          )
        );
      });
  };
};

export default verifyCode;
