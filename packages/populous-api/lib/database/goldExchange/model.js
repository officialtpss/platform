import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';

const goldExchangeCollection = new Mongo.Collection('gold_exchange');

const GoldExchange = Class.create({
  name: 'GoldExchange',
  collection: goldExchangeCollection,
  fields: {
    XAUP_TOKENID: {
      type: Number,
      validators: [{type: 'unique'}],
      default: 1,
    },
    GBP_Price: {
      type: Number,
    }
  },

  behaviors: ['timestamp'],

  events:{
    beforeSave({target}){
      target.GBP_Price = parseFloat(target.GBP_Price.toFixed(4));
    }
  },
});

export default GoldExchange;
