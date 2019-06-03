import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice, Currency, LedgerBalance, LedgerLog, User, ExchangeRate, Bid, Crowdsale } from 'meteor/populous:api';
import { invoiceStatuses, ledgerActionsTypes } from 'meteor/populous:constants';
import moment from 'moment';

import borrowerDashboardActions from '../modules/actions';
import BorrowerDashboard from "../components/BorrowerDashboard";

const reduxData = connect(
  state => ({ ...state.app, ...state.borrowerDashboard }),
  dispatch => ({
    ...bindActionCreators(borrowerDashboardActions, dispatch),
  })
);

const meteorData = withTracker(({
                                  currentUser = {}, selectedCurrency,
                                  selectCurrency, cashFlowDateRange: { startDate, endDate }, dueDays,
                                }) => {
  const currentUserId = currentUser._id;
  const invoicesSubsc = Meteor.subscribe('invoices.user', currentUserId);
  const balanceHandler = Meteor.subscribe('ledger_balance', currentUserId);
  const logsHandler = Meteor.subscribe('ledgerLogs.borrower', currentUserId);
  const exchangeRates = Meteor.subscribe('exchangeRates');

  let ledgerLogs = [];
  let balances = [];
  let invoicesList = [];

  const currencies = Currency.find(
    {
      $and: [{ isPending: false }]
    }
  ).fetch() || [];

  if (currencies.length && !selectedCurrency) {
    selectedCurrency = currencies[0];
    selectCurrency(selectedCurrency);
  }

  const statistic = {
    paymentDues: {
      amountFinanced: 0,
      interest: 0,
      penalties: 0,
      total: 0,
      coming: 0,
    },
    cashFlowData: {
      borrowed: {
        amount: 0,
        interest: 0,
        total: 0,
      },
      returned: {
        amount: 0,
        interest: 0,
        penalties: 0,
        total: 0,
      },
    },
    summary: {
      averageRate: {
        value: 0,
        graph: [],
      },
      altmanZScore: {
        value: 0,
        graph: [],
      },
      overdueRate: {
        value: 0,
        graph: [],
      },
    }
  };

  if (invoicesSubsc && currencies.length && exchangeRates.ready() && logsHandler.ready()) {
    const exchangeRates = {};

    ExchangeRate
      .find({})
      .forEach((rate) => {
        exchangeRates[rate.from + '-' + rate.to] = rate;
      });

    calculate_CahsFlow_Summary_Due_Widgets({
      currentUserId,
      currentUser,
      selectedCurrency: selectedCurrency.symbol,
      startDate,
      endDate,
      exchangeRates,
      statistic,
      dueDays,
    });

    if (balanceHandler.ready()) {
      balances = LedgerBalance.find({
        currency: {
          $in: currencies.map(item => {
            return item.symbol
          })
        }
      }).fetch();
    }

    ledgerLogs = getLedgerLogsToBorrower(currentUserId, exchangeRates, selectedCurrency.symbol);

    const nowUTC = moment().utc();
    invoicesList = Invoice.find({
      borrowerId: currentUserId,
      status: invoiceStatuses.repaymentPending,
      updatedAt: {
        $gte: nowUTC.subtract(dueDays, 'days').toDate()
      },
    }).fetch();
  }

  const invoicesUploadedCount = Invoice.find({
    borrowerId: currentUserId,
    status: {$in: [
      invoiceStatuses.auctionOpen, invoiceStatuses.repaymentPending, invoiceStatuses.repaymentLate,
      invoiceStatuses.repaymentPaid, invoiceStatuses.auctionFailed, invoiceStatuses.auctionClosed
    ]}
  }).count();

  const invoicesFundedCount = Invoice.find({
    borrowerId: currentUserId,
    status: invoiceStatuses.repaymentPaid
  }).count();

  return {
    loading: !invoicesSubsc.ready(),
    statistic,
    currencies,
    balances,
    ledgerLogs,
    invoicesUploadedCount,
    invoicesFundedCount,
    isEmpty: false,
    isEmptyInvoicesList: !invoicesList.length,
    invoicesList: invoicesList,
  };
});

function formatCashFlowDateRangeQuery(startDate, endDate) {
  const cashFlowDateRangeQuery = { $exists: true };

  if (startDate) {
    cashFlowDateRangeQuery.$gte = startDate.startOf('day').toDate();
  }

  if (endDate) {
    cashFlowDateRangeQuery.$lte = endDate.endOf('day').toDate();
  }

  return cashFlowDateRangeQuery;
}

