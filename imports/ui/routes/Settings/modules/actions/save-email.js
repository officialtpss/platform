import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { User } from 'meteor/populous:api';
import { stopSubscription } from 'meteor-redux-middlewares';

import { ACCOUNTS_USER_SUB } from '../../../../wrappers/PrivateApp/modules';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';

// This thunk saves changes to the users personal details
const saveEmail = email => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;
    currentUser.updateUserByEmail(email, (err, user) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your email has been updated');
        new User().callMethod('sendEmailVerificationForEmail', email, err => {
          if (err) {
            toastr.error('Error', err.reason);
            return;
          }
          Meteor.logout(err => {
            if (err) {
              toastr.error('Error logging out', err.reason);
            } else {
              dispatch(stopSubscription(ACCOUNTS_USER_SUB));
              dispatch(push('/login'));
              toastr.success('Success', 'The verification link has been sent to your email address.');
            }
          });
        });
      }
    });
  };
};

export default requires2FA(saveEmail);
