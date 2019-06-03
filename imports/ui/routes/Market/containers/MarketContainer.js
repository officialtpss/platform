import {Meteor} from 'meteor/meteor';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {Invoice, Currency, LedgerBalance, Crowdsale, Bid, ExchangeRate, Debtor, apiHelpers,} from 'meteor/populous:api';
import {invoiceStatuses, returnPercentage, crowdsaleStatuses} from 'meteor/populous:constants';
import moment from 'moment';

import {
  saveFilters, setFilters, resetFilters,
  setBaseCurrency, toggleFilters, updateSalePriceMinMaxRange, previewExhanceForInvoice,
  togglePreviewMode, togglePreviewModeTooltip, setTextSearch, setSortColumn, setSortOrder, incrementCurrentPage,
} from '../modules/actions';

import Market from '../components/InvoiceMarket';
import {invoicesSort, buyerInvoiceStatues} from "../modules/constants";

const reduxData = connect(
  state => ({...state.app, ...state.invoiceMarket}),
  dispatch => ({
    ...bindActionCreators({
      resetFilters,
      toggleFilters,
      saveFilters,
      setFilters,
      setBaseCurrency,
      updateSalePriceMinMaxRange,
      previewExhanceForInvoice,
      togglePreviewMode,
      togglePreviewModeTooltip,
      setTextSearch,
      setSortColumn,
      setSortOrder,
      incrementCurrentPage,
    }, dispatch),
  })
);

const perPage = 4;

