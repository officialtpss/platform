import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { Accounts } from 'meteor/accounts-base';
import { fixtures } from 'meteor/populous:constants';
import { Wallet } from 'meteor/populous:api';
import {populousEvents} from 'meteor/populous:constants';

// This thunk takes the email and password submitted
// at login and logs them into the application
const loginAfter2FA = (user, password) => {
  return dispatch => {
    Meteor.loginWithPassword(
      { email: user.emailAddress() },
      password,
      err => {
        // They should definitely be valid login credentials
        // as they've come through the check-credentials thunk
        // but let's keep this for safety
        if (err) {
          toastr.error(
            'Error',
            'Login failed, please try again'
          );
          return;
        }

        Meteor.call('emit.event', populousEvents.loginSuccess, window.navigator.userAgent);

        Meteor.call('user.tryToUpdateUnsupportedCountry', () => {
          Meteor.call('user.checkKYCFiles', () => {
            // Meteor.logoutOtherClients(() => {
              if (user.isBorrower()) {
                user.callMethod('updateZScore', (err) => {
                  if (err) {
                    toastr.error('Failed to get z-score');
                    console.log('error: ', err);
                  }
                });
              } else {
                (new Wallet()).callMethod('recheckWalletStatus');
              }
            // });
          });
        });

        const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
        const isNewUser = !user.twoFAKey && !defaultUsersEmails.includes(user.emailAddress());
        const param = isNewUser && !user.isTermsConfirmed ? 'terms' : isNewUser ? 'setup-2fa' : '/dashboard';

        localStorage.setItem('lastActiveTime', null);
        localStorage.setItem('isNewUser', isNewUser);
        dispatch(push(param));

        //Log out other clients logged in as the current user, but does not log out the client that calls this function.
      }
    );
  };
};

export default loginAfter2FA;
