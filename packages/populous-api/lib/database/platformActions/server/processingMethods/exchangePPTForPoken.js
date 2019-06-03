import {populousEvents, platformActionTypes, platformActionStatuses, ledgerActionsTypes} from 'meteor/populous:constants';

import Wallet from "../../../wallet/model";
import LedgerBalance from "../../../ledger_balance/model";
import LedgerLog from "../../../ledger_log/model";
import DepositLog from "../../../deposit_log/model";
import roundNumber from "../../../helpers/roundNumber";
import PopulousEmitter from "../../../../server/PopulousEmitter";


export default async function exchangePPTForPoken(action) {
  const {userId, PPTGive, GBPpGet} = action.data;
  if(action.status === platformActionStatuses.completed){
    return;
  }

  const wallet = Wallet.findOne({userId});
  const availableBalance = wallet.calculateAvailableBalance();

  if (PPTGive <= 0 || PPTGive > availableBalance) {
    action.error = "Not enough PPT";
    action.status = platformActionStatuses.failed;
    action.save();
    return;
  }

  const conversionRate = roundNumber(1 / (GBPpGet / PPTGive), 8);
  let ledgerBalance = LedgerBalance.findOne({userId, currency: 'GBP'});

  if (!ledgerBalance) {
    ledgerBalance = new LedgerBalance({userId, currency: 'GBP'});
  }

  const ledgerLog = new LedgerLog({
    fromUserId: userId,
    fromUserAddress: wallet.address,
    fromCurrency: 'PPT',
    fromValue: PPTGive,
    fromNewBalance: availableBalance - PPTGive,
    toUserId: userId,
    toUserAddress: this.address,
    toCurrency: 'GBP',
    toValue: GBPpGet,
    toNewBalance: ledgerBalance.amount + GBPpGet,
    conversionRate,
    type: ledgerActionsTypes.deposit,
    isPending: false,
  });

  ledgerLog.save();

  const depositLog = new DepositLog({
    userId,
    logId: ledgerLog._id,
    amount: PPTGive,
    received: GBPpGet,
  });
  depositLog.save();

  ledgerBalance.amount += GBPpGet;

  ledgerLog.dataId = depositLog._id;

  ledgerLog.save();
  ledgerBalance.save();

  wallet.availableBalance -= PPTGive;
  wallet.save();

  action.status = platformActionStatuses.completed;
  action.save();

  PopulousEmitter.emit(populousEvents.pptDeposited,
    {wallet, PPTGive, ledger: {...ledgerBalance}, currencyAmount: GBPpGet});
}
