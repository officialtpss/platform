import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { User } from 'meteor/populous:api';

import store from '/imports/store';

Accounts.onEmailVerificationLink(async(params, done) => {
  const separatorIndex = params.indexOf('/');
  const token = params.slice(0, separatorIndex);
  const userId = params.slice(separatorIndex + 1, params.length);

  const isVerifiedEmail = await (new Promise((resolve, reject) => {
    Meteor.call('users.checkEmailVerified', userId, (err, user) => {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  }));

  Accounts.verifyEmail(token, err => {
    if (err) {
      let reason = err.reason;
      if (err.error === 403) {
        reason = isVerifiedEmail ? 'You have already verified your email. Log in using your registered email to setup your account' :
          'You can log in using your registered email and password to setup your account';

      }

      toastr.error('Verification failed', reason);

    } else {
      localStorage.setItem('isNewUser', true);
      toastr.success('Verification successful');
    }

    done();
    store.dispatch(push('/terms'));
  });
});
