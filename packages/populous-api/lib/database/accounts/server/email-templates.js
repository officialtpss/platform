import { Accounts } from 'meteor/accounts-base';
import { companyDetails, emailTemplates, getEmailTemplate } from 'meteor/populous:constants';
import EmailTemplate from "../../email_template/model";

Accounts.emailTemplates.siteName = companyDetails.companyName;
Accounts.emailTemplates.from = `${companyDetails.companyName} <${companyDetails.fromEmail}>`;

const getTemplate = (type) => {
  if(emailTemplates.EmailVerification===type){
    return EmailTemplate.findOne({systemName: emailTemplates.EmailVerification.systemName});
  } else if(emailTemplates.ResetPassword===type){
    return EmailTemplate.findOne({systemName: emailTemplates.ResetPassword.systemName});
  }
};

// User registration verification email
Accounts.emailTemplates.verifyEmail = {
  subject() {
    const template = getTemplate(emailTemplates.EmailVerification);
    return template.subject.replace('{{companyName}}',companyDetails.companyName);
  },
  html(user, url) {
    const template = getTemplate(emailTemplates.EmailVerification);
    const emailAddress = user.emails[0].address;
    const emailVerificationToken = user.services.email.verificationTokens[0].token;
    return getEmailTemplate(template.body
      .replace('{{name}}', `${user.firstName} ${user.lastName}`)
      .replace('{{emailAddress}}',emailAddress)
      .replace('{{link}}', url + '/' + user._id)
      .replace('{{emailToken}}', emailVerificationToken)
      .replace(new RegExp('{{supportMail}}', 'g'), companyDetails.supportEmail));
  }
};

// User password reset email
Accounts.emailTemplates.resetPassword = {
  subject() {
    const template = getTemplate(emailTemplates.ResetPassword);
    return template.subject.replace('{{companyName}}',companyDetails.companyName);
  },
  html(user, url) {

    // Let's remove the hash-bang from the default reset email.
    // This will allow us to handle the reset flow using our
    // normal routing + views setup.
    // URL format: example.com/reset-password/<token>
    const template = getTemplate(emailTemplates.ResetPassword);
    const urlWithoutHash = url.replace('#/', '');
    const emailVerificationToken = urlWithoutHash.substr(urlWithoutHash.indexOf('reset-password/')+15);

    //const emailBody = `To reset your password, click on the following link:\n\n${urlWithoutHash}\n\nIf you did not request this password reset then contact the support team on ${companyDetails.supportEmail} immediately.`;
    return getEmailTemplate(template.body
      .replace('{{name}}', `${user.firstName} ${user.lastName}`)
      .replace('{{link}}', urlWithoutHash)
      .replace('{{emailToken}}', emailVerificationToken)
      .replace(new RegExp('{{supportMail}}', 'g'), companyDetails.supportEmail));
  }
};
