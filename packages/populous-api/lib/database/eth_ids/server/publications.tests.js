import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { userRoles } from 'meteor/populous:constants';

import './publications'; // Make sure the publication is in scope
import EthId from '../model';
import User from '../../database/accounts/model';

describe('EthId publications', function() {
  let user, ethId;

  before(function() {
    user = new User({
      emails: [ { address: 'user@example.com', verified: false } ],
      firstName: 'foo',
      lastName: 'bar',
      services: {},
      role: userRoles.borrower
    });

    user.save();

    ethId = new EthId({
      userId: user._id
    });

    ethId.save();
  });

  after(function() {
    user.remove();
    ethId.remove();
  });

  describe('the ethIds.all pub', function() {
    it('should publish all ethId documents', function(done) {
      const collector = new PublicationCollector();

      collector.collect('ethIds.all', ({ ethIds }) => {
        assert.equal(ethIds.length, 1);
        done();
      });
    });
  });
});
