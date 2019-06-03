import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';


const walletsCollection = new Mongo.Collection('wallets');

const BalanceXaupField = Class.create({
  name: 'BalanceXaupField',
  /* No collection attribute */
  fields: {
    xaup_id: {
      type: Number,
      default: 1
    },
    amount: {
      type: Number,
      default: 0
    }
  }
});

const Wallet = Class.create({
  name: 'Wallet',
  collection: walletsCollection,
  fields: {
    userId: {
      type: String,
    },

    isPending: {
      type: Boolean,
      default: true,
    },

    address: {
      type: String,
      optional: true,
    },

    old: {
      type: [String],
      default: function() {
        return [];
      }
    },

    balance: {
      type: Number,
      default: 0,
    },

    balanceETH: {
      type: Number,
      default: 0,
    },

    balancePXT: {
      type: Number,
      default: 0,
    },

    balanceXAU: {
      type: [BalanceXaupField],
      default: function() {
        return [];
      }
    },

    balanceTUSD: {
      type: Number,
      default: 0,
    },

    balanceUSDC: {
      type: Number,
      default: 0,
    },

    availableBalance: {
      type: Number,
      default: 0,
    },
    version: {
      type: Number,
      optional: true,
    },
  },
  helpers:{
    isActive(){
      return (this.address && !this.isPending);
    },
    checkIsActive(){
      if (!this.isActive()) {
        throw new Meteor.Error(400, 'Unfortunately your wallet is still inactive');
      }
    },
  },
  events:{
    beforeSave({target}){
      target.availableBalance = parseFloat(target.availableBalance.toFixed(4));
    }
  },
  behaviors: ['timestamp'],

});

export default Wallet;
