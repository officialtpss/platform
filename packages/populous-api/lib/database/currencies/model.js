/* global process */
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {User} from 'meteor/populous:api';

import '../validators';


const currencies = new Mongo.Collection('currencies');

const Currency = Class.create({
    name: 'Currency',
    collection: currencies,

    fields: {
      symbol: {
          type: String,
          immutable: true,
          validators: [{ type: 'unique', },],
      },
      title: {
          type: String,
      },
      decimalUnits:{
        type: Number,
        default: 8,
      },
      ethAddress: {
        type: String,
        optional: true,
      },
      isPending:{
        type: Boolean,
        default: true,
      },
      enabled: {
        type: Boolean,
        default: true,
      },
      version: {
        type: Number,
        optional: true,
      },
    },

    behaviors: ['timestamp'],
  helpers: {
    isActive() {
      return this.enabled && !this.isPending;
    },
    checkIsActive(){
      if(!this.isActive()){
        throw new Meteor.Error(403, 'Currency is pending or disabled');
      }
    },
    getActiveCurrencies(fetch = true){
      const activeCurrenciesResource =  Currency.find({
        enabled: true,
        isPending: false,
      });

      if(fetch){
        return activeCurrenciesResource.fetch();
      }

      return activeCurrenciesResource;
    }
  },
});


export default Currency;
