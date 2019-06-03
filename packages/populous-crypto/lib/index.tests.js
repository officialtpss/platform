import crypto from 'crypto';
import { assert } from 'chai';

import { encrypt, decrypt } from './';

describe('When using our crypto package', function() {
  describe('The encrypt function', function() {
    it('should accept a string and return an object with iv and string props', function(done) {
      const res = encrypt('foo');
      assert.hasAllKeys(res, ['iv', 'string']);
      done();
    });

    it('IVs and encrypted strings should be unique when ran multiple times with the same data', function(done) {
      const res = encrypt('foo');
      const res2 = encrypt('foo');
      assert.notEqual(res.iv, res2.iv);
      assert.notEqual(res.string, res2.string);
      done();
    });
  });

  describe('The decrypt function', function() {
    it('should accept a string and an IV and return a string', function(done) {
      // IV is 16 chars
      const iv = crypto.randomBytes(16);
      const res = decrypt('foo', iv.toString('hex'));
      assert.isString(res);
      done();
    });

    it('should successfully decrypt', function(done) {
      const encrypted = encrypt('foo');
      const res = decrypt(encrypted.string, encrypted.iv);
      assert.equal(res, 'foo');
      done();
    });
  });
});
