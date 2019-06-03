import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { companyDetails } from 'meteor/populous:constants';

Meteor.methods({
  sendEmail(to, subject, html) {

    // Make sure that all arguments are strings.
    check([to, subject, html], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    const from = companyDetails.fromEmail;

    Email.send({ to, from, subject, html });
  }
});
