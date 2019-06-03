import {Meteor} from 'meteor/meteor';
import {User} from 'meteor/populous:api';
import {userRoles, fixtures} from 'meteor/populous:constants';

// Config imports \\
import '../imports/config/server/accounts';


Meteor.startup(() => {
  // Setup fixtures
  try {
    if (User.find().count() === 0) {
      console.log('=> Installing Accounts fixtures');
      Accounts.createUser(fixtures.users.borrower);
      Accounts.createUser(fixtures.users.investor);
    }


    if (User.find({role: userRoles.admin}).count() === 0) {
      console.log('=> Installing Admin fixtures');
      Accounts.createUser(fixtures.users.admin);
    }
  } catch (error) {
    console.error(error)
  }
});
