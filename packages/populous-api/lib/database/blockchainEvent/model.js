import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';

const blockchainEventsCollection = new Mongo.Collection('blockchain_events');

const BlockchainEvent = Class.create({
  name: 'BlockchainEvent',
  collection: blockchainEventsCollection,
  fields:{
    source: {
      type: String,
    },
    type: {
      type: String,
    },
    data: {
      type: Object,
    },
    newBalance: {
      type: Number,
      optional: true,
    },
  },
  behaviors: ['timestamp'],
});

export default BlockchainEvent;