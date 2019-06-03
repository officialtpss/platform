import { Meteor } from 'meteor/meteor';
import ethConnect from 'meteor/populous:eth-connect';
import {
  ledgerActionsTypes,
  requestTypes,
  blockchainActionTypes,
  currencySymbols,
  blockchainActionStatuses,
  populousEvents,
  platformActionTypes,
  platformActionStatuses,
  tokenPrecision,
  usdConversionFee
} from 'meteor/populous:constants';

import Wallet from '../model';
import connectInstance from "../../../server/connectInstance";
import DepositLog from "../../deposit_log/model";
import checkAuth from "../../helpers/checkAuth";
import ExchangeRate from "../../exchange_rate/model";
import LedgerLog from "../../ledger_log/model";
import LedgerBalance from "../../ledger_balance/model";
import ExternalAddress from "../../external_address/model";
import User from "../../accounts/model";
import Currency from "../../currencies/model";
import Request from "../../requests/model";
import PlatformActions from "../../platformActions/model";
import BlockchainAction from "../../blockchainAction/model";
import GoldExchange from "../../goldExchange/model";
import { Config, configKeys } from 'meteor/populous:config';
import {
  getWalletVersion,
  validateWallets
} from "../../helpers/server/blockcahinVersionHelpers";
import roundNumber from "../../helpers/roundNumber";
import PopulousEmitter from "../../../server/PopulousEmitter";


function blockWithdraw(user) {
  if (user.isInvestor()) {
    throw new Meteor.Error(403, 'Withdraw function temporary offline')
  }
}

