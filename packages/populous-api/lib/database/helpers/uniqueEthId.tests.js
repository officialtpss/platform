import { assert } from 'chai';
import sinon from 'sinon';

import EthId from '../eth_ids/model';
import { randomStr, stubRandomStr } from './randomStr';
import uniqueEthId from './uniqueEthId';

describe('The uniqueEthId function', function() {
  const fakeEthId = 'YQ2i4KiihumSeeNMQw6aHdrdSeORJLLg';
  const fakeEthId2 = 'zP0eszHIHBU8BoII2SuRp2At1BJjEelV';

  it('should find (and fetch) all of the EthId documents', function(done) {

    // Stub find and fetch methods so we can see if they are called
    const fetch = sinon.stub().returns([]);
    const find = sinon.stub(EthId, 'find').returns({ fetch });

    uniqueEthId();

    assert(find.called);
    assert(fetch.called);

    EthId.find.restore();
    done();
  });

  it('should return recursively call if the new randomStr already exists', function(done) {

    // Stub fetch so it returns a fake EthId doc
    const fetch = sinon.stub().returns([{ ethId: fakeEthId }]);
    sinon.stub(EthId, 'find').returns({ fetch });

    // We're going to stub this functino so lets
    // clone now so we can replace later
    const randomStrCopy = randomStr;

    // Stub the randomStr function so that it returns
    // an existing ethId the first time, but a new one
    // the second time
    const randomStrStub = sinon.stub()
      .onFirstCall().returns(fakeEthId)
      .onSecondCall().returns(fakeEthId2);

    // Re-wire the randomStr function
    stubRandomStr(randomStrStub);

    const res = uniqueEthId();

    assert(randomStrStub.calledTwice, 'randomStrStub not recursively called');
    assert.equal(res, fakeEthId2);

    EthId.find.restore();

    // Restore the randomStr function
    stubRandomStr(randomStrCopy);

    done();
  });
});
