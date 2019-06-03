import { Accounts } from 'meteor/accounts-base';
import { userRoles, countries, currencies } from 'meteor/populous:constants';

import EthId from '../../eth_ids/model';
import LedgerBalance from "../../ledger_balance/model";
// Send verification emails on user creation
Accounts.config({
  sendVerificationEmail: true
});

// This function is called whenever Accounts.createUser()
// successful creates a new user
// http://docs.meteor.com/api/accounts-multi.html#AccountsServer-onCreateUser
Accounts.onCreateUser((options, user) => {
  const userId = user._id;
  // Don't allow any other login methods
  if (!user.services.password) {
    throw new Error('Expected login with password only.');
  }

  // `options` contains all of the non-meteor fields
  const {
    firstName,
    lastName,
    companyName,
    companyNumber,
    companyDescription,
    addressLine1,
    addressLine2,
    city,
    postcode,
    country,
    phoneNumber,
    occupation,
    role,
    timezone,
    socialInsuranceNumber,
    passport,
    isTermsConfirmed,
  } = options;

  // If the user isn't sent with a role, or it's not a
  // valid user role, something malicious is happening
  if (!role || !Object.values(userRoles).includes(role)) {
    throw new Error('Malformed request');
  }

  // Attach the fields we care about to the user object
  // before saving it
  user.firstName = firstName;
  user.lastName = lastName;
  user.companyName = companyName;
  user.companyNumber = companyNumber;
  user.companyDescription = companyDescription;
  user.addressLine1 = addressLine1;
  user.addressLine2 = addressLine2;
  user.city = city;
  user.postcode = postcode;
  user.phoneNumber = phoneNumber;
  user.occupation = occupation;
  user.role = role;
  user.timezone = timezone;
  user.socialInsuranceNumber = socialInsuranceNumber;
  user.passport = passport;
  user.isTermsConfirmed = isTermsConfirmed;

  // Setup the ethId for the user
  //new EthId({ userId: user._id }).save();
  for (let index in currencies) {
    let currency = currencies[index];
    new LedgerBalance({
      userId,
      currency: currency.symbol,
    }).save();
  }

  return user;
});