import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const exchangeRatesCollection = new Mongo.Collection('exchange_rates');

const ExchangeRate = Class.create({
  name: 'ExchangeRate',
  collection: exchangeRatesCollection,
  fields: {
    from: {
      type: String,
    },

    to: {
      type: String,
    },

    ask: {
      type: Number,
    },

    bid: {
      type: Number,
    },

  },
  behaviors: ['timestamp'],

});

export default ExchangeRate;
