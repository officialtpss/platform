import ContractTemplate from '../model';

// Publish contract template
Meteor.publish('contractTemplate', function() {
  return ContractTemplate.find({});
});
