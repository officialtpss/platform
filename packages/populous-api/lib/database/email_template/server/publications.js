import EmailTemplate from '../model';

// Publish bank details for user
Meteor.publish('email_template.all', function() {
  return EmailTemplate.find({});
});
