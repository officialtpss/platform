import { Meteor } from 'meteor/meteor';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice, Currency, LedgerBalance, Crowdsale, Bid, ExchangeRate, SIC, Wallet } from 'meteor/populous:api';
import { invoiceStatuses, companyDetails, getTierFee } from 'meteor/populous:constants';

import InvestorDashboard from "../components/InvestorDashboard";
import {
  setChartsType, setCurrentWallet, setDatesRange, updateSicStatistic,
} from '../modules/actions';

const reduxData = connect(
  state => ({ ...state.app, ...state.InvestorDashboard }),
  dispatch => ({
    setChartsType: (value) => dispatch(setChartsType(value)),
    setCurrentWallet: value => dispatch(setCurrentWallet(value)),
    setDatesRange: value => dispatch(setDatesRange(value)),
      ...bindActionCreators({
        updateSicStatistic
      }, dispatch),
  })
);


const meteorData = withTracker(({
                                  currentUser,
                                  datesRange: { from: startDateReceivables, to: endDateReceivables },
                                  currentWallet, ...state,
                                }) => {

  const statistic = {
    payments: {
      principal: {
        paid: 0,
        awaiting: 0,
      },
      interest: {
        paid: 0,
        awaiting: 0,
      },
      penalties: {
        paid: 0,
        awaiting: 0,
      },
      total: {
        paid: 0,
        awaiting: 0,
      },
      comingPaymentsInWeek: 0
    },
    summary: {
      averageRate: {
        value: 0,
        graph: [],
      },
      investmentProfitMargin: {
        value: 0,
        graph: [],
      },
      defaultRate: {
        value: 0,
        graph: [],
      },
      overdueRate: {
        value: 0,
        graph: [],
      },
    }
  };

  const currencies = Currency.find(
    {
      $and: [{ isPending: false }]
    }
  ).fetch() || [];
  let userInvoices = [];
  let fundsSumInGbp = {
    balance: 0,
    inEscrow: 0,
    interestAmount: 0,
  };

  if(!currencies.length){
    return {
      currencies,
      isEmpty: true,
      fundsSumInGbp,
      statistic
    };
  }

  const ledgerBalance = Meteor.subscribe('ledger_balance', currentUser._id);
  const exchangeRatesSubsc = Meteor.subscribe('exchangeRates');
  const invoices = Meteor.subscribe('invoices.all');
  const wallet = Wallet.findOne({userId: currentUser._id});

  if (invoices.ready() && exchangeRatesSubsc.ready() && ledgerBalance.ready()) {
    // for mutable manipulations
    const { payments, summary } = statistic;
    const exchangeRates = {},
      invoiceIdToWinningBid = {},
      userInvoicesIdToInvoice = {},
      nowMoment = moment().utc();

    let pendingRepaymentInvoicesCount = 0,
      pendingRepaymentOverdueInvoicesCount = 0,
      pendingRepaymentDefaultedInvoicesCount = 0,
      pendingRepaymentNotDefaultedInvoicesCount = 0,
      paidRepaymentInvoicesCount = 0;

    /**
     * Get all user bids, winning for receivable widget other for in escrow
     */

    const userBids = Bid.find({
      isWinner: true,
      $or: [
        { userId: currentUser._id },
        {
          bidders: { $elemMatch: { userId: currentUser._id } }
        },
      ]
    }).fetch();

    /**
     * Exchange rates as {[fromCurrency-toCurrency]: exchangeRateObject}
     */

    ExchangeRate
      .find({})
      .forEach((rate) => {
        exchangeRates[rate.from + '-' + rate.to] = rate;
      });

    /**
     * mapping winning bids to invoice ID
     */

    userBids.forEach((bid) => {
      if (bid.isWinner) {
        invoiceIdToWinningBid[bid.invoiceId] = bid;
      }
    });

    userInvoices = Invoice.find({
      _id: { $in: Object.keys(invoiceIdToWinningBid) },
      status: { $in: [invoiceStatuses.repaymentPaid, invoiceStatuses.repaymentPending] },
    }).fetch();

    /**
     * Bind currency to invoice id for inEscrow
     */

    let pendingRepaymentBidsSum = 0;
    let pendingRepaymentInvoicesSum = 0;

    userInvoices.forEach(({ _id, currency, status }) => userInvoicesIdToInvoice[_id] = { currency, status });

    userBids.forEach(bid => {
      if (!userInvoicesIdToInvoice[bid.invoiceId]) {
        return null;
      }
      const { currency: bidCurrency, status: invoiceStatus } = userInvoicesIdToInvoice[bid.invoiceId];
      let bidAmount = 0;
      const exchangeRateAsk = getExchangeRate(exchangeRates, bidCurrency, currentWallet.symbol);

      if (bid.bidders.length > 0) {
        bid.bidders.forEach(bidder => {
          if (bidder.userId === currentUser._id) {
            bidAmount = bidder.amount;
          }
        });
      } else {
        bidAmount = bid.amount;
      }

      if (bid.isWinner && invoiceStatus === invoiceStatuses.repaymentPending ) {
        pendingRepaymentBidsSum += (bidAmount * exchangeRateAsk);
      }
    });

    userInvoices.forEach(({
                            _id, currency, amount: invoiceAmount, status,
                            penaltyPrice, isDefaulted, dueDate, createdAt,
                            zscore,
                          }) => {
      const createdAtMoment = moment(createdAt);
      const dueDateMoment = moment(dueDate).utc();
      const exchangeRateAsk = getExchangeRate(exchangeRates, currency, currentWallet.symbol);

      if (isInvoiceInRange(startDateReceivables, endDateReceivables, createdAtMoment)) {
        const { sortAmount, } = invoiceIdToWinningBid[_id];

        if (status === invoiceStatuses.repaymentPending) {
          payments.principal.awaiting += (sortAmount * exchangeRateAsk);
          payments.interest.awaiting += ((invoiceAmount - sortAmount) * exchangeRateAsk);
          payments.penalties.awaiting += (penaltyPrice * exchangeRateAsk);
          payments.total.awaiting += ((invoiceAmount + penaltyPrice) * exchangeRateAsk);
        }

        if (status === invoiceStatuses.repaymentPaid) {
          payments.principal.paid += (sortAmount * exchangeRateAsk);
          payments.interest.paid += ((invoiceAmount - sortAmount) * exchangeRateAsk);
          payments.penalties.paid += (penaltyPrice * exchangeRateAsk);
          payments.total.paid += ((invoiceAmount + penaltyPrice) * exchangeRateAsk);
        }
      }

      if (status === invoiceStatuses.repaymentPending) {
        pendingRepaymentInvoicesCount++;
        if (isDefaulted) {
          pendingRepaymentDefaultedInvoicesCount++;
        } else {
          pendingRepaymentNotDefaultedInvoicesCount++;
        }

        if (nowMoment.isAfter(dueDateMoment, 'day')) {
          pendingRepaymentOverdueInvoicesCount++;
        }
        pendingRepaymentInvoicesSum += ((invoiceAmount - (invoiceAmount * getTierFee(zscore))) * exchangeRateAsk);
      }

      if (status === invoiceStatuses.repaymentPaid) {
        paidRepaymentInvoicesCount++;
      }
    });

    summary.averageRate.value = (pendingRepaymentInvoicesSum / pendingRepaymentBidsSum) || 0;
    summary.overdueRate.value =
      (pendingRepaymentOverdueInvoicesCount / (paidRepaymentInvoicesCount + pendingRepaymentInvoicesCount)) || 0;
    summary.defaultRate.value = ((
      pendingRepaymentDefaultedInvoicesCount / (pendingRepaymentNotDefaultedInvoicesCount + paidRepaymentInvoicesCount)
    ) ) || 0;

    calculateLedgerBalances({currencies, exchangeRates, currentWallet, fundsSumInGbp });
  }

  return {
    currencies,
    isEmpty: false,
    fundsSumInGbp,
    statistic,
    wallet
  };
});

