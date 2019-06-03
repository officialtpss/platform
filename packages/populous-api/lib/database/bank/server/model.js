import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
import {companyDetails, emailTemplates, countries, getEmailTemplate} from 'meteor/populous:constants';

import checkAuth from '../../helpers/checkAuth';
import Bank from '../model';
import EmailTemplate from "../../email_template/model";
import {User} from "../../index";


Bank.extend({
  meteorMethods: {
    create() {
      const userId = checkAuth();
      this.userId = userId;
      this.save();

      // Return the new file object
      return this;
    },
    updateBank(updates) {
      checkAuth();
      for (let field in updates) {
        const val = updates[field];
        if (val) {
          this[field] = updates[field];
        }
      }
      this.save();

      return this;
    },
    delete() {
      checkAuth();
      this.remove();
    },
    sendEmailNotification(type) {
      const template = EmailTemplate.findOne({systemName: 'SendBankDetails'});

      if (template) {
        const toUser = User.findOne({_id: this.userId});
        const from = companyDetails.fromEmail;
        const subject = template.subject.replace('{{type}}', type);

        const length = this.number.length;
        let bankNumber;
        if (length > 4) {
          bankNumber = this.number.substring(length - 4);
          bankNumber = '*'.repeat(length - 4) + bankNumber;
        } else {
          bankNumber = this.number;
        }

        let country = this.country;
        for (let c of countries) {
          if (c.key == country) {
            country = c.name;
            break;
          }
        }

        const body = template.body.replace('{{bankName}}', this.name)
          .replace('{{country}}', country)
          .replace('{{name}}', toUser.fullName())
          .replace('{{number}}', bankNumber);

        toUser.emails.forEach((email) => {
          if (email.verified) {
            Email.send({
              to: email.address,
              from,
              subject,
              html: getEmailTemplate(body)
            });
          }
        });
      }
    },
  }
});
