/* global process */
import {DDP} from 'meteor/ddp-client';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {
  currencies,
  invoiceStatuses,
  invoiceSellerFee,
  adminFee,
  invoiceDocumentTypes,
} from 'meteor/populous:constants';

import {User, Debtor} from 'meteor/populous:api';
import MongoCounters from 'mongodb-counter';

import '../validators';
import Bid from "../bid/model";
import Currency from "../currencies/model";
import roundNumber from "../helpers/roundNumber";

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/meteor';

// Setup the counters object used for auto-incrementing
const counters = MongoCounters.createCounters({mongoUrl});

const invoices = new Mongo.Collection('invoices');

const Invoice = Class.create({
  name: 'Invoice',
  collection: invoices,

  fields: {
    // This field contains borrower or provider id
    borrowerId: {
      type: String,
      optional: true,
      immutable: true
    },
    borrowerFullName: {
      type: String,
      optional: true,
      resolve(invoice) {
        const user = User.findOne({_id: invoice.borrowerId});
        return user ? user.fullName() : '';
      }
    },
    borrowerCompanyName: {
      type: String,
      optional: true,
      resolve(invoice) {
        const user = User.findOne({_id: invoice.borrowerId});
        return user ? user.companyName : '';
      }
    },
    amount: {
      type: Number,
      immutable: false,
      validators: [
        {type: 'required'},
        {type: 'gt', param: 0}
      ]
    },
    salePrice: {
      type: Number,
      immutable: false,
      validators: [
        {type: 'required'},
        {type: 'gt', param: 0},
        {type: 'ltAmount'}
      ]
    },
    soldPrice: {
      type: Number,
      optional: true,
    },
    currency: {
      type: String,
      immutable: false,
      validators: [
        {type: 'minLength', param: 1},
      ]
    },
    dueDate: {
      type: Date,
      immutable: false,
      validators: [
        {type: 'required'},
        {type: 'futureDate'}
      ]
    },
    invoiceNumber: {
      type: String,
      validators: [
        {type: 'minLength', param: 1},
        {type: 'required'},
      ]
    },
    debtorId: {
      type: String,
    },
    sellerId: {
      type: String,
      optional: true,
    },
    status: {
      type: String,
      default: invoiceStatuses.auctionPending,
      optional: true,
      validators: [
        {
          type: 'choice',
          param: Object.values(invoiceStatuses)
        }
      ]
    },

    invoiceDeclinedReason: {
      type: Object,
      optional: true
    },

    zscore: {
      type: Number,
      default: 1,
    },

    //-- Related files --\\

    documents: {
      type: Object,
      validators: [
        {type: 'invoiceDocuments'},
      ]
    },
    signedContractIPFSHash: {
      type: String,
      optional: true,
      validators: [
        {type: 'length', param: 46}
      ]
    },

    // The IV is always a hex of 16 characters
    signedContractIV: {
      type: String,
      optional: true,
      validators: [
        {type: 'length', param: 32}
      ]
    },

    repayedPrice: {
      type: Number,
      default: 0,
    },

    penaltyPrice: {
      type: Number,
      default: 0,
    },
    // provider fee
    providerFeeAmount: {
      type: Number,
      optional: true,
    },

    isDefaulted: {
      type: Boolean,
      default: false,
    },

    referenceInfo: {
      type: String,
      optional: true,
    },

    returnPercentage:{
      type: Number,
      optional: true,
    }
  },

  behaviors: ['timestamp'],

  helpers: {
    borrower() {
      return User.findOne({_id: this.borrowerId});
    },
    getCurrency() {
      return Currency.findOne({symbol: this.currency});
    },
    getDebtor() {
      return Debtor.findOne(this.debtorId);
    },
    seller(){
      if(!this.sellerId){
        return undefined;
      }

      return Debtor.findOne(this.sellerId);
    },
    getParticipants(outerBids) {

      let innerBids = outerBids;

      if (!innerBids) {
        innerBids = Bid.find({invoiceId: this._id});
      }

      const userIds = [];

      innerBids.forEach(bid => {
        if (bid.names.isGroup) {
          userIds.push(...bid.bidders.map((bidder) => bidder.userId));
        } else {
          userIds.push(bid.userId);
        }
      });

      const arrayToObject = (arr, keyField) =>
        Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));

      return arrayToObject(User.find({_id: {$in: userIds}}).fetch(), '_id');
    },
    getSalePriceLimits(amount, fee = 0, isProvider) {

      return {
        min: roundNumber(amount * 0.5),
        max: roundNumber(isProvider
          ? (amount * (1 - invoiceSellerFee) - fee)
          : (amount * (1 - invoiceSellerFee - fee - adminFee))),
      }
    },

    isProvider(){
      return this.providerFeeAmount !== undefined && this.providerFeeAmount !== 0;
    },

    isOwner(user){
      if(!user){
        return false;
      }

      return user._id === this.borrowerId;
    }
  },

  events: {
    beforeInsert(e) {
      const invoice = e.currentTarget;
    }
  },
});

// if (Meteor.isServer) {
//   Invoice.extend();
// }

export default Invoice;
