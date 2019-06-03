import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import EthId from './model';

describe('EthId model', function() {
  describe('when creating an ethId', function() {
    it('should error if the userId is missing', function(done) {
      const ethId = new EthId();


      ethId.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'userId');
        assert.include(err.reason, 'required');
        done();
      });
    });

    it('should error if the userId is less than 17 characters long', function(done) {
      const ethId = new EthId({ userId: 'foobar' });

      ethId.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'userId');
        assert.include(err.reason, 'has to be 17');
        done();
      });
    });

    it('should error if the userId is more than 17 characters long', function(done) {
      const ethId = new EthId({ userId: 'foobarfoobarfoobarfoobarfoobar' });

      ethId.save(function(err) {
        assert.equal(err.error, 'validation-error');
        assert.include(err.reason, 'userId');
        assert.include(err.reason, 'has to be 17');
        done();
      });
    });

    it('should ignore any manually set ethId', function(done) {
      const testId = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      const ethId = new EthId({
        ethId: testId,
        userId: 'aaaaaaaaaaaaaaaaa'
      });

      ethId.save(function() {
        assert.notEqual(ethId.ethId, testId);
        ethId.remove();
        done();
      });
    });

    it('should automatically create a 32 character String `ethId` property', function(done) {
      const ethId = new EthId({ userId: 'aaaaaaaaaaaaaaaaa' });

      ethId.save(function() {
        assert.equal(ethId.ethId.length, 32);
        assert.isString(ethId.ethId);
        ethId.remove();
        done();
      });
    });
  });
});
