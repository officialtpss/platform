import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { emailTemplates } from 'meteor/populous:constants';

const emailTemplate = new Mongo.Collection('email_template');

const EmailTemplate = Class.create({
  name: 'EmailTemplate',
  collection: emailTemplate,

  fields: {
    name: {
      type: String
    },
    subject: {
      type: String
    },
    body: {
      type: String
    },
    systemName: {
      type: String,
      optional: true,
      default: null,
    }
  },

  behaviors: ['timestamp'],

  events: {
    beforeInsert(e) {
    }
  },

  meteorMethods: {
    create() {
      const meteor = DDP._CurrentInvocation.get();

      // Throw if no user is logged in, there is
      // something fishy going on
      if (!meteor.userId) {
        throw new Error('No user logged in');
      }

      // We want to add the userId on the server
      // so people cannot create files in another
      // persons name
      this.save();

      // Return the new file object
      return this;
    },
    updateTemplate(updates) {
      // Loop through the bank detail fields
      // and update the values of the current user
      for (let field in updates) {
        const val = updates[field];
        if (val) {
          this[field] = updates[field];
        }
      }
      this.save();

      return this;
    },

    async setDefaultTemplates(){

      for(let name in emailTemplates){
        const isExists = EmailTemplate.findOne({systemName: name});

        if(!isExists){
          const newTemplate = new EmailTemplate({
            name: emailTemplates[name].name,
            subject: emailTemplates[name].subject,
            body: emailTemplates[name].body,
            systemName: emailTemplates[name].systemName,
          });
          newTemplate.save();
        }
      }
    },

    delete() {
      // check security here
      this.remove();
    }
  }
});

export default EmailTemplate;
