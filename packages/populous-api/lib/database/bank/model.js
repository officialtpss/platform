import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { currencies, countries } from 'meteor/populous:constants';

const bank = new Mongo.Collection('bank');

const Bank = Class.create({
  name: 'Bank',
  collection: bank,

  fields: {
    userId: {
      type: String,
      optional: true,
      immutable: true
    },
    name: {
      type: String
    },
    country: {
      type: String
    },
    currency: {
      type: String
    },
    sortCode: {
      type: String
    },
    number: {
      type: String
    }
  },

  behaviors: ['timestamp'],

  events: {
    afterInsert(e) {
      Meteor.defer(()=>e.target.sendEmailNotification('added'));
    },
    afterUpdate(e) {
      Meteor.defer(()=>e.target.sendEmailNotification('updated'));
    }
  },
});

export default Bank;
