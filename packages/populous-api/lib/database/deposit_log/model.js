import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import {
  ledgerActionsTypes,
} from 'meteor/populous:constants';

import LedgerLog from "../ledger_log/model";
import Wallet from "../wallet/model";


const depositLogsCollection = new Mongo.Collection('deposit_logs');

const DepositLog = Class.create({
  name: 'DepositLog',
  collection: depositLogsCollection,
  fields: {

    userId: {
      type: String,
    },

    logId: {
      type: String,
    },

    amount: {
      type: Number,
    },

    returned: {
      type: Boolean,
      default: false,
    },
  },
  events:{
  },
  behaviors: ['timestamp'],
  helpers:{
    getAllActiveLogs(userId){
      return LedgerLog.find({
        type: ledgerActionsTypes.deposit,
        dataId:{$in: DepositLog.find({userId, returned: false}, {_id: 1}).fetch().map(depositLog => depositLog._id)}
      }).fetch();
    },
  },
});

export default DepositLog;
