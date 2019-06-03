import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { currencies } from 'meteor/populous:constants';

import helpers from '../helpers/index';

const ethIds = new Mongo.Collection('ethIds');

const EthId = Class.create({
  name: 'EthId',
  collection: ethIds,

  fields: {

    // ethId is set automatically using the
    // beforeInsert event
    ethId: {
      type: String,
      optional: true,
      immutable: true
    },
    userId: {
      type: String,
      validators: [
        { type: 'length', param: 17 }
      ]
    },
  },

  behaviors: ['timestamp'],

  events: {
    beforeInsert(e) {

      // Automatically set the ethId,
      // overriding a manually set value
      e.target.ethId = helpers.uniqueEthId();
    }
  }
});

export default EthId;
