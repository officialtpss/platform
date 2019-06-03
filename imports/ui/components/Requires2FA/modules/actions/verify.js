import { toastr } from 'react-redux-toastr';
import {helpers} from 'meteor/populous:ui';


// This thunk verifies the users 2FA code and calls
// the child thunk if successful
const verify = token => {
  return (dispatch, getState) => {
    const {
      app: {currentUser},
      requires2FA: { onSuccess, args = [] },
    } = getState();

    const params =  {
      token,
    };

    if(!currentUser){
      params.user = args[0];
      params.resetPasswordToken = args[2];
    }

    helpers.TwoFactorHelpers
      .verifycode(params)
      .then(onSuccess)
      .catch(() => {
        toastr.error(
          'Error',
          'That code is invalid, please try again'
        );
      });
  };
};

export default verify;
