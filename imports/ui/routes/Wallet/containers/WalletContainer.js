import {Meteor} from 'meteor/meteor';
import {compose, bindActionCreators} from 'redux';
import moment from 'moment';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {invoiceStatuses, requestTypes, ledgerActionsTypes, blockchainActionTypes, blockchainActionStatuses} from 'meteor/populous:constants';
import {
  Wallet as WalletApi,
  Currency,
  Bank,
  Crowdsale,
  Bid,
  Invoice,
  LedgerBalance,
  ExternalAddress,
  LedgerLog,
  DepositLog,
  apiHelpers,
  BlockchainAction
} from 'meteor/populous:api';

import Wallet from '../components/Wallet';
import {
  createAddress,
  getBalanceError,
  updateFilters,
  resetFilters,
  incrementCurrentTransactionsPage,
  setLedgerLogsList,
  withdrawPPT,
  withdrawPokens,
  withdrawXAUp,
  getMaximumCollateralReturn,
} from '../modules/actions';
import {showAlertModal} from '../../../components/AlertModal/modules/actions';

const mapStateToProps = ({app, wallet}) => ({
  currentUser: app.currentUser,
  ...wallet
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    createAddress,
    getBalanceError,
    showAlertModal,
    updateFilters,
    resetFilters,
    incrementCurrentTransactionsPage,
    withdrawPPT,
    withdrawPokens,
    withdrawXAUp,
    getMaximumCollateralReturn,
  }, dispatch),
});

const meteorData = withTracker(({currentUser, lastRates, filters, currentPage}) => {
  const currentUserId = Meteor.userId();
  const wallet = WalletApi.findOne({userId: currentUserId});
  const banks = Meteor.subscribe('bank.user', currentUserId);
  const userBalance = Meteor.subscribe('ledger_balance', currentUserId);
  const externalAddress = Meteor.subscribe('externalAddress.user', currentUserId);
  const requests = Meteor.subscribe('requests.userId', currentUserId);
  const userExchangeBlockchainAction = Meteor.subscribe('blockchainAction.user', currentUserId, blockchainActionTypes.exchangeXaup);
  const currencies = Currency.find(
      {
        $and: [{isPending: false}, {title: {$not: 'XAUp'}}]
      }
    ).fetch() || [];
  let currenciesBalance = {};
  if (userBalance.ready() && currencies.length) {

    currencies.forEach((currency) => {
      const balance = LedgerBalance.findOne({
        userId: currentUserId,
        currency: currency.symbol,
      });

      const currencyBalanceObject = {
        amount: 0,
        withdrawable: 0,
        inEscrow: 0,
      };

      if (balance) {
        currencyBalanceObject.amount = (balance.amount + balance.totalPrinciple - balance.totalBidAmount);
        currencyBalanceObject.withdrawable = balance.withdrawable;
        currencyBalanceObject.interestAmount = balance.interestAmount;
        currencyBalanceObject.inEscrow = (balance.totalBidAmount - balance.totalPrinciple);
      }

      currenciesBalance[currency.symbol] = currencyBalanceObject;
    });
  }

  const depositLedgerLogs = new DepositLog().getAllActiveLogs(currentUserId);

  let userBanks = [];
  if (banks.ready()) {
    userBanks = Bank.find({}).fetch();
  }

  let externalsAddresses = [];
  if (externalAddress.ready()) {
    externalsAddresses = ExternalAddress.find({userId: currentUserId}).fetch();
  }

  if (externalsAddresses.length) {
    externalsAddresses.forEach((address) => {
      if (address.newAddress && address.isActive()) {
        address.callMethod('confirmationAddress');
      }
    });
  }

  let hasMore = false;

  const query = {
      type: {
        $in: [
          ledgerActionsTypes.exchange,
          ledgerActionsTypes.deposit,
          ledgerActionsTypes.depositReturn,
          ledgerActionsTypes.repayment,
          ledgerActionsTypes.withdrawPPT,
        ]
      }, '$and': []
    },
    transactionsPerPageLimit = 4;
  let ledgerLogsList = [];

  if (currentUserId === currentUser._id) {
    let subquery = {};
    subquery['$or'] = [
      {toUserId: currentUserId},
    ];
    query['$and'].push(subquery);

    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: filters.startDate.startOf('day').toDate(),
        $lte: filters.endDate.endOf('day').toDate()
      };
    } else {
      if (filters.startDate) {
        query.createdAt = {$gte: filters.startDate.startOf('day').toDate()};
      } else if (filters.endDate) {
        query.createdAt = {$lte: filters.endDate.endOf('day').toDate()};
      }
    }

    if (filters.selectedWallet) {
      let subquery = {};
      subquery['$or'] = [
        {toCurrency: filters.selectedWallet},
        {fromCurrency: filters.selectedWallet},
      ];
      query['$and'].push(subquery);
    }

    if (filters.transactionType && filters.transactionType === 'exchange') {
      query.type = {$in: ['deposit', 'depositReturn', 'exchange']};
    } else if (filters.transactionType) {
      query.type = filters.transactionType;
    }

    if (filters.search) {
      query['$where'] = `/^${filters.search}.*/.test(this.toNewBalance)`;
    }

    const totalCount = LedgerLog.find(query).count();

    ledgerLogsList = LedgerLog.find(query, {
      sort: {createdAt: -1},
      limit: currentPage * transactionsPerPageLimit
    }).fetch();

    hasMore = totalCount > ledgerLogsList.length;
  }

  let xaupBlockchainActions = [];
  if (userExchangeBlockchainAction.ready()) {
    xaupBlockchainActions = BlockchainAction.find({
      userId: currentUserId,
      type: blockchainActionTypes.exchangeXaup,
      status: blockchainActionStatuses.complete,
    }).fetch();

    // FOR TESTING - it will be changed later
    currenciesBalance['XAU'] = 0;
    const currentDate = moment().utc();
    xaupBlockchainActions.forEach(({amount: {xau}, createdAt}) => {
      if (currentDate.isAfter(moment(createdAt).add(9, 'months'))) {
        currenciesBalance['XAU'] += xau;
      }
    })
  }

  const canWithdrawPPT = currentUser.canWithdrawPPT();
  const canWithdrawXAUp = currentUser.canWithdrawXAUp();
  const canExchangeXAUp = currentUser.canExchangeXAUp();

  return {
    wallet, currencies, userBanks, externalsAddresses,
    currenciesBalance, lastRates, depositLedgerLogs, ledgerLogsList, hasMore, filters,
    canWithdrawPPT, canExchangeXAUp, xaupBlockchainActions, canWithdrawXAUp
  };
});

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), meteorData)(Wallet);
