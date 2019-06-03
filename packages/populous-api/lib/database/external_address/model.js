import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import moment from 'moment';

const externalsAddressesCollection = new Mongo.Collection('externals_addresses');

const ExternalAddress = Class.create({
  name: 'ExternalAddress',
  collection: externalsAddressesCollection,
  fields: {
    userId: {
      type: String,
    },

    name: {
      type: String,
    },

    newAddress: {
      type: String,
      validators: [{ type: 'unique' }],
      optional: true,
    },

    address: {
      type: String,
      validators: [{ type: 'unique' }],
      optional: true,
    },
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

  helpers:{
    isActive() {
      const currentDate = moment().utc();
      const timeToActivation = moment(this.updatedAt).add(48, 'hours');
      return currentDate.isAfter(timeToActivation);
    }
  }
});

export default ExternalAddress;