const meteorData = withTracker(({currentUser, ...state}) => {
  const balanceHandler = Meteor.subscribe('ledger_balance', Meteor.userId());

  let filters = state.filters;
  // Get the invoice data for the user

  const currencies = Currency.find(
    {
      $and: [{isPending: false}]
    }
  ).fetch();

  let balances = [];
  const getBalances = currencies => {
    if (balanceHandler.ready()) {
      balances = LedgerBalance.find({
        currency: {
          $in: currencies.map(item => {
            return item.symbol
          })
        }
      }).fetch();
    }
  };
  getBalances(currencies);

  let query = {};
  let statuses = [];
  for (let status in buyerInvoiceStatues) {
    if (filters.statuses && filters.statuses[status]) {
      statuses.push(invoiceStatuses[status]);
    }
  }
  if (statuses.length) {
    query.status = {'$in': statuses};
  }

  // TODO: When will the logic be added to use the "isDefaulted" need add filtering for this field
  // if (filters.statuses.defaulted) {
  //  query.isDefaulted = true;
  // }

  const isFilterCurrenciesIterable = (Array.isArray(filters.currencies));

  if (isFilterCurrenciesIterable || (filters.currencies === null)) {
    if (!query['$or']) {
      query['$or'] = [];
    }

    (isFilterCurrenciesIterable
      ? filters.currencies
      : currencies.map(({symbol}) => symbol)).map((currency) => {
      let subquery = {currency: currency};

      if (filters.previewMode && filters.salePrice.min >= 0 && filters.salePrice.max >= 0) {
        let rate = ExchangeRate.findOne({from: 'GBP', to: currency});
        rate = rate ? rate.ask : 1;
        subquery.salePrice = {
          $gte: filters.salePrice.min * rate,
          $lte: filters.salePrice.max * rate,
        };
      }
      query['$or'].push(subquery);
    });

    if (!query['$or'].length) {
      query['$or'].push({currency: ''});
    }
  }

  if(!filters.previewMode && filters.salePrice.min >= 0 && filters.salePrice.max >= 0){
    query.salePrice = {
      $gte: filters.salePrice.min,
      $lte: filters.salePrice.max,
    };
  }

  if (filters.dueDate.startDate || filters.dueDate.endDate) {
    query.dueDate = {};

    if (filters.dueDate.startDate) {
      query.dueDate.$gte = filters.dueDate.startDate;
    }

    if (filters.dueDate.endDate) {
      query.dueDate.$lte = filters.dueDate.endDate;
    }
  }

  if (filters.creationDate.startDate || filters.creationDate.endDate) {
    query.createdAt = {};

    if (filters.creationDate.startDate) {
      query.createdAt.$gte = filters.creationDate.startDate;
    }

    if (filters.creationDate.endDate) {
      query.createdAt.$lte = filters.creationDate.endDate;
    }
  }

  if (filters.returnPercentage === 'pending') {
    query.returnPercentage = {$exists: false}
  } else if (filters.returnPercentage !== 'all') {
    query.returnPercentage = {$gte: Number.parseFloat(filters.returnPercentage)}
  }

  if (filters.keyword) {
    const fullTextRegExp = new RegExp('.*' + filters.keyword + '.*', 'i');

    const keywordQueryArray = [];

    keywordQueryArray.push({borrowerFullName: fullTextRegExp});
    keywordQueryArray.push({currency: fullTextRegExp});
    keywordQueryArray.push({amount: Number(filters.keyword)});
    keywordQueryArray.push({salePrice: Number(filters.keyword)});

    if (!query['$or']) {
      query['$or'] = keywordQueryArray;
    }else{
      query['$and'] = [
        {$or: query['$or']},
        {$or: keywordQueryArray},
      ];

      delete query.$or;
    }
  }

  const handle = Meteor.subscribe('invoices.search', {
    query: {},
  });

  let crowdsales, invoices, hasMore = false;

  if (handle.ready()) {
    crowdsales = Crowdsale.find({}).fetch();

    const timeLeftComparator = (a, b) => {
      // check status open and latest update (opening time)
      if (a.status === invoiceStatuses.auctionOpen && b.status !== invoiceStatuses.auctionOpen) {
        return -1
      } else if (a.status === invoiceStatuses.auctionOpen && b.status === invoiceStatuses.auctionOpen) {
        const crowdA = crowdsales.find((el) => el.invoiceId === a._id);
        const crowdB = crowdsales.find((el) => el.invoiceId === b._id);

        if (crowdA && crowdB) {
          const A = moment(crowdA.closeAt);
          const B = moment(crowdB.closeAt);
          return filters.sortOrder ? A - B : B - A
        }
      } else if (a.status !== invoiceStatuses.auctionOpen && b.status === invoiceStatuses.auctionOpen) {
        return +1;
      } else if (a.status !== invoiceStatuses.auctionOpen && b.status !== invoiceStatuses.auctionOpen) {
        const A = moment(a.dueDate);
        const B = moment(b.dueDate);
        return filters.sortOrder ? A - B : B - A
      }
    };

    if (filters.sortColumn === 'endIn') {
      query.status = invoiceStatuses.auctionOpen;
    }

    const currentSort = filters.sortColumn ? invoicesSort[filters.sortColumn].column : invoicesSort.status.column;
    invoices = Invoice.find(query,
      {
        sort: filters.sortColumn === 'closeAt' ? timeLeftComparator : {
          [currentSort]: (filters.sortOrder ? -1 : 1),
        },

        limit: state.currentPage * perPage,
      }
    ).fetch();
    hasMore = invoices.length <  Invoice.find(query).count();

    for (let invoice of invoices) {
      const debtor = Debtor.findOne(invoice.debtorId) || {};
      const bidPlaced = !!Bid.find({
        invoiceId: invoice._id,
        $or: [
          {userId: currentUser._id,},
          {'bidders.userId': currentUser._id},
        ],
      }).count();

      invoice.crowdsale = crowdsales
        .find((el) => el.invoiceId === invoice._id && invoice.status === invoiceStatuses.auctionOpen);
      invoice.bidPlaced = bidPlaced;
      invoice.debtor = debtor;
      invoice.debtorName = debtor.name;
    }

    const {salePriceLimit} = state.filters;
    let newMax = salePriceLimit.max,
      newMin = salePriceLimit.min;
    const maxSalePriceInvoice = Invoice.findOne({}, {sort: {salePrice: -1}});
    if (maxSalePriceInvoice) {
      newMax = maxSalePriceInvoice.salePrice;
    }
    newMax = Math.ceil(newMax);
    const minSalePriceInvoice = Invoice.findOne({}, {sort: {salePrice: 1}});
    if (minSalePriceInvoice) {
      newMin = minSalePriceInvoice.salePrice;
    }
    newMin = Math.floor(newMin);
    if (salePriceLimit.min !== newMin || salePriceLimit.max !== newMax) {
      state.updateSalePriceMinMaxRange(newMin, newMax);
    }

    if (filters.sortColumn === 'debtorName') {
      const order = filters.sortOrder !== undefined ? filters.sortOrder ? -1 : 1 : 1;
      invoices = invoices.sort((a, b) => {

        if (!a.debtorName) return 1;
        if (!b.debtorName) return -1;

        if (a.debtorName < b.debtorName) return -order;
        if (a.debtorName > b.debtorName) return order;
        return 0;
      })
    }

    if (filters.sortColumn === 'endIn') {
      const order = filters.sortOrder !== undefined ? filters.sortOrder ? -1 : 1 : 1;
      invoices = invoices.sort((a, b) => {
        if (a.crowdsale || b.crowdsale) {
          if (!a.crowdsale) return 1;
          if (!b.crowdsale) return -1;

          if (a.crowdsale.createdAt < b.crowdsale.createdAt) return -order;
          if (a.crowdsale.createdAt > b.crowdsale.createdAt) return order;
          return 0;
        }
      })
    }
  }

  return {
    loading: !handle.ready(),
    hasMore,
    currencies,
    balances,
    crowdsales,
    invoices
  }
});
// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(Market);
