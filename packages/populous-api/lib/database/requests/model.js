import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { requestTypes } from 'meteor/populous:constants';

const requests = new Mongo.Collection('requests');

const Request = Class.create({
  name: 'Request',
  collection: requests,

  fields: {
    type: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(requestTypes)
        }
      ]
    },
    adminId: {
      type: String,
      optional: true,
    },
    userId: {
      type: String,
      optional: true,
    },
    dataId: {
      type: String,
    },
    bankId: {
      type: String,
      optional: true,
    },
    amount: {
      type: Number,
      optional: true,
    },
    fee: {
      type: Number,
      optional: true,
    },
    isComplete:{
      type: Boolean,
      default: false,
    },
    error:{
      type: String,
      optional: true
    }
  },

  behaviors: ['timestamp'],

});

export default Request;