function getExchangeRate(exchangeRatesObject, fromCurrency, toCurrency) {
  let exchangeRateAsk = 1;

  if (fromCurrency !== toCurrency) {
    const suitableExchangeRate = exchangeRatesObject[fromCurrency + '-' + toCurrency];

    if (suitableExchangeRate) {
      exchangeRateAsk = suitableExchangeRate.ask;
    }
  }

  return exchangeRateAsk;
}

function isInvoiceInRange(startDate, endDate, dateForCompare){
  return ((!startDate && !endDate)
  || (startDate && !endDate && startDate.isSameOrBefore(dateForCompare, 'day'))
  || (endDate && !startDate && endDate.isSameOrAfter(dateForCompare, 'day'))
  || (startDate && endDate
    && dateForCompare.isBetween(startDate, endDate, 'day')));
}

function calculateLedgerBalances({
                                   currencies, exchangeRates, currentWallet, fundsSumInGbp,
}){
  currencies.forEach(currency => {
    let currencyBalance = LedgerBalance.findOne({ currency: currency.symbol });

    if (currencyBalance) {
      const exchangeRateAsk = getExchangeRate(exchangeRates, currency.symbol, currentWallet.symbol);

      currency.inEscrow = (currencyBalance.totalBidAmount - currencyBalance.totalPrinciple);
      currency.userBalance = (currencyBalance.amount + currencyBalance.totalPrinciple - currencyBalance.totalBidAmount);
      currency.userInterest = currencyBalance.interestAmount;

      fundsSumInGbp.balance += currency.userBalance * exchangeRateAsk;
      fundsSumInGbp.inEscrow += currency.inEscrow * exchangeRateAsk;
      fundsSumInGbp.interestAmount += currency.userInterest * exchangeRateAsk;

    }
  });
}

export default compose(reduxData, meteorData)(InvestorDashboard);
