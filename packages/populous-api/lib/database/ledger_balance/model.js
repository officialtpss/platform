import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import BlockchainAction from "../blockchainAction/model";
import User from "../accounts/model";
import Request from "../requests/model";
import LedgerLog from "../ledger_log/model";
import {
  blockchainActionTypes,
  blockchainActionStatuses,
  requestTypes,
  ledgerActionsTypes
} from 'meteor/populous:constants';


const ledgerBalancesCollection = new Mongo.Collection('ledger_balances');

const LedgerBalance = Class.create({
  name: 'LedgerBalance',
  collection: ledgerBalancesCollection,
  fields: {
    userId: {
      type: String,
    },

    amount: {
      type: Number,
      default: 0,
    },

    interestAmount: {
      type: Number,
      default: 0,
    },

    externalWalletAmount: {
      type: Number,
      default: 0,
    },

    withdrawableAmount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
    }

  },
  behaviors: ['timestamp'],
  events:{
    beforeSave({target}){
      target.amount = parseFloat(target.amount.toFixed(2));
      target.interestAmount = parseFloat(target.interestAmount.toFixed(2));
    }
  },
  helpers:{
    getWithdrawableAmount(user = User.findOne(this.userId)) {
      if (!user) {
        return 0;
      }

      let withdrawable = this.interestAmount;

      if (user.isInvestor()) {
        withdrawable += this.externalWalletAmount;

        // subtract previous pending poken withdraw BA
        withdrawable -= BlockchainAction
          .find({
            userId: user._id,
            type: blockchainActionTypes.withdraw,
            title: this.currency,
          })
          .fetch()
          .reduce((a, b) => {
            if (typeof b.amount === 'object') {
              let result = a;

              if(b.status === blockchainActionStatuses.pending){
                result += Number(b.amount.externalInterest);
              }

              return (result + Number(b.amount.internalInterest));
            }

            return (a + Number(b.amount));
          }, 0);
      } else {
        withdrawable += this.amount;

        const requests = Request
          .find({
            userId: user._id,
            type: requestTypes.withdraw,
            isComplete: false,
          }).fetch();

        // subtract previous pending poken withdraw request
        withdrawable -= LedgerLog.find({
          fromUserId: user._id,
          type: ledgerActionsTypes.withdraw,
          fromCurrency: this.currency,
          dataId: {'$in': requests.map( request => request._id )},
        })
          .fetch()
          .reduce((previousValue, logDoc) => (previousValue + Number(logDoc.toValue)), 0);
      }

      return withdrawable;
    },

    generateWithdrawObject(withdrawAmount) {
      let remainsAmount = withdrawAmount;
      const returnObject = {
        total: withdrawAmount,
        externalInterest: 0,
        internalInterest: 0,
      };

      let availableExternalAmount = this.externalWalletAmount;

      BlockchainAction
        .find({
          userId: this.userId,
          type: blockchainActionTypes.withdraw,
          status: blockchainActionStatuses.pending,
          title: this.currency,
        })
        .forEach(({amount}) => {
          if(typeof amount === 'object'){
            availableExternalAmount -= amount.externalInterest;
          }
        });


      if (availableExternalAmount >= remainsAmount) {
        returnObject.externalInterest = remainsAmount;
        return returnObject;
      }

      returnObject.externalInterest = availableExternalAmount;
      remainsAmount -= availableExternalAmount;
      returnObject.internalInterest = remainsAmount;

      return returnObject;
    },
  },
});

export default LedgerBalance;
