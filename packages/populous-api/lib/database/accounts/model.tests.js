import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import './server/accounts-hooks';
import User from './model';
import EthId from '../eth_ids/model';
import {
  personalDetailsFields,
  userRoles,
  statuses
} from 'meteor/populous:constants';

describe('Accounts User model', function() {
  let user;

  before(function() {
    Accounts.createUser({
      email: 'user@example.com',
      password: 'password',
      firstName: 'foo',
      lastName: 'bar',
      role: userRoles.admin
    });

    user = User.findOne();
  });

  after(function() {
    EthId.findOne({ userId: user._id }).remove();
    user.remove();
  });

  describe('when updating the user it', function() {
    it('should not allow email to be modified', function(done) {
      const u = User.findOne();
      u.emails.push({ address: 'new@email.com', verified: false });
      u.save(function() {
        assert.equal(User.findOne().emails.length, 1);
        done();
      });
    });

    it('should not allow password to be modified', function(done) {
      const u = User.findOne();
      u.services = { password: { bcrypt: 'some new hash' } };
      u.save(function() {
        assert.notEqual(
          User.findOne().services.password.bcrypt,
          'some new hash'
        );
        done();
      });
    });

    it('should not allow status to be modified', function(done) {
      const u = User.findOne();
      u.status = { online: 'foo' };
      u.save(function() {
        assert.equal(User.findOne().status.online, false);
        done();
      });
    });

    it('should not allow role to be modified', function(done) {
      const u = User.findOne();
      u.role = userRoles.borrower;
      u.save(function() {
        assert.equal(User.findOne().role, userRoles.admin);
        done();
      });
    });

    it('should error if firstName is empty', function(done) {
      const u = User.findOne();
      u.firstName = '';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'firstName');
        assert.include(err.reason, 'at least 1');
        done();
      });
    });

    it('should error if firstName is missing', function(done) {
      const u = User.findOne();
      u.firstName = null;
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'firstName');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if firstName is longer than 20 characters', function(done) {
      const u = User.findOne();
      u.firstName = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'firstName');
        assert.include(err.reason, 'at most 20');
        done();
      });
    });

    it('should error if lastName is empty', function(done) {
      const u = User.findOne();
      u.lastName = '';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'lastName');
        assert.include(err.reason, 'at least 1');
        done();
      });
    });

    it('should error if lastName is missing', function(done) {
      const u = User.findOne();
      u.lastName = null;
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'lastName');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if lastName is longer than 20 characters', function(done) {
      const u = User.findOne();
      u.lastName = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'lastName');
        assert.include(err.reason, 'at most 20');
        done();
      });
    });

    it('should error if phoneAreaCode is not one of the availale area codes', function(done) {
      const u = User.findOne();
      u.phoneAreaCode = '+999';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'phoneAreaCode');
        assert.include(err.reason, 'one of');
        done();
      });
    });

    it('should error if phoneNumber is longer than 14 characters', function(done) {
      const u = User.findOne();
      u.phoneNumber = '00000000000000000000';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'phoneNumber');
        assert.include(err.reason, 'at most 14');
        done();
      });
    });

    it('should error if phoneNumber contains any non-numeric characters', function(done) {
      const u = User.findOne();
      u.phoneNumber = '1111111ABC';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'phoneNumber');
        assert.include(err.reason, 'numeric');
        done();
      });
    });

    it('should not error if phoneNumber is an empty string', function(done) {
      const u = User.findOne();
      u.phoneNumber = '';
      u.save(function(err) {
        assert.isUndefined(err);
        done();
      });
    });

    it('should error if occupation is longer than 20 characters', function(done) {
      const u = User.findOne();
      u.occupation = 'This is a really really really really really really long occupation description';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'occupation');
        assert.include(err.reason, 'at most 20');
        done();
      });
    });

    it('should error if companyName is longer than 70 characters', function(done) {
      const u = User.findOne();
      u.companyName = 'This is a really really really really really really really long company name';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'companyName');
        assert.include(err.reason, 'at most 70');
        done();
      });
    });

    it('should error if companyNumber is longer than 20 characters', function(done) {
      const u = User.findOne();
      u.companyNumber = 'DH298FII23NFNHJBF298F2BF2HJW98H23IBF';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'companyNumber');
        assert.include(err.reason, 'at most 20');
        done();
      });
    });

    it('should error if addressLine1 is longer than 70 characters', function(done) {
      const u = User.findOne();
      u.addressLine1 = 'This is a really really really really really really really long address';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'addressLine1');
        assert.include(err.reason, 'at most 70');
        done();
      });
    });

    it('should error if addressLine2 is longer than 70 characters', function(done) {
      const u = User.findOne();
      u.addressLine2 = 'This is a really really really really really really really long address';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'addressLine2');
        assert.include(err.reason, 'at most 70');
        done();
      });
    });

    it('should error if city is longer than 70 characters', function(done) {
      const u = User.findOne();
      u.city = 'This is a really really really really really really really long city name';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'city');
        assert.include(err.reason, 'at most 70');
        done();
      });
    });

    it('should error if postcode is longer than 10 characters', function(done) {
      const u = User.findOne();
      u.postcode = 'OS38 292 S933B';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'postcode');
        assert.include(err.reason, 'at most 10');
        done();
      });
    });

    it('should error if county is not one of the county codes', function(done) {
      const u = User.findOne();
      u.country = 'AA';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'country');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('should error if county is empty', function(done) {
      const u = User.findOne();
      u.country = '';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'country');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('should error if county is missing', function(done) {
      const u = User.findOne();
      u.country = null;
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'country');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if accountNumber is less than 8 characters', function(done) {
      const u = User.findOne();
      u.accountNumber = '38484';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'accountNumber');
        assert.include(err.reason, 'has to be 8');
        done();
      });
    });

    it('should error if accountNumber is more than 8 characters', function(done) {
      const u = User.findOne();
      u.accountNumber = '3848432929239329329329329';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'accountNumber');
        assert.include(err.reason, 'has to be 8');
        done();
      });
    });

    it('should error if accountNumber contains non-numeric characters', function(done) {
      const u = User.findOne();
      u.accountNumber = '1234567P';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'accountNumber');
        assert.include(err.reason, 'numeric values');
        done();
      });
    });

    it('should error if sortCode is less than 6 characters', function(done) {
      const u = User.findOne();
      u.sortCode = '384';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'sortCode');
        assert.include(err.reason, 'has to be 6');
        done();
      });
    });

    it('should error if sortCode is more than 6 characters', function(done) {
      const u = User.findOne();
      u.sortCode = '3848432929239329329329329';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'sortCode');
        assert.include(err.reason, 'has to be 6');
        done();
      });
    });

    it('should error if sortCode contains non-numeric characters', function(done) {
      const u = User.findOne();
      u.sortCode = '12345b';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'sortCode');
        assert.include(err.reason, 'numeric values');
        done();
      });
    });

    it('should error if iban is longer than 32 characters', function(done) {
      const u = User.findOne();
      u.iban = 'efbwbefjbj23bjrb23jbrj2b3rbj23brjh2b3jbrj23brjb23jbrj2';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'iban');
        assert.include(err.reason, 'at most 32');
        done();
      });
    });

    it('should error if averageInvoiceValue is not one of the averageInvoiceValues', function(done) {
      const u = User.findOne();
      u.averageInvoiceValue = 'foo';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'averageInvoiceValue');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('should error if averageInvoiceVolume is not one of the averageInvoiceVolumes', function(done) {
      const u = User.findOne();
      u.averageInvoiceVolume = 'foo';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'averageInvoiceVolume');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('should error if preferredCurrency is not one of the currencies', function(done) {
      const u = User.findOne();
      u.preferredCurrency = 'foo';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'preferredCurrency');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('KYCStatus should error if not one of the status values', function(done) {
      const u = User.findOne();
      u.KYCStatus = 'foo';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'KYCStatus');
        assert.include(err.reason, 'one of the values');
        done();
      });
    });

    it('twoFAKey should error if its not a 40 char String', function(done) {
      const u = User.findOne();
      u.twoFAKey = 'ABCDEFG';
      u.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'twoFAKey');
        assert.include(err.reason, 'has to be 40');
        done();
      });
    });
  });

  describe('fullName helper', function() {
    it('should return a String containing the full name of the user', function(done) {
      assert.isString(user.fullName());
      assert.equal(user.fullName(), 'foo bar');
      done();
    });
  });

  describe('emailAddress helper', function() {
    it('should return a String containing the email address of the user', function(done) {
      assert.isString(user.emailAddress());
      assert.equal(user.emailAddress(), 'user@example.com');
      done();
    });
  });

  describe('emailAddressVerified helper', function() {
    it('should return a Boolean stating if the email address of the user is verified', function(done) {
      assert.isBoolean(user.emailAddressVerified());
      assert.isFalse(user.emailAddressVerified());
      done();
    });
  });

  describe('roles helpers', function() {
    const admin = new User({
      emails: [ { address: 'admin@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      services: {},
      role: userRoles.admin
    });

    const investor = new User({
      emails: [ { address: 'investor@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      services: {},
      role: userRoles.investor
    });

    const borrower = new User({
      emails: [ { address: 'borrower@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      services: {},
      role: userRoles.borrower
    });

    it('isAdmin should return true is the user is an admin', function(done) {
      assert.isTrue(admin.isAdmin());
      done();
    });

    it('isAdmin should return false is the user is not an admin', function(done) {
      assert.isFalse(investor.isAdmin());
      assert.isFalse(borrower.isAdmin());
      done();
    });

    it('isInvestor should return true is the user is an investor', function(done) {
      assert.isTrue(investor.isInvestor());
      done();
    });

    it('isInvestor should return false is the user is not an investor', function(done) {
      assert.isFalse(admin.isInvestor());
      assert.isFalse(borrower.isInvestor());
      done();
    });

    it('isBorrower should return true is the user is a borrower', function(done) {
      assert.isTrue(borrower.isBorrower());
      done();
    });

    it('isBorrower should return false is the user is not a borrower', function(done) {
      assert.isFalse(admin.isBorrower());
      assert.isFalse(investor.isBorrower());
      done();
    });
  });

  describe('when using the updatePersonalDeatils meteor method', function() {
    it('should not allow email to be modified', function(done) {
      user.updatePersonalDetails({ email: 'new@email.com' }, () => {
        assert.equal(User.findOne().emailAddress(), 'user@example.com');
        done();
      });
    });

    it('should not allow password to be modified', function(done) {
      const updates = { services: { password: { bcrypt: 'test' } } };
      user.updatePersonalDetails(updates, () => {
        assert.notEqual(
          User.findOne().services.password.bcrypt,
          'test'
        );
        done();
      });
    });

    it('should save any changes to any of the personalDetailsFields', function(done) {
      const updates = {}, field = personalDetailsFields[0];
      updates[field] = 'new val';
      user.updatePersonalDetails(updates, () => {
        assert.equal(User.findOne()[field], 'new val');
        done();
      });
    });
  });

  describe('when using the updateBankDeatils meteor method', function() {
    it('should not allow non-bank detail fields to be modified', function(done) {
      user.updateBankDetails({
        email: 'new@email.com',
        firstName: 'new name'
      }, () => {
        const u = User.findOne();
        assert.equal(u.emailAddress(), 'user@example.com');
        assert.equal(u.firstName, 'foo');
        done();
      });
    });

    it('should save any changes to any of the bankDetailsFields', function(done) {
      user.updateBankDetails({
        accountNumber: '00000000',
        sortCode: '000000',
        iban: 'abc1234567890',
      }, () => {
        const u = User.findOne();
        assert.equal(u.accountNumber, '00000000');
        assert.equal(u.sortCode, '000000');
        assert.equal(u.iban, 'abc1234567890');
        done();
      });
    });
  });

  describe('when using the saveKYCData meteor method', function() {
    it('should error if the averageInvoiceValue isnt valid', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 'foo',
        averageInvoiceVolume: 3,
        currencySelector: 'GBP',
        uploadedBankStatements: ['00000000000000000'],
        uploadedPersonalIdDocuments: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(err.message, 'Malformed request');
        done();
      });
    });

    it('should error if the averageInvoiceVolume isnt valid', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 'foo',
        currencySelector: 'GBP',
        uploadedBankStatements: ['00000000000000000'],
        uploadedPersonalIdDocuments: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(err.message, 'Malformed request');
        done();
      });
    });

    it('should error if the currency is missing', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 3,
        uploadedBankStatements: ['00000000000000000'],
        uploadedPersonalIdDocuments: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(err.message, 'Malformed request');
        done();
      });
    });

    it('should error if the uploadedBankStatements is missing', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 3,
        currencySelector: 'GBP',
        uploadedPersonalIdDocuments: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(err.message, 'Malformed request');
        done();
      });
    });

    it('should error if the uploadedPersonalIdDocuments is missing', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 3,
        currencySelector: 'GBP',
        uploadedBankStatements: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(err.message, 'Malformed request');
        done();
      });
    });

    it('should change the KYCStatus to "pending"', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 3,
        currencySelector: 'GBP',
        uploadedPersonalIdDocuments: ['00000000000000000'],
        uploadedBankStatements: ['00000000000000000'],
      }, (err, res) => {
        assert.equal(res.KYCStatus, statuses.pending);
        done();
      });
    });

    it('should also update personal info fields', function(done) {
      user.saveKYCData({
        averageInvoiceValue: 3,
        averageInvoiceVolume: 3,
        currencySelector: 'GBP',
        uploadedPersonalIdDocuments: ['00000000000000000'],
        uploadedBankStatements: ['00000000000000000'],
        firstName: 'bob',
      }, (err, res) => {
        assert.equal(res.firstName, 'bob');
        done();
      });
    });
  });

  describe('when using the verifyKYC meteor method', function() {
    it('should change the users KYCStatus field to "verified"', function(done) {
      user.verifyKYC(() => {
        const u = User.findOne();
        assert.equal(u.KYCStatus, statuses.verified);
        done();
      });
    });

    it('should change the KYCDeclinedReason to an empty string', function(done) {
      user.verifyKYC(() => {
        const u = User.findOne();
        assert.equal(u.KYCDeclinedReason, '');
        done();
      });
    });
  });

  describe('when using the save2FASecret meteor method', function() {
    it('should set the users twoFAKey field to the sent code', function(done) {
      const key = '5b7576302c505d71794e7a46517d297373354b38';
      user.save2FASecret(key, () => {
        const u = User.findOne();
        assert.equal(u.twoFAKey, key);
        done();
      });
    });
  });
});
