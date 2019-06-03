import {populousEvents, platformActionTypes, platformActionStatuses, ledgerActionsTypes} from 'meteor/populous:constants';

import Wallet from "../../../wallet/model";
import LedgerBalance from "../../../ledger_balance/model";
import LedgerLog from "../../../ledger_log/model";
import DepositLog from "../../../deposit_log/model";
import roundNumber from "../../../helpers/roundNumber";
import PopulousEmitter from "../../../../server/PopulousEmitter";


export default async function refundPPT(action) {
  const {depositLogId} = action.data;
  if(action.status === platformActionStatuses.completed){
    return;
  }

  const depositLog = await DepositLog.findOne({_id: depositLogId});

  if(depositLog.returned) {
    action.error = "Deposit already returned";
    action.status = platformActionStatuses.failed;
    action.save();
    return;
  }

  const userWallet = await Wallet.findOne({userId: depositLog.userId});
  const userAvailableBalancePPT = userWallet.availableBalance;
  const relatedLedgerLog = await LedgerLog.findOne({type: ledgerActionsTypes.deposit, dataId: depositLog._id,});
  const populousLedgerObj = {userId: 'Populous', currency: relatedLedgerLog.toCurrency};
  const populousCurrencyLedger = await LedgerBalance.findOne(populousLedgerObj) || new LedgerBalance(populousLedgerObj);
  const userCurrencyLedger = await LedgerBalance.findOne({ userId: depositLog.userId, currency: relatedLedgerLog.toCurrency });
  const ledgerLogToValue = parseFloat(relatedLedgerLog.toValue.toFixed(2));
  const userCurrencyAmount = parseFloat(userCurrencyLedger.amount.toFixed(2));

  const ledgerLogObject = {
    type: ledgerActionsTypes.depositReturn,
    fromUserId: populousCurrencyLedger.userId,
    fromUserAddress: populousCurrencyLedger.userId,
    fromCurrency: relatedLedgerLog.toCurrency,
    fromValue: ledgerLogToValue,
    fromNewBalance: 0,
    toUserId: userCurrencyLedger.userId,
    toUserAddress: userWallet.address,
    toCurrency: relatedLedgerLog.fromCurrency,
    toValue: relatedLedgerLog.fromValue,
    toNewBalance: 0,
    conversionRate: 0,
    spread: 0,
    isPending: false,
    dataId: depositLog._id
  };

  populousCurrencyLedger.amount += ledgerLogToValue;
  userCurrencyLedger.amount -= ledgerLogToValue;

  ledgerLogObject.fromNewBalance = userCurrencyLedger.amount;
  ledgerLogObject.toNewBalance = userAvailableBalancePPT + relatedLedgerLog.fromValue;

  userWallet.availableBalance += depositLog.amount;
  userWallet.save();

  const ledgerLog = new LedgerLog(ledgerLogObject);

  ledgerLog.save();
  populousCurrencyLedger.save();
  userCurrencyLedger.save();

  depositLog.returned = true;
  depositLog.save();

  action.status = platformActionStatuses.completed;
  action.save();

  PopulousEmitter.emit(populousEvents.pptReturned, depositLog.userId, {
    ledger: {...userCurrencyLedger},
    pokensReturnedAmount: ledgerLogToValue,
    wallet: {...userWallet},
    pptReturnedAmount: relatedLedgerLog.fromValue,
  });
}
