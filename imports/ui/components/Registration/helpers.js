import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';
import { userRoles, timezoneValues } from 'meteor/populous:constants';
import { User } from 'meteor/populous:api';

// This function is used to register a new
// user as an investor
export const createUser = (values, role, push) => {

  const { firstName, lastName, password, passwordConfirm, email, country } = values

  if (passwordConfirm && password !== passwordConfirm) {
    toastr.error('Error', 'Your passwords do not match');
    return
  }

  const user = {
    email,
    password,
    role
  };

  if (role === userRoles.borrower) {
    user.firstName = firstName
    user.lastName = lastName
    user.country = country
  }

  _createUser(user, push);
};

// Validate and create the user
// @param {Object} user must be an object of user fields
// @param {Function} push must be react-router `history.push()`
const _createUser = (user, push) => {
  const offset = 0 - (new Date()).getTimezoneOffset() / 60;
  const _user = {
    ...user,
    timezone: timezoneValues['GMT' + offset]
  };
  Accounts.createUser(
    _user,
    err => {
      if (err) {
        if (err.reason === 'Email already exists.') {
          toastr.error('Error', 'That email address is already registered');
        } else {
          toastr.error('Error', 'Something went wrong! Please try again');
        }
      }

      new User().callMethod('findUserByEmail', user.email, (newUserError, newUser) => {
        Meteor.call('users.onAfterInsert', newUser._id)
      });

      // The createUser method tries to log the user in so
      // we manyally log them out and push them to login
      Meteor.logout(() => {
        push('/login', {showModal: true});
      });
    }
  );
};

// Use this function to check if the email does already exist
// @param email
export const checkEmail = email => {
  return new Promise((resolve, reject) => {
    Meteor.call('account.emailExist', email, (error, result) => {
      if (error) {
        toastr.error('Error', 'Something went wrong! Please try again');
        reject(error);
      } else {
        if (result) {
          reject('exist');
        } else {
          resolve();
        }
      }
    })
  });
};
