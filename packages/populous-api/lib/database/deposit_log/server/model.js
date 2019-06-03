import { Meteor } from 'meteor/meteor';
import {
  ledgerActionsTypes,
  requestTypes,
  populousEvents,
  platformActionTypes,
  platformActionStatuses
} from 'meteor/populous:constants';
import { Config, configKeys } from 'meteor/populous:config';

import DepositLog from "../model";
import checkAuth from "../../helpers/checkAuth";
import LedgerBalance from "../../ledger_balance/model";
import LedgerLog from "../../ledger_log/model";
import Wallet from "../../wallet/model";
import PopulousEmitter from "../../../server/PopulousEmitter";
import PlatformActions from "../../platformActions/model";


DepositLog.extend({
  meteorMethods: {
    async withdraw() {
      // PPT refund
      const userId = checkAuth();
      const notEnoughBalanceException = new Meteor.Error(400, 'You cannot release these PPT at this time, select another batch');

      const relatedLedgerLog = await LedgerLog.findOne({
        type: ledgerActionsTypes.deposit,
        dataId: this._id,
      });

      const userCurrencyLedger = await LedgerBalance.findOne({ userId, currency: relatedLedgerLog.toCurrency });
      const ledgerLogToValue = parseFloat(relatedLedgerLog.toValue.toFixed(2));
      const userCurrencyAmount = parseFloat(userCurrencyLedger.amount.toFixed(2));

      if (ledgerLogToValue > userCurrencyAmount) {
        throw notEnoughBalanceException;
      }

      const userWallet = Wallet.findOne({ userId });

      if (!userWallet) {
        throw new Meteor.Error(500, 'Oops! Something goes wrong');
      }

      PlatformActions.insert({
        type: platformActionTypes.GBPptoPPT,
        status: platformActionStatuses.new,
        data: {
          depositLogId: this._id,
        }
      });

      // The rest of the logic is ported to "platformActions/server/processingMethods/refundPPT.js"
    },
  }
});
