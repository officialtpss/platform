import TermsAndConditions from '../model';

// Publish bank details for user
Meteor.publish('termsAndConditions', function() {
  return TermsAndConditions.find({});
});
