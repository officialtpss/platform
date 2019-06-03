import { Meteor } from 'meteor/meteor';
import Request from '../model';
import { requestTypes } from 'meteor/populous:constants';

Meteor.methods({
  'request.saveBlockchainError'(blockchainActionId, message) {
    Request.insert({
      type: requestTypes.blockchainError,
      dataId: blockchainActionId,
      error: message
    });
  }
});