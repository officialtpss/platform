import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import {
  ledgerActionsTypes,
} from 'meteor/populous:constants';
import User from "../accounts/model";
import DepositLog from "../deposit_log/model";
import Crowdsale from "../crowdsale/model";
import { platformFee } from "../config";

const ledgerLogsCollection = new Mongo.Collection('ledger_logs');

const LedgerLog = Class.create({
  name: 'LedgerLog',
  collection: ledgerLogsCollection,
  fields: {
    fromUserId: {
      type: String,
    },

    fromUserAddress: {
      type: String,
    },

    fromCurrency: {
      type: String,
    },

    toUserId: {
      type: String,
    },

    toUserAddress: {
      type: String,
      optional: true
    },

    toCurrency: {
      type: String,
    },

    fromValue: {
      type: Number,
    },

    toValue: {
      type: Number,
    },

    conversionRate: {
      type: Number,
    },

    spread: {
      type: Number,
      default: platformFee * 100,
    },

    type: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(ledgerActionsTypes),
        },
      ],
    },

    inBlock: {
      type: String,
      optional: true,
    },

    isPending: {
      type: Boolean,
      default: false,
    },

    dataId: {
      type: String,
      optional: true,
    },

    toNewBalance: {
      type: Number,
      optional: true,
    },

    fromNewBalance: {
      type: Number,
      optional: true,
    },

  },
  behaviors: ['timestamp'],
  helpers: {
    fromUser() {
      if (this.fromUserId === 'Populous') {
        return {}
      }
      return User.findOne(this.fromUserId);
    },
    toUser() {
      return User.findOne(this.toUserId);
    },
    deposit() {
      return DepositLog.findOne({ logId: this._id });
    },
    crowdsale() {
      return this.type===ledgerActionsTypes.crowdsale ?  Crowdsale.findOne(this.dataId) : null;
    },
  },
});

export default LedgerLog;
