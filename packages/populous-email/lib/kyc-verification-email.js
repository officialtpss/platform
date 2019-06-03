import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { statuses, companyDetails, emailTemplates, getEmailTemplate } from 'meteor/populous:constants';
import { EmailTemplate, User } from 'meteor/populous:api';

Meteor.methods({
  sendKYCVerificationEmail(to, decision) {

    // Make sure that all arguments are strings.
    check([to, decision], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    let template = EmailTemplate.findOne({systemName: emailTemplates.KycVerificationConfirm.systemName});
    let subject = template.subject;
    const user = User.findOne({'emails.address': this.userId});
    let body = template.body.replace('{{name}}', user.fullName());

    if (decision === statuses.declined) {
      template = EmailTemplate.findOne({systemName: emailTemplates.KycVerificationDecline.systemName});
      body = template.body.replace('{{name}}', user.fullName()).replace('{{supportMail}}', companyDetails.supportEmail);
    }

    const from = companyDetails.fromEmail;

    Email.send({
      to,
      from,
      subject,
      html: getEmailTemplate(body)
    });
  }
});
