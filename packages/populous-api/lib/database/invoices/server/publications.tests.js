import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { userRoles, currencies } from 'meteor/populous:constants';

import './publications'; // Make sure the publication is in scope
import Invoice from '../model';
import User from '../../database/accounts/model';

describe('Invoice publications', function() {
  let invoice, user;

  // Create a date 1 week from today
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  before(function() {
    user = new User({
      emails: [{ address: 'test@example.com', verified: false }],
      firstName: 'Bob',
      lastName: 'Test',
      role: userRoles.borrower,
      services: {}
    });
    user.save();

    invoice = new Invoice({
      borrowerId: user._id,
      amount: 100,
      salePrice: 80,
      invoiceNumber: '001',
      debtorName: 'Google',
      currency: currencies.GBP,
      dueDate,
      invoiceFileId: 'rXXsnupAHfNwu9JzQ',
    });
    invoice.save();
  });

  after(function() {
    user.remove();
    invoice.remove();
  });

  describe('the invoices.user pub', function() {
    it('should publish all invoice documents for that user', function(done) {
      const collector = new PublicationCollector();

      collector.collect('invoices.user', user._id, ({ invoices }) => {
        assert.equal(invoices.length, 1);
        done();
      });
    });

    it('should publish all of the fields on an invoice', function(done) {
      const collector = new PublicationCollector();

      collector.collect('invoices.user', user._id, ({ invoices }) => {
        assert.exists(invoices[0]._id);
        assert.exists(invoices[0].amount);
        assert.exists(invoices[0].salePrice);
        assert.exists(invoices[0].invoiceNumber);
        assert.exists(invoices[0].currency);
        assert.exists(invoices[0].dueDate);
        assert.exists(invoices[0].debtorId);
        assert.exists(invoices[0].createdAt);
        assert.exists(invoices[0].updatedAt);
        assert.exists(invoices[0].invoiceFileId);
        done();
      });
    });
  });

  describe('the invoices.id pub', function() {
    it('should publish a single invoice document and the borrower for it', function(done) {
      const collector = new PublicationCollector();

      collector.collect('invoices.id', invoice._id, ({ invoices, users }) => {
        assert.equal(invoices.length, 1, 'Invoice not published');
        assert.equal(users.length, 1, 'Borrower not published');
        assert.equal(invoices[0]._id, invoice._id);
        assert.equal(users[0]._id, user._id);
        done();
      });
    });

    it('should publish all of the fields on an invoice', function(done) {
      const collector = new PublicationCollector();

      collector.collect('invoices.id', invoice._id, ({ invoices }) => {
        assert.exists(invoices[0]._id);
        assert.exists(invoices[0].amount);
        assert.exists(invoices[0].salePrice);
        assert.exists(invoices[0].invoiceNumber);
        assert.exists(invoices[0].currency);
        assert.exists(invoices[0].dueDate);
        assert.exists(invoices[0].debtorId);
        assert.exists(invoices[0].createdAt);
        assert.exists(invoices[0].updatedAt);
        assert.exists(invoices[0].invoiceFileId);
        done();
      });
    });
  });
});
