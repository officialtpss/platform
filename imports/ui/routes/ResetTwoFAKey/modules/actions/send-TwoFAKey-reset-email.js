import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { User } from 'meteor/populous:api';

// This thunk sends a TwoFAKey reset email to the user
// based on the email address given
const sendTwoFAKeyResetEmail = email => {
  return dispatch => {
    if (!email) {
      toastr.error('Error', 'Please enter a valid email address');
    }

    new User().callMethod('sendTwoFAKeyResetForEmail', email, err => {
      if (err) {
        toastr.error('Error', err.reason);
        return;
      }
      toastr.success('Success', 'Please follow the instructions sent to your email inbox');
    });
  };
};

export default sendTwoFAKeyResetEmail;