Wallet.extend({
  meteorMethods: {
    async getBalance(shouldSave = true) {
      this.checkIsActive();

      const {
        config: {
          network: { ropsten },
          contract: { populousToken, ERC1155 },
        },
        contracts: { populousToken: { balanceOf }, currencyToken: { balanceOfForEth }, ERC1155: { balanceOf: balanceOfXAUp },
          PXTToken: { balanceOfForPXT }, TUSDToken: { balanceOfForTUSD }, USDCToken: { balanceOfForUSDC }, },
      } = ethConnect;

      const currentBalanceXAUp = [];

      for (let series = 1; series <= process.env.XAUP_TOKENID; series++) {
        let address = this.address;
        currentBalanceXAUp.push({ XAUP_TOKENID: series, balance: await balanceOfXAUp(connectInstance, ERC1155, { XAUP_TOKENID: series, address }) })
      }

      const currentBalancePPT = await balanceOf(connectInstance, populousToken, ropsten.ethAddress, this.address);
      //const currentBalanceETH = await balanceOfForEth('ethereum', this.address);
      const currentBalancePXT = await balanceOfForPXT(this.address);
      const currentBalanceTUSD = (await balanceOfForTUSD(this.address)) / tokenPrecision.TUSDToken;
      const currentBalanceUSDC = (await balanceOfForUSDC(this.address)) / tokenPrecision.USDCToken;

      if (this.balance !== currentBalancePPT) {
        let eventName;

        if (this.balance < currentBalancePPT) {
          eventName = populousEvents.pptBalanceIncreased;
        } else {
          eventName = populousEvents.pptBalanceDecreased;
        }

        PopulousEmitter.emit(eventName, this.userId, { ...this }, currentBalancePPT);
      }

      if (shouldSave) {
        this.balance = currentBalancePPT;
        this.balancePXT = Number(currentBalancePXT);
        this.balanceTUSD = Number(currentBalanceTUSD);
        this.balanceUSDC = Number(currentBalanceUSDC);
        let XAUseries = new Map();
        // aa = this.balanceXAU;
        this.balanceXAU.map(item => {
          XAUseries.set(item.xaup_id, Number(item.amount))
        });
        currentBalanceXAUp.map(item => {
          XAUseries.set(item.XAUP_TOKENID, Number(item.balance))
        })

        //reset balance
        this.balanceXAU = [];
        for (const key of XAUseries.keys()) {
          this.balanceXAU.push({ xaup_id: key, amount: XAUseries.get(key) });
        }

        this.save();
      }

      return currentBalancePPT;
    },

    async getBalanceOfCurrencies() {
      this.checkIsActive();
      const userId = this.userId;
      const currencies = Currency.find({ isPending: false }).fetch();
      let currenciesBalance = [];

      if (currencies) {
        currenciesBalance = currencies.map(async (currency) => {
          const {
            config: {
              network: { ropsten },
              contract,
            },
            contracts: { currencyToken: { balanceOf } },
          } = ethConnect;

          const currencyTokenContract = contract._build('CurrencyToken', currency.ethAddress);
          let balance;

          try {
            balance = await balanceOf(connectInstance, currencyTokenContract, ropsten.ethAddress, this.address);
          } catch (error) {
            return;
          }

          let ledgerBalance = await LedgerBalance.findOne({ userId, currency: currency.symbol }) ||
            await new LedgerBalance({
              userId,
              currency: currency.symbol,
            });

          ledgerBalance.externalWalletAmount = balance;
          await ledgerBalance.save();
        });
      }
    },

    async getBalanceOfAddress(address) {
      checkAuth();
      const {
        config: {
          contract,
          network: { ropsten },
          contract: { populousToken },
        },
        contracts,
      } = ethConnect;

      const targetCurrencies = ['GBP', 'USD'];
      const currencies = Currency.find({
        isPending: false,
        symbol: { $in: targetCurrencies }
      }).fetch();

      let currenciesBalance = {};
      if (currencies) {
        currencies.forEach(async (currency) => {
          const currencyTokenContract = contract._build('CurrencyToken', currency.ethAddress);
          currenciesBalance[currency.symbol] = await contracts.currencyToken
            .balanceOf(connectInstance, currencyTokenContract, ropsten.ethAddress, address);
        });
      }

      currenciesBalance.PPT = await contracts.populousToken.balanceOf(connectInstance, populousToken, ropsten.ethAddress, address);

      return currenciesBalance;
    },

    async calculateAvailableBalance(balance, shouldSave = true) {

      this.checkIsActive();
      let availableBalance = balance;

      if (!availableBalance) {
        availableBalance = this.balance;
      }

      availableBalance -= await this.getInCollateral();

      availableBalance -= await BlockchainAction
        .find({
          userId: this.userId,
          type: blockchainActionTypes.withdraw,
          title: 'PPT',
          status: blockchainActionStatuses.pending,
        })
        .fetch()
        .reduce(
          (previousValue, { amount, feeAmount }) => (
            previousValue + Number(amount) + Number(feeAmount)
          )
          , 0);

      if (shouldSave) {
        this.availableBalance = availableBalance;
        await this.save()
      }

      return availableBalance;
    },

    async getInCollateral() {
      const depositLogs = await DepositLog.find({
        userId: this.userId,
        returned: false,
      });
      let inCollateralAmount = 0;
      depositLogs.forEach(depositLog => {
        inCollateralAmount += depositLog.amount;
      });

      return inCollateralAmount;
    },

    async depositToCurrency(currencySymbol, pptAmountInput) {
      this.checkIsActive();

      const userId = checkAuth();
      const pptAmount = roundNumber(pptAmountInput, 8);
      if (!currencySymbol) {
        throw new Meteor.Error(403, 'Currency is required');
      }

      if (currencySymbol !== 'GBP') {
        throw new Meteor.Error(403, 'Only available for GBPp');
      }

      const availableBalance = this.calculateAvailableBalance();

      if (typeof pptAmount !== 'number' || pptAmount <= 0 || pptAmount > availableBalance) {
        throw new Meteor.Error(403, 'Deposit amount should not be more then available balance and valid positive number');
      }

      const resultAmount = this.convertPptToCurrency(pptAmount, currencySymbol);

      PlatformActions.insert({
        type: platformActionTypes.PPTtoGBPp,
        status: platformActionStatuses.new,
        data: {
          userId: userId,
          PPTGive: pptAmount,
          GBPpGet: resultAmount,
        }
      });

      // The rest of the logic is ported to "platformActions/server/processingMethods/exchangePPTForPoken.js"
    },

    async depositToXAUP(xaupAmountInput, currency) {
      this.checkIsActive();
      const userId = checkAuth();
      const xaupAmount = roundNumber(xaupAmountInput, 8);
      const rate = ExchangeRate.findOne({ from: 'XAU', to: 'USD' })
      // * 1.005 - increase of 0.5%
      // * 0.91 - subtract of 9%
      const rateToCurrency = (roundNumber(rate.bid * 1.005 * 0.91, 6) * tokenPrecision[currency]);
      const requiredAmount = rateToCurrency * xaupAmount;
      const {
        config: {
          network: { ropsten },
          contract: { populous },
          contract
        },
        contracts: { populous: { exchangeXAUP }, TUSDToken: { balanceOfForTUSD }, USDCToken: { balanceOfForUSDC } },
      } = ethConnect;

      let userBalance = 0;
      if (currency === 'USDCToken') {
        userBalance = await balanceOfForUSDC(this.address);
      } else {
        userBalance = await balanceOfForTUSD(this.address);
      }

      if (userBalance < requiredAmount) {
        throw new Meteor.Error(400, 'Typed amount above available amount');
      }

      const blockchainObject = {
        userId,
        type: blockchainActionTypes.exchangeXaup,
        amount: {
          xau: xaupAmount,
          [currency]: requiredAmount
        }
      };

      await BlockchainAction.insert(blockchainObject);

      const xaupTokenId = Number(process.env.XAUP_TOKENID) || 1;

      if (!GoldExchange.findOne({ XAUP_TOKENID: xaupTokenId })) {
        const rateUSD = ExchangeRate.findOne({ from: 'USD', to: 'GBP' })
        const usdAmount = rateToCurrency / tokenPrecision[currency];

        await GoldExchange.insert({
          XAUP_TOKENID: xaupTokenId,
          GBP_Price: usdAmount * rateUSD.bid
        });
      }
    },


    async withdrawPPT(amountInput, toAddressId, dataId) {
      checkAuth();
      this.checkIsActive();

      const userId = Meteor.userId();
      const currentUser = User.findOne(userId);

      // If current user is admin and provide dataId (deposit_log id) then it is strike out withdraw
      const isAdminTrigger = dataId && currentUser.isAdmin();

      const amount = Number.parseFloat(Number.parseFloat(amountInput).toFixed(8));

      if (!currentUser.canWithdrawPPT()) {
        throw new Meteor.Error(403, 'You can not withdraw until the previous one is not completed');
      }

      /**
       * available balance check requires only for common user
       */
      const operationFeeAmount = this.getOperationFee();
      const currentBalance = this.calculateAvailableBalance(undefined, false);

      if (!isAdminTrigger && (amount + operationFeeAmount) > currentBalance) {
        throw new Meteor.Error(400, 'Typed amount above available amount');
      }

      const externalAddress = ExternalAddress.findOne({
        _id: toAddressId,
        userId: !isAdminTrigger ? userId : undefined, // Admin can withdraw PPT to any address
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const blockchainActionId = (new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        title: 'PPT',
        amount,
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        dataId
      })).save();

      this.calculateAvailableBalance();
      const totalSubtract = (amount + operationFeeAmount);

      await LedgerLog.insert({
        fromUserId: userId,
        fromUserAddress: this.address,
        fromCurrency: 'PPT',
        fromValue: totalSubtract,
        fromNewBalance: currentBalance - totalSubtract,
        toUserId: userId,
        toUserAddress: externalAddress.address,
        toCurrency: 'PPT',
        toValue: totalSubtract,
        toNewBalance: currentBalance - totalSubtract,
        conversionRate: 0,
        type: ledgerActionsTypes.withdrawPPT,
        isPending: true,
        dataId: blockchainActionId,
      });

      PopulousEmitter.emit(populousEvents.pptWithdraw, userId, { ...this }, amount, { ...externalAddress });
    },

    async withdrawPokens(currencySymbol, amountStr, externalAddressId, withdrawCurrency) {
      const userId = checkAuth();
      this.checkIsActive();
      await this.getBalanceOfCurrencies();

      const user = User.findOne(userId);

      const ledgerBalance = await LedgerBalance.findOne({
        userId: user._id,
        currency: currencySymbol,
      });


      const amount = roundNumber(amountStr);
      if (!ledgerBalance || ledgerBalance.getWithdrawableAmount(user) < amount) {
        throw new Meteor.Error(400, 'You do not have enough of pokens for this wallet');
      }

      const operationFeeAmount = this.checkOperationPossibility();

      const externalAddress = ExternalAddress.findOne({
        _id: externalAddressId,
        userId,
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const extraInfo = {}
      if (currencySymbol === 'GBP' && withdrawCurrency === 'USD') {
        let exchangeRate = ExchangeRate.findOne({from: 'GBP', to: 'USD'})
        if (exchangeRate) {
          extraInfo.data = {
            type: 'exchange',
            currency: 'USD',
            amount: roundNumber(amount * exchangeRate.ask * (1 - usdConversionFee))
          }
        }
      }

      const blockchainAction = new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        title: currencySymbol,
        amount: ledgerBalance.generateWithdrawObject(amount),
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        ...extraInfo
      });

      await blockchainAction.save();

      await ledgerBalance.updateWithdrawableAmount();

      PopulousEmitter.emit(populousEvents.pokenWithdraw, userId, {
        ledger: { ...ledgerBalance },
        withdrawAmount: amount,
        address: { ...externalAddress },
        fee: operationFeeAmount,
        toBank: false
      });
    },

    async withdrawXAU(amountStr, series, externalAddressId, tokenId) {
      const userId = checkAuth();
      this.checkIsActive();
      const wallet = await Wallet.findOne({userId});

      const externalAddress = ExternalAddress.findOne({
        _id: externalAddressId,
        userId,
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const amount = roundNumber(amountStr);
      const diffAmount = wallet.balanceXAU[series].amount - amount;
      const operationFeeAmount = this.checkOperationPossibility();

      if (diffAmount < 0) {
        throw new Meteor.Error(400, 'You do not have enough of balance');
      }

      const blockchainAction = new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        xaup_id: series,
        title: 'XAUp',
        amount: amount,
        status: blockchainActionStatuses.pending,
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        version: wallet.version,
      });

      await blockchainAction.save();

      PopulousEmitter.emit(populousEvents.xaupWithdraw, userId, {
        withdrawAmount: amount,
        address: { ...externalAddress },
        fee: operationFeeAmount,
        toBank: false
      });
    },

    async withdrawBankAccount(currency, bankIdInput, amountInput) {
      const userId = checkAuth();
      const user = User.findOne(userId);
      const isInvestor = user.isInvestor();

      let operationFeeAmount;

      if (isInvestor) {
        this.checkIsActive();
        await this.getBalanceOfCurrencies();
        operationFeeAmount = this.checkOperationPossibility();
      }


      let amount = roundNumber(amountInput);

      const ledgerBalance = await LedgerBalance.findOne({
        userId: userId,
        currency: currency,
      });

      if (!ledgerBalance || ledgerBalance.getWithdrawableAmount(user) < amount) {
        throw new Meteor.Error(400, 'You do not have enough of balance');
      }

      const legerLog = new LedgerLog({
        fromUserId: userId,
        fromUserAddress: this.address || 'Populous',
        toUserId: "Populous",
        toUserAddress: "",
        dataId: "",
        fromCurrency: currency,
        toCurrency: currency,
        fromValue: amount,
        toValue: amount,
        conversionRate: 1,
        spread: 0,
        isPending: false,
        type: ledgerActionsTypes.withdraw,
        fromNewBalance: ledgerBalance.withdrawableAmount,
        toNewBalance: ledgerBalance.withdrawableAmount - amount,
      }).save();

      const request = new Request({
        type: requestTypes.withdraw,
        userId,
        dataId: legerLog,
        amount: amount,
        bankId: bankIdInput,
        fee: isInvestor ? 0 : 5,
      }).save();

      LedgerLog.update({ _id: legerLog }, { $set: { dataId: request } });

      if (isInvestor) {
        await (new BlockchainAction({
          userId,
          type: blockchainActionTypes.withdraw,
          title: currency,
          amount: ledgerBalance.generateWithdrawObject(amount),
          feeAmount: operationFeeAmount,
          withdrawal: {
            id: request,
            in: Request.getCollection()._name,
          },
        })).save();
      }
      await ledgerBalance.updateWithdrawableAmount();

      PopulousEmitter.emit(populousEvents.pokenWithdraw, userId,
        {
          ledger: { ...ledgerBalance },
          withdrawAmount: amount,
          bankId: bankIdInput,
          fee: isInvestor ? operationFeeAmount : 5,
          feeCurrency: isInvestor ? 'PPT' : 'GBP',
          toBank: true
        });
    },

    async withdrawPXT(amountStr, externalAddressId, tokenId) {
      const userId = checkAuth();
      this.checkIsActive();
      const wallet = await Wallet.findOne({userId});

      const externalAddress = ExternalAddress.findOne({
        _id: externalAddressId,
        userId,
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const amount = roundNumber(amountStr);
      const operationFeeAmount = this.checkOperationPossibility();

      const bAction = await BlockchainAction
      .find({
        userId: this.userId,
        type: blockchainActionTypes.withdraw,
        title: 'PXT',
        status: blockchainActionStatuses.pending,
      })
      .fetch();

      const pendingAmount = bAction.reduce((previousValue, { amount }) => (previousValue + Number(amount)), 0);
      const pendingFeePPT = bAction.reduce((previousValue, { feeAmount }) => (previousValue + Number(feeAmount)), 0);

      const diffAmount = wallet.balancePXT - pendingAmount - amount;
      const diffFeePPT = wallet.balance - pendingFeePPT;

      if (diffAmount < 0) {
        throw new Meteor.Error(400, 'Insufficient balance');
      }

      if (diffFeePPT < 0) {
        throw new Meteor.Error(400, 'Insufficient PPT balance');
      }

      const blockchainAction = new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        title: 'PXT',
        amount: amount,
        status: blockchainActionStatuses.pending,
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        version: wallet.version,
      });

      await blockchainAction.save();

      PopulousEmitter.emit(populousEvents.PXTWithdraw, userId, {
        withdrawAmount: amount,
        address: {...externalAddress},
        fee: operationFeeAmount,
        toBank: false
      });
    },

    async withdrawUSDC(amountStr, externalAddressId, tokenId) {
      const userId = checkAuth();
      this.checkIsActive();
      const wallet = await Wallet.findOne({userId});

      const externalAddress = ExternalAddress.findOne({
        _id: externalAddressId,
        userId,
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const amount = roundNumber(amountStr);
      const operationFeeAmount = this.checkOperationPossibility();

      const bAction = await BlockchainAction
      .find({
        userId: this.userId,
        type: blockchainActionTypes.withdraw,
        title: 'USDC',
        status: blockchainActionStatuses.pending,
      })
      .fetch();

      const pendingAmount = bAction.reduce((previousValue, { amount }) => (previousValue + Number(amount)), 0);
      const pendingFeePPT = bAction.reduce((previousValue, { feeAmount }) => (previousValue + Number(feeAmount)), 0);

      const diffAmount = wallet.balanceUSDC - pendingAmount - amount;
      const diffFeePPT = wallet.balance - pendingFeePPT;

      if (diffAmount < 0) {
        throw new Meteor.Error(400, 'Insufficient balance');
      }

      if (diffFeePPT < 0) {
        throw new Meteor.Error(400, 'Insufficient PPT balance');
      }

      const blockchainAction = new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        title: 'USDC',
        amount: amount,
        status: blockchainActionStatuses.pending,
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        version: wallet.version,
      });

      await blockchainAction.save();

      PopulousEmitter.emit(populousEvents.USDCWithdraw, userId, {
        withdrawAmount: amount,
        address: {...externalAddress},
        fee: operationFeeAmount,
        toBank: false
      });
    },

    async withdrawTUSD(amountStr, externalAddressId, tokenId) {
      const userId = checkAuth();
      this.checkIsActive();
      const wallet = await Wallet.findOne({userId});

      const externalAddress = ExternalAddress.findOne({
        _id: externalAddressId,
        userId,
      });

      if (!externalAddress) {
        throw new Meteor.Error(400, 'Provided external address is invalid');
      }

      const amount = roundNumber(amountStr);
      const operationFeeAmount = this.checkOperationPossibility();

      const bAction = await BlockchainAction
      .find({
        userId: this.userId,
        type: blockchainActionTypes.withdraw,
        title: 'TUSD',
        status: blockchainActionStatuses.pending,
      })
      .fetch();

      const pendingAmount = bAction.reduce((previousValue, { amount }) => (previousValue + Number(amount)), 0);
      const pendingFeePPT = bAction.reduce((previousValue, { feeAmount }) => (previousValue + Number(feeAmount)), 0);

      const diffAmount = wallet.balanceTUSD - pendingAmount - amount;
      const diffFeePPT = wallet.balance - pendingFeePPT;

      if (diffAmount < 0) {
        throw new Meteor.Error(400, 'Insufficient balance');
      }

      if (diffFeePPT < 0) {
        throw new Meteor.Error(400, 'Insufficient PPT balance');
      }

      const blockchainAction = new BlockchainAction({
        userId,
        type: blockchainActionTypes.withdraw,
        title: 'TUSD',
        amount: amount,
        status: blockchainActionStatuses.pending,
        feeAmount: operationFeeAmount,
        to: externalAddress.address,
        version: wallet.version,
      });

      await blockchainAction.save();

      PopulousEmitter.emit(populousEvents.TUSDWithdraw, userId, {
        withdrawAmount: amount,
        address: {...externalAddress},
        fee: operationFeeAmount,
        toBank: false
      });
    },

    async convertPptToCurrency(amount, toCurrency, needDivide = true) {
      const usdtAmount = this.pptToUsdt(amount, needDivide);
      let exchangeRate = 1;

      if (toCurrency !== 'USD') {
        const exchangeRateDocument = await ExchangeRate.findOne({
          from: 'USD',
          to: toCurrency
        });

        if (!exchangeRateDocument) {
          throw new Meteor.Error(400, 'Target currency does not exist');
        }
        exchangeRate = exchangeRateDocument.ask;
      }

      return roundNumber(usdtAmount * exchangeRate);
    },

    async pptToUsdt(amountPPT, needDivide = true) {
      try {
        return roundNumber(amountPPT * (await this.getLatestPptToUsdtRate() / (needDivide ? 2 : 1)));
      } catch (e) {
        return roundNumber(amountPPT);
      }
    },

    async convertPptToXau(pptAmount) {
      const usdtAmount = this.pptToUsdt(pptAmount);
      const usdToXauRate = ExchangeRate.findOne({
        from: 'USD',
        to: 'XAU',
      });
      const ounceTokilograms = 0.0283495;

      if (!usdToXauRate) {
        return 0;
      }

      return roundNumber(usdtAmount * usdToXauRate.ask * ounceTokilograms, 6);
    },

    async convertXauToEth(xauAmount) {
      const xauToEthRate = ExchangeRate.findOne({
        from: 'XAU',
        to: 'ETH',
      });

      if (!xauToEthRate) {
        return 0;
      }

      return roundNumber((xauAmount * xauToEthRate.bid) * 1.005, 6);
    },

    async getLatestPptToUsdtRate() {
      const pptToUsd = ExchangeRate.findOne({
        from: 'PPT',
        to: 'USD'
      });

      return pptToUsd.ask;
    },

    async getOperationFee(isWithdraw = true) {
      return roundNumber(this.convertCurrencyToPPT('GBP', isWithdraw ? 5 : 1, false), 8);
    },
    async convertCurrencyToPPT(currencySymbol, amount, needDivide = true) {
      let usdToPPTRate = (1 / this.pptToUsdt(1, false)) / (needDivide ? 2 : 1);

      let rate = usdToPPTRate;

      if (currencySymbol !== 'USD') {
        const exchangeRate = await ExchangeRate.findOne({
          from: 'USD',
          to: currencySymbol
        });

        if (!exchangeRate) {
          throw new Meteor.Error(400, 'Target currency does not exist');
        }
        rate = usdToPPTRate / exchangeRate.ask;
      }

      return roundNumber(rate * amount);
    },
    checkOperationPossibility(isWithdraw = true) {
      const availablePPTBalance = this.calculateAvailableBalance();
      const operationFeeAmount = this.getOperationFee(isWithdraw);

      if (operationFeeAmount > availablePPTBalance) {
        throw new Meteor.Error(400, 'Not enough PPTs for this operation')
      }

      return roundNumber(operationFeeAmount, 8);
    },

    async recheckWalletStatus() {
      const userId = checkAuth();
      const wallet = await Wallet.findOne({ userId });

      if (!wallet || wallet.isActive()) {
        return;
      }

      const {
        config: {
          contract: { dataManager },
        },
        contracts: {
          dataManager: { getDepositAddress },
        }
      } = ethConnect;

      const existingBlockchainAction = await BlockchainAction.findOne({
        userId: wallet.userId,
        type: blockchainActionTypes.createAddress
      });

      if (existingBlockchainAction && existingBlockchainAction.isCompleted()) {
        const walletAddressFromBlockchain = await getDepositAddress(userId);

        if (walletAddressFromBlockchain) {
          wallet.address = walletAddressFromBlockchain;
          wallet.isPending = false;
          await wallet.save();
        }
      }
    },
    async createNewDepositAddress() {
      const blockchainVersion = await getWalletVersion();
      if (this.address && this.version < blockchainVersion && !this.isPending) {
        const blockchainActionDoc = {
          userId: this.userId,
          version: Number(blockchainVersion),
          type: blockchainActionTypes.createAddress
        };

        if (await BlockchainAction.findOne(blockchainActionDoc)) {
          return;
        }

        await (new BlockchainAction(blockchainActionDoc)).save();
      }
    },
    //   async attemptWalletUpgrade() {
    //     try {
    //       const blockchainVersion = await getWalletVersion();

    //       const {
    //         config: {
    //           network: {ropsten},
    //           contract: { _build: buildContract },
    //         },
    //         contracts: { depositContract: {getVersion}, dataManager: {getDepositAddress} },
    //       } = ethConnect;

    //       // const currentBalancePPT = await getVersion(undefined, populousToken, ropsten.ethAddress, this.address);


    //       // const outdatedWallets = await Wallet
    //       //   .find({
    //       //     ...(await getOutdatedBCVersionQuery()),
    //       //   }).fetch();
    //       const outdatedWallets = await validateWallets(Wallet);
    //       console.log('getOutdateBCVersion Query', await getOutdatedBCVersionQuery())
    //       console.log('BlockChain Version', outdatedWallets)

    //       for (let i = 0; i < outdatedWallets.length; i++) {
    //         const wallet = outdatedWallets[i];

    //         if (wallet.isActive()) {
    //           const addressInBlockchain = await getDepositAddress(wallet.userId);
    //           console.log('WALLET ACTIVE', addressInBlockchain, wallet.address)
    //           if (addressInBlockchain) {
    //             wallet.address = addressInBlockchain;
    //           }
    //           const contractInstance = buildContract('DepositContract', wallet.address);
    //           const version = await getVersion(undefined, contractInstance);
    //           wallet.version = version;
    //           await wallet.save();
    //           // if (addressInBlockchain === wallet.address) {
    //           //   wallet.version = blockchainVersion;
    //           //   await wallet.save();
    //           //   continue;
    //           // }
    //         }

    //         const isNeedCreateNewAdress = !wallet.address || (wallet.version < getWalletVersion() && !wallet.isPending);

    //         if (isNeedCreateNewAdress) {
    //           const blockchainActionDoc = {
    //             userId: wallet.userId,
    //             version: Number(blockchainVersion),
    //             type: blockchainActionTypes.createAddress
    //           };

    //           if (await BlockchainAction.findOne(blockchainActionDoc)) {
    //             continue;
    //           }

    //           await (new BlockchainAction(blockchainActionDoc)).save();
    //         }
    //       }
    //     } catch (error) {
    //       console.log('Wallet upgrade error: ', error);
    //     }
    //   }
  },
  events: {
    beforeSave(e) {
      const doc = e.target;
      if (Wallet.isNew(doc) && !doc.version) {
        doc.version = getWalletVersion();
      }
    }
  },
});
