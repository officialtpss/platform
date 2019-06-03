import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const emailValidateCollection = new Mongo.Collection('email_validate');

const EmailValidate = Class.create({
  name: 'EmailValidate',
  collection: emailValidateCollection,
  fields: {
    subject: {
      validators: [{ type: 'unique' }],
      type: String,
    },

    url: {
      validators: [{ type: 'unique' }],
      type: String,
    },
  },

  behaviors: ['timestamp'],

  events: {

  },

  helpers:{

  }
});

export default EmailValidate;
