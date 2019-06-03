import { toastr } from 'react-redux-toastr';
import { User } from 'meteor/populous:api';

// This thunk sends a password reset email to the user
// based on the email address given
const sendPasswordResetEmail = (email, successCallback) => {
  return dispatch => {

    if (!email) {
      toastr.error('Error', 'Please enter a valid email address');
    } else {
      new User().callMethod('sendPasswordResetForEmail', email, err => {
        if (err) {
          toastr.error('Error', err.reason);
          return;
        }

        if(typeof successCallback === 'function'){
          successCallback();
        }

        toastr.success(
          'Success',
          'Please follow the instructions sent to your email inbox'
        );
      });
    }
  };
};

export default sendPasswordResetEmail;
