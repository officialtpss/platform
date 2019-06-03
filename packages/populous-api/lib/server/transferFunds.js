import {ledgerActionsTypes} from 'meteor/populous:constants';
import LedgerBalance from "../database/ledger_balance/model";
import LedgerLog from "../database/ledger_log/model";

const transferFunds =
  ({
     fromUserId,
     fromUserAddress,
     fromCurrency,
     toUserId,
     toUserAddress,
     amount = 0,
     principle = 0,
     interest = 0,
     ledgerType,
     toCurrency = fromCurrency,
     dataId = ''
   }) => {

    const ledgerQuery = {userId: toUserId, currency: ledgerType === ledgerActionsTypes.exchange ? toCurrency : fromCurrency};

    const balance = LedgerBalance.findOne(ledgerQuery) || new LedgerBalance(ledgerQuery);

    if(amount){
      balance.amount += Number.parseFloat(amount.toFixed(5));
    }

    if(principle){
      balance.amount += Number.parseFloat(principle.toFixed(5));
    }

    if(interest){
      balance.interestAmount += Number.parseFloat(interest.toFixed(5));
    }

    if (ledgerType === ledgerActionsTypes.repayment) {
      balance.updateWithdrawableAmount();
    }
    const roundedAmount = Number.parseFloat((amount + principle + interest).toFixed(5));

    new LedgerLog({
      fromUserId: fromUserId,
      fromUserAddress: fromUserAddress,
      fromCurrency: fromCurrency,
      toUserId: toUserId,
      toUserAddress: toUserAddress,
      toCurrency: toCurrency,
      fromValue: roundedAmount,
      toValue: roundedAmount,
      conversionRate: 0,
      spread: 0,
      type: ledgerActionsTypes[ledgerType],
      isPending: false,
      dataId: dataId,
      fromNewBalance: (balance.amount + balance.interestAmount) - roundedAmount,
      toNewBalance: (balance.amount + balance.interestAmount)
    }).save();

    balance.save();
  };

export default transferFunds;
