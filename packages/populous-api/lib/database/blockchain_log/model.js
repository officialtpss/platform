import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import User from "../accounts/model";


const blockchainCollection = new Mongo.Collection('blockchain_logs');

const BlockchainLog = Class.create({
  name: 'BlockchainLog',
  collection: blockchainCollection,
  fields: {
    userId: {
      type: String,
    },
    data: {
      type: Object,
    },

  },
  behaviors: ['timestamp'],
  helpers: {
    getUser(){
      return User.findOne(this.userId);
    },
  },
});

export default BlockchainLog;
