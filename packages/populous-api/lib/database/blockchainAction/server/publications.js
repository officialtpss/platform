import { publishComposite } from 'meteor/reywood:publish-composite';
import BlockchainAction from '../model';

// Publish the data
Meteor.publish('blockchainAction', function() {
  return BlockchainAction.find({});
});

Meteor.publish('blockchainAction.user', function(userId, type) {
  return BlockchainAction.find({userId, type});
});