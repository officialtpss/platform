import EthId from '../model';

// Publish all ethIds
Meteor.publish('ethIds.all', function() {
  return EthId.find();
});
