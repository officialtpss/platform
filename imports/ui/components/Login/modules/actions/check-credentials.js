import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { userRoles } from 'meteor/populous:constants';
import { User } from 'meteor/populous:api';

import { loginAfter2FA } from './';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';

// This thunk takes the email and password submitted
// in the login form and attempts to log the user into
// the application.
const checkCredentials = (email, password, callBack) => {
  return dispatch => {
    Meteor.loginWithPassword(
      { email },
      password,
      err => {
        if (err) {

          // If the user has not verified their email address
          // (from server/main.js)
          if (err.error === 'not-verified') {
            toastr.error('Error', err.reason);
          } else {
            toastr.error(
              'Error',
              'Login failed, please check your credentials'
            );
          }
          return;
        }

        callBack();

        // At this stage we know they're a valid user but
        // Meteor has logged them and we still need to check thier
        // 2FA token before we allow them access to the app
        Meteor.logout();

        // Get the user object by email address
        new User().callMethod('findUserByEmail', email, (err, user) => {

          // If they have 2FA setup make them enter a 2FA token.
          // We pass user to the requires2FA thunk because
          // store.app.currentUser isn't set yet!
          // We pass password so the loginAfter2FA thunk gets it
          if (user.twoFAKey) {
            dispatch(requires2FA(loginAfter2FA, null, {type: 'login'})(user, password));
          } else {

            // If they don't have 2FA yet, let them through so
            // they can set it up
            dispatch(loginAfter2FA(user, password));
          }
        });
      }
    );
  };
};

export default checkCredentials;
