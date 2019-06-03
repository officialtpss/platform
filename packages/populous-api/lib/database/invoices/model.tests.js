import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import {
  currencies,
  invoiceStatuses
} from 'meteor/populous:constants';

import '../accounts/server/accounts-hooks';
import Invoice from './model';

describe('Invoices model', function() {

  // Create a date 1 week from today
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  describe('creating an invoice', function() {
    it('should error if no user is logged in', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      try {
        invoice.create();
      } catch(err) {
        assert.equal(err.message, 'No user logged in');
        done();
      }
    });

    it('should automatically set the status to pending', function(done) {
      const invoice = new Invoice({
        amount: 100,
        invoiceNumber: '001',
        debtorName: 'Google',
        salePrice: 80,
        dueDate,
        currency: currencies.GBP,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err, result) {
        if(err){
          throw err;
        }
        const newInvoice = Invoice.findOne({_id: result});
        assert.equal(newInvoice.status, invoiceStatuses.pending);
        invoice.remove();
        done();
      });
    });

    it('should error if the amount is missing', function(done) {
      const invoice = new Invoice({
        salePrice: 80,
        invoiceNumber: '001',
        debtorName: 'Google',
        currency: currencies.GBP,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'amount');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the amount is 0', function(done) {
      const invoice = new Invoice({
        amount: 0,
        salePrice: 80,
        invoiceNumber: '001',
        debtorName: 'Google',
        currency: currencies.GBP,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'amount');
        assert.include(err.reason, 'greater');
        done();
      });
    });

    it('should error if the salePrice is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        invoiceNumber: '001',
        debtorName: 'Google',
        currency: currencies.GBP,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'salePrice');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the salePrice is 0', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 0,
        invoiceNumber: '001',
        debtorName: 'Google',
        currency: currencies.GBP,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'salePrice');
        assert.include(err.reason, 'greater');
        done();
      });
    });

    it('should error if the salePrice is more than the amount', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 101,
        invoiceNumber: '001',
        debtorName: 'Google',
        currency: currencies.GBP,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'salePrice');
        assert.include(err.reason, 'lower');
        done();
      });
    });

    it('should error if the currency is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        invoiceNumber: '001',
        debtorName: 'Google',
        salePrice: 80,
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'currency');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the dueDate is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        invoiceNumber: '001',
        debtorName: 'Google',
        salePrice: 80,
        currency: currencies.GBP,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'dueDate');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the dueDate is before the createdAt date', function(done) {

      // Create a date 1 week ago
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 7);

      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        currency: currencies.GBP,
        invoiceNumber: '001',
        debtorName: 'Google',
        dueDate: oldDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'dueDate');
        assert.include(err.reason, 'future');
        done();
      });
    });

    it('should error if the invoiceNumber is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'invoiceNumber');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the invoiceNumber is not atleast 1 character long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        currency: currencies.GBP,
        invoiceNumber: '',
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'invoiceNumber');
        assert.include(err.reason, 'at least 1');
        done();
      });
    });

    it('should error if the debtorName is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        currency: currencies.GBP,
        invoiceNumber: '001',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'debtorName');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the debtorName less than 1 character long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        debtorName: '',
        currency: currencies.GBP,
        invoiceNumber: '001',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'debtorName');
        assert.include(err.reason, 'at least 1');
        done();
      });
    });

    it('should error if the debtorName is over 70 characters', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar foo bar',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'debtorName');
        assert.include(err.reason, 'at most 70');
        done();
      });
    });

    it('should error if the invoiceFileId is missing', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'invoiceFileId');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the invoiceFileId is less than 17 characters long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'foo'
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'invoiceFileId');
        assert.include(err.reason, 'has to be 17');
        done();
      });
    });

    it('should error if the invoiceFileId is more than 17 characters long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'foobarfoobarfoobarfoobarfoobar'
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'invoiceFileId');
        assert.include(err.reason, 'has to be 17');
        done();
      });
    });

    it('should error if the signedContractIPFSHash is less than 46 characters long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
        signedContractIPFSHash: 'foo'
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'signedContractIPFSHash');
        assert.include(err.reason, 'has to be 46');
        done();
      });
    });

    it('should error if the invoiceFileId is more than 46 characters long', function(done) {
      const invoice = new Invoice({
        amount: 100,
        salePrice: 80,
        invoiceNumber: '001',
        currency: currencies.GBP,
        debtorName: 'Google',
        dueDate,
        invoiceFileId: 'rXXsnupAHfNwu9JzQ',
        signedContractIPFSHash: 'We5jEFrWyfg8jHIA4prWe5jEFrWyfg8jHIA4prqqWe5jEFrWyfg8jHIA4prq'
      });

      invoice.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'signedContractIPFSHash');
        assert.include(err.reason, 'has to be 46');
        done();
      });
    });
  });

  describe('borrower helper', function() {
    it('should return an instance of the user model class', function(done) {
      // TODO
      done();
    });
  });
});
