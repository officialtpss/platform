import {Meteor} from 'meteor/meteor';
import ethConnect from 'meteor/populous:eth-connect';
import {
  blockchainActionTypes,
  ledgerActionsTypes,
} from 'meteor/populous:constants';

import Currency from '../model';
import LedgerBalance from '../../ledger_balance/model';
import {User} from "../../index";
import LedgerLog from "../../ledger_log/model";
import ExchangeRate from "../../exchange_rate/model";
import checkAuth from "../../helpers/checkAuth";
import BlockchainAction from "../../blockchainAction/model";
import {getBlockchainVersion} from "../../helpers/server/blockcahinVersionHelpers";
import roundNumber from "../../helpers/roundNumber";


const {
  config: {
    network: {ropsten},
  },
  contracts: {
    dataManager: {getCurrency}
    },
  constants: {statusMap: {fail}, pptUser}
} = ethConnect;

const FEE = 1.0015;

Currency.extend({
  meteorMethods: {
    async create(symbol, title) {
      checkAuth();
      const user = await User.findOne(Meteor.userId());
      const restrictedValues = ["PPT", "PPTp"];

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (restrictedValues.indexOf(symbol) !== -1) {
        throw new Error('Invalid currency symbol');
      }

      if (restrictedValues.indexOf(title) !== -1) {
        throw new Error('Invalid currency title');
      }

      this.symbol = symbol;
      this.title = title;
      await this.save();

      const addressInBlockchain = await getCurrency(this.symbol);

      if(addressInBlockchain){
        this.ethAddress = addressInBlockchain;
        this.isPending = false;
        this.version = getBlockchainVersion();
        await this.save();
        return
      }

      const blockchainAction = new BlockchainAction({
        userId: user._id,
        type: blockchainActionTypes.createCurrency,
        title: symbol,
      });

      await blockchainAction.save();
    },

    async mint(currencySymbol, amount) {
      checkAuth();
      const currency = await Currency.findOne({symbol: currencySymbol, isPending: false});

      currency.checkIsActive();

      const amountInt = roundNumber(amount);
      const ledgerBalanceIdObject = {
        userId: pptUser,
        currency: currencySymbol,
      };

      let ledgerBalance = await LedgerBalance.findOne(ledgerBalanceIdObject);

      if (!ledgerBalance) {
        ledgerBalance = new LedgerBalance({
          ...ledgerBalanceIdObject,
          amount: 0,
        });
      }

      ledgerBalance.amount += amountInt;

      const ledgerLog = new LedgerLog({
        fromUserId: pptUser,
        fromUserAddress: "blank",
        fromCurrency: currencySymbol,
        toUserId: pptUser,
        toUserAddress: "blank",
        toCurrency: currencySymbol,
        fromValue: amountInt,
        toValue: amountInt,
        conversionRate: 0,
        spread: 0,
        type: ledgerActionsTypes.mint,
        isPending: false,
        dataId: "",
        fromNewBalance: ledgerBalance.amount,
        toNewBalance: ledgerBalance.amount,
      });

      await ledgerLog.save();
      await ledgerBalance.save();
    },

    async destroy(currency, amount) {
      checkAuth();
      const currencyDoc = await Currency.findOne({symbol: currency, isPending: false});

      currencyDoc.checkIsActive();

      const balanceAdmins = await LedgerBalance.findOne({
        userId: pptUser,
        currency: currency,
      });

      if (!balanceAdmins || balanceAdmins.amount < amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      balanceAdmins.amount -= amount;

      const log = new LedgerLog({
        fromUserId: pptUser,
        toUserId: pptUser,
        fromUserAddress: ropsten.ethAddress,
        toUserAddress: ropsten.ethAddress,
        dataId: "",
        fromCurrency: currency,
        toCurrency: currency,
        fromValue: Number(amount),
        toValue: 0,
        conversionRate: 0,
        spread: 0,
        isPending: false,
        type: ledgerActionsTypes.destroy,
        fromNewBalance: balanceAdmins.amount,
        toNewBalance: balanceAdmins.amount,
      });

      await log.save();
      await balanceAdmins.save();
    },

    async transfer(currency, amount, fromAccount, toAccount) {
      checkAuth();

      const currencyBySymbol = Currency.findOne({symbol: currency});

      currencyBySymbol.checkIsActive();

      // update ledger_balance
      let fromUserId = '';
      if (fromAccount === pptUser) {
        fromUserId = pptUser;
      } else {
        const fromUser = await User.findOne({'emails': {$elemMatch: {'address': fromAccount}}});

        if (!fromUser) {
          throw new Meteor.Error('Source user email is not valid');
        }

        fromUserId = fromUser._id;
      }

      const toUser = User.findOne({'emails': {$elemMatch: {'address': toAccount}}});

      if (!toUser) {
        throw new Meteor.Error('Destination user email is not valid');
      }

      const toUserId = toUser._id;

      let fromBalance = LedgerBalance.findOne({
        userId: fromUserId,
        currency: currency,
      });


      if (!fromBalance) {
        fromBalance = new LedgerBalance({
          userId: fromUserId,
          currency: currency,
          amount: 0
        });
      }

      let toBalance = LedgerBalance.findOne({
        userId: toUserId,
        currency: currency,
      });

      if (!toBalance) {
        toBalance = new LedgerBalance({
          userId: toUserId,
          currency: currency,
          amount: 0
        });
      }

      // Check that a current balance is sufficient to make a transaction
      if (fromBalance.amount < parseFloat(amount)) {
        throw new Meteor.Error(500, 'Insufficient amount');
      }

      const fromValue = fromBalance.amount;
      fromBalance.amount = fromBalance.amount - parseFloat(amount);
      toBalance.amount = toBalance.amount + parseFloat(amount);

      // insert into ledger_history
      const log = new LedgerLog({
        fromUserId: fromUserId,
        toUserId: toUserId,
        fromUserAddress: ropsten.ethAddress,
        toUserAddress: ropsten.ethAddress,
        dataId: "",
        fromCurrency: currency,
        toCurrency: currency,
        fromValue: fromValue,
        toValue: Number(amount),
        conversionRate: 0,
        spread: 0,
        isPending: false,
        type: ledgerActionsTypes.transfer,
        fromNewBalance: fromBalance.amount,
        toNewBalance: toBalance.amount,
      });


      log.save();
      fromBalance.save();
      toBalance.save();
    },

    async getLedgerBalance() {
      const userId = Meteor.userId();
      return await (LedgerBalance.findOne({userId, currency: this.symbol}) || {}).amount || 0;
    },

    async calculateExchangeAmount(toCurrency, fromAmountStr, fromCurrency = this.symbol) {
      if (toCurrency === fromCurrency) {
        return roundNumber(fromAmountStr);
      }

      const fromAmount = Number.parseFloat(fromAmountStr),
        rate = ExchangeRate.findOne({from: fromCurrency, to: toCurrency});

      if (!(rate && rate.ask)) {
        throw new Meteor.Error(400, 'Exchange rate for pair ' + this.symbol + '->' + toCurrency + 'hasn\'t found');
      }

      return roundNumber(fromAmount * (rate.ask/ FEE));
    },
    enableCurrency() {
      this.enabled = !this.enabled;
      this.save();
    },
    // async upgradeCurrencies() {
    //   try {
    //     const blockchainVersion = await getBlockchainVersion();

    //     const currencies  = await Currency
    //       .find({
    //         ...(await getOutdatedBCVersionQuery()),
    //       }).fetch();

    //     for (let i = 0; i < currencies.length; i++) {
    //       const currency = currencies[i];

    //       if (currency.ethAddress) {
    //         const addressInBlockchain = await getCurrency(currency.symbol);

    //         if (currency.ethAddress === addressInBlockchain) {
    //           currency.version = blockchainVersion;
    //           await currency.save();
    //           continue;
    //         }
    //       }

    //       if (currency.version === undefined) {
    //         currency.version = 0;
    //         await currency.save();
    //       }

    //       const blockchainActionDoc = {
    //         title: currency.symbol,
    //         version: blockchainVersion,
    //         type: currency.ethAddress ? blockchainActionTypes.upgradeCurrency : blockchainActionTypes.createCurrency,
    //       };

    //       if (await BlockchainAction.findOne(blockchainActionDoc)) {
    //         continue;
    //       }

    //       await (new BlockchainAction(blockchainActionDoc)).save();
    //     }
    //   } catch (error) {
    //     console.log('Currency upgrade error: ', error);
    //   }
    // }
  },
  events: {
    beforeSave(e) {
      const doc = e.target;
      if (Currency.isNew(doc) && !doc.version) {
        doc.version = getBlockchainVersion();
      }
    },
  },
});

Meteor.methods({
  'currencies.delete'(currency) {
    const meteor = DDP._CurrentInvocation.get();
    if (!meteor.userId) {
      throw new Error('No user logged in');
    }

    let amount = 0;
    const balanceAdmins = LedgerBalance.find({currency: currency}).fetch();
    balanceAdmins.forEach((balance) => {
      amount += balance.amount;
    });

    if (amount > 0) {
      throw new Meteor.Error(400, 'Balance minted amount should be 0');
    }
    else if (balanceAdmins.length && amount == 0) {
      LedgerBalance.remove({currency: currency});
    }

    Currency.findOne({symbol: currency}).remove();
  },
});