function aggregateStatisticFromInvoices({
                                          invoice, cashFlowDataObject,
                                          summaryObject, dueCrowdsales,
                                          selectedCurrency, paymentDuesObject,
                                          crowdsalesIdsInDateRange, startDate,
                                          endDate, exchangeRates
                                        }) {

  const { _id, amount: invoiceAmount, penaltyPrice, repayedPrice, currency, status } = invoice;

  const bid = Bid.findOne({ invoiceId: _id, isWinner: true, });
  let sortAmount = 0;
  if (bid) {
    sortAmount = bid.sortAmount;
  }
  let exchangeRateAsk = 1;

  if (currency !== selectedCurrency) {
    const exchangeRate = exchangeRates[currency + '-' + selectedCurrency];

    if (exchangeRate) {
      exchangeRateAsk = exchangeRate.ask;
    }
  }

  if (
    (!crowdsalesIdsInDateRange.length && !startDate && !endDate)
    || crowdsalesIdsInDateRange.includes(_id)
  ) {
    cashFlowDataObject.borrowed.amount += (invoiceAmount * exchangeRateAsk);
    cashFlowDataObject.borrowed.interest += ((invoiceAmount - sortAmount) * exchangeRateAsk);
    cashFlowDataObject.borrowed.total += (sortAmount * exchangeRateAsk);

    cashFlowDataObject.returned.interest +=
      (
        (((invoiceAmount - sortAmount) / invoiceAmount) * (repayedPrice - penaltyPrice))
        * exchangeRateAsk);
    cashFlowDataObject.returned.penalties += (penaltyPrice * exchangeRateAsk);
  }

  const averageRate = ((invoiceAmount - sortAmount) / invoiceAmount);
  if (averageRate === averageRate) {    // check if averageRate is NaN
    summaryObject.averageRate.value += averageRate;
  }

  if (status === invoiceStatuses.repaymentPending) {
    paymentDuesObject.amountFinanced += (sortAmount * exchangeRateAsk);
    paymentDuesObject.interest += ((invoiceAmount - sortAmount) * exchangeRateAsk);
    paymentDuesObject.penalties += (penaltyPrice * exchangeRateAsk);
    paymentDuesObject.total += (( penaltyPrice + repayedPrice) * exchangeRateAsk);

    if (dueCrowdsales.includes(_id)) {
      paymentDuesObject.coming += (
        (invoiceAmount + penaltyPrice - repayedPrice)
        * (
          (exchangeRates[currency + '-GBP'] || {})['ask'] || 1
        )
      );
    }
  }

}

function calculate_CahsFlow_Summary_Due_Widgets({
                                                  currentUserId, startDate, endDate,
                                                  exchangeRates, statistic, selectedCurrency,
                                                  currentUser, dueDays
                                                }) {
  let crowdsalesIdsInDateRange = [];
  const cashFlowDateRangeQuery = formatCashFlowDateRangeQuery(startDate, endDate);
  const today = moment().startOf('day');
  const dueEndDay = today.add(dueDays);

  if (cashFlowDateRangeQuery.$gte || cashFlowDateRangeQuery.$lte) {
    crowdsalesIdsInDateRange = Crowdsale
      .find({
        borrowerId: currentUserId,
        createdAt: cashFlowDateRangeQuery,
      }, { $fields: { _id: 1, invoiceId: 1 } })
      .fetch()
      .map(({ invoiceId }) => invoiceId);
  }

  const dueCrowdsales = Crowdsale
    .find({
      createdAt: {
        $gte: today.toDate(),
        $lte: dueEndDay,
      }
    }, { $fields: { _id: 1, invoiceId: 1 } })
    .fetch()
    .map(({ invoiceId }) => invoiceId);

  const invoicesQuery = {
    borrowerId: currentUserId,
    status: {
      $in: [invoiceStatuses.repaymentPending, invoiceStatuses.repaymentPaid]
    },
  };

  const invoices = Invoice.find(invoicesQuery);

  // Objects for mutable
  const {
    paymentDues: paymentDuesObject,
    cashFlowData: cashFlowDataObject,
    summary: summaryObject,
  } = statistic;

  const ledgerLogsForCashFlowAmountReturned = LedgerLog.find({
    fromUserId: currentUserId,
    type: ledgerActionsTypes.repayment,
    createdAt: cashFlowDateRangeQuery,
  });

  ledgerLogsForCashFlowAmountReturned.forEach(({fromCurrency, fromValue}) => {
    let exchangeRateAsk = 1;

    if (fromCurrency !== selectedCurrency) {
      const exchangeRate = exchangeRates[fromCurrency + '-' + selectedCurrency];

      if (exchangeRate) {
        exchangeRateAsk = exchangeRate.ask;
      }
    }

    cashFlowDataObject.returned.amount += (fromValue * exchangeRateAsk);
  });

  invoices.forEach((invoice) => {
    aggregateStatisticFromInvoices({
      invoice,
      cashFlowDataObject,
      summaryObject, dueCrowdsales,
      selectedCurrency,
      paymentDuesObject,
      crowdsalesIdsInDateRange,
      startDate, endDate, exchangeRates
    });
  });

  const averageRate = summaryObject.averageRate.value / invoices.count();
  if ( averageRate === averageRate ) {              // check if averageRate is NaN
    summaryObject.averageRate.value = averageRate
  }
  summaryObject.altmanZScore.value = currentUser.latestZscore || 0;

  cashFlowDataObject.returned.total += (
    cashFlowDataObject.returned.amount
    + cashFlowDataObject.returned.interest
    + cashFlowDataObject.returned.penalties
  );
}

function getLedgerLogsToBorrower(borrowerId, exchangeRates, selectedCurrency) {
  return LedgerLog
    .find({
      toUserId: borrowerId,
      type: ledgerActionsTypes.crowdsale,
      createdAt: { $gt: moment().subtract(1, 'weeks').toDate() }
    }).map((log) => {
      let exchangeRateAsk = 1;

      if (selectedCurrency !== log.toCurrency) {
        const exchangeRate = exchangeRates[log.toCurrency + '-' + selectedCurrency];

        if (exchangeRate) {
          exchangeRateAsk = exchangeRate.ask;
        }
      }

      log.convertedAmount = log.toValue * exchangeRateAsk;

      return log;
    });
}

export default compose(reduxData, meteorData)(BorrowerDashboard);
