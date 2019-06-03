import { Accounts } from 'meteor/accounts-base';
import { User } from 'meteor/populous:api';

Accounts.validateLoginAttempt(({ allowed, methodName, user }) => {

  // If the login has failed further up the stack
  // we don't want to trigger the rest of this code
  if (!allowed) {
    return false;
  }

  // Client-side account creation calls the login flow. We don't
  // want to check the rest on registration so just allow it
  if (methodName === 'createUser') {
    return true;
  }

  const u = new User(user);

  // Only allow non-admins to login
  if (u.isAdmin()) {
    return false;
  }

  // Don't allow users with unverified email address
  // Throwing a Meteor.Error will pass the error to the client
  if (!u.emailAddressVerified()) {
    throw new Meteor.Error(
      'not-verified',
      'Please verify your email address'
    );
  }

  return true;
});
