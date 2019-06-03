import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { userRoles, statuses } from 'meteor/populous:constants';
import { encrypt } from 'meteor/populous:crypto';

import './publications'; // Make sure the publication is in scope
import User from '../model';
import File from '../../files/model';

describe('Accounts publications', function() {
  const encryptedFileObj = encrypt('hello');
  let user, user2, file;

  before(function() {
    file = new File({
      userId: 'Fh28dd24S4jdj9khe',
      name: 'test.pdf',
      encryptedFile: encryptedFileObj.string,
      encryptionIV: encryptedFileObj.iv
    });

    file.save();

    user = new User({
      emails: [ { address: 'user@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      services: {},
      role: userRoles.admin
    });

    user2 = new User({
      emails: [ { address: 'user2@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      companyName: 'Google',
      services: {},
      role: userRoles.borrower,
      KYCStatus: statuses.pending,
      bankStatementDocumentIds: [],
      idDocumentIds: [file._id]
    });

    user.save();
    user2.save();
  });

  after(function() {
    file.remove();
    user.remove();
    user2.remove();
  });

  describe('the accounts.all pub', function() {
    it('should publish all user documents', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.all', ({ users }) => {
        assert.equal(users.length, 2);
        done();
      });
    });

    it('should not publish the passwords of any users', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.all', ({ users }) => {
        assert.notExists(users[0].services);
        done();
      });
    });
  });

  describe('the accounts.user pub', function() {
    it('should publish only the document for the userId passed', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.user', user2._id, ({ users }) => {
        assert.equal(users.length, 1);
        done();
      });
    });

    it('should not publish the password of the user', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.user', user2._id, ({ users }) => {
        assert.notExists(users[0].services);
        done();
      });
    });
  });

  describe('the accounts.pending pub', function() {
    it('should publish only the documents with a KYCStatus of pending', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.pending', ({ users }) => {
        assert.equal(users.length, 1);
        assert.equal(users[0].KYCStatus, statuses.pending);
        done();
      });
    });

    it('should publish only the required fields', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.pending', ({ users }) => {
        const u = users[0];
        assert.exists(u.firstName);
        assert.exists(u.lastName);
        assert.exists(u.companyName);
        assert.exists(u.role);
        assert.exists(u.updatedAt);
        assert.exists(u.KYCStatus);
        done();
      });
    });

    it('should not publish the password of the user', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.pending', ({ users }) => {
        assert.notExists(users[0].services);
        done();
      });
    });
  });

  describe('the accounts.user-kyc pub', function() {
    it('should publish user and its KYC documents', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.user-kyc', user2._id, ({ users, files }) => {
        assert.equal(users.length, 1);
        assert.equal(files.length, 1);
        assert.equal(users[0].idDocumentIds[0], files[0]._id);
        done();
      });
    });

    it('should not publish the userId of the file', function(done) {
      const collector = new PublicationCollector();

      collector.collect('accounts.user-kyc', user2._id, ({ files }) => {
        assert.notExists(files[0].userId);
        done();
      });
    });
  });
});
