import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice, Bid, Currency, ExchangeRate, Debtor, apiHelpers, } from 'meteor/populous:api';

import Invoices from '../components/Invoices';
import InvoicesActions from '../modules/actions';
import { invoiceStatuses } from 'meteor/populous:constants';
import { invoicesSort, sellerInvoiceStatuses} from '../modules/constants';
import moment from 'moment';

const reduxData = connect(
  state => ({ ...state.app, ...state.invoices }),
  { ...InvoicesActions }
);

const meteorData = withTracker((state) => {
  const handle = Meteor.subscribe('invoices.user', Meteor.userId());
  const bidsHandler = Meteor.subscribe('bids');
  const currencies = Currency.find({ isPending: false }).fetch();
  let minSalePrice, maxSalePrice, query = {}, { filters, quickFilters } = state, statuses = [], invoices = [], invoicesCount = 0;

  for (let status in sellerInvoiceStatuses) {
    if (filters.statuses[status]) {
      statuses.push(invoiceStatuses[status]);
    }
  }
  if (statuses.length) {
    query.status = { '$in': statuses };
  }

  if(!!filters.salePrice.min || !!filters.salePrice.max) {
    query.salePrice = {
      $gte: filters.salePrice.min,
      $lte: filters.salePrice.max
    };
  }

  if (filters.currencies && filters.currencies.length > 0) {
    let currencies = [];
    for (let currency of filters.currencies) {
      currencies.push(currency);
    }
    query.currency = { $in: currencies };
  }

  query.dueDate = {};

  if (filters.dueDate.startDate || filters.dueDate.endDate) {
    if (filters.dueDate.startDate) {
      query.dueDate.$gte = filters.dueDate.startDate.toDate();
    }

    if (filters.dueDate.endDate) {
      query.dueDate.$lte = filters.dueDate.endDate.toDate();
    }
  } else {
    if (filters.dueDate === 'overdue') {
      query.dueDate.$lte = moment.utc().toDate();
    }

    if (typeof filters.dueDate === 'number') {
      query.dueDate.$gte = moment.utc().toDate();
      query.dueDate.$lte = moment.utc().add(filters.dueDate, 'month').toDate();
    }
  }

  if (quickFilters.keyword) {
    const fullTextRegExp = new RegExp('.*' + quickFilters.keyword + '.*', 'i');
    if(!query['$or']) {
      query['$or'] = [];
      query['$or'].push(
        { borrowerFullName: fullTextRegExp },
        { currency: fullTextRegExp },
        { amount: Number(quickFilters.keyword) },
        { salePrice: Number(quickFilters.keyword) }
      );
    } else {
      query['$and'] = [];
      query['$and'].push({$or: query['$or']});
      delete query['$or'];

      const keywordQuery = {$or: []};
      keywordQuery['$or'].push(
        { borrowerFullName: fullTextRegExp },
        { currency: fullTextRegExp },
        { amount: Number(quickFilters.keyword) },
        { salePrice: Number(quickFilters.keyword) }
      );
      query['$and'].push(keywordQuery);
    }
  }

  let sortOptions = invoicesSort[quickFilters.sortBy];
  sortOptions.desc = quickFilters.sortOrder;

  if(handle.ready() && bidsHandler.ready()) {
    invoices = Invoice.find(query, {
      sort: {
        [sortOptions.column]: (sortOptions.desc ? -1 : 1),
      }
    }).fetch();

    minSalePrice = Invoice.findOne({}, {
      sort: { salePrice: 1 }
    });

    maxSalePrice = Invoice.findOne({}, {
      sort: { salePrice: -1 }
    });

    for (let invoice of invoices) {
      const bids = Bid.find({ invoiceId: invoice._id }).fetch();
      let highestBid = 0;
      if( bids && bids.length > 0) {
        highestBid = Math.max(...bids.map((bid) => bid.amount));
      } else {
        highestBid = invoice.salePrice;
      }
      invoice.bids = bids;
      invoice.highestBid = highestBid;
      invoice.returnOnInvestmentPercent = apiHelpers.roundNumber((invoice.amount - highestBid) / invoice.amount * 100);
      invoice.debtor = Debtor.findOne(invoice.debtorId) || {};
    }

    if (sortOptions.column === 'debtorName') {
      const order = sortOptions.desc === true ? -1 : 1;
      invoices = invoices.sort((a, b) => {

        if (a.debtor && b.debtor) {
          if (!a.debtor.name) return 1;
          if (!b.debtor.name) return -1;
          if (a.debtor.name < b.debtor.name) return -order;
          if (a.debtor.name > b.debtor.name) return order;
          return 0;
        }
      })
    }

    invoicesCount = Invoice.find({}).count();

    if (invoicesCount > 0) {
      const { salePriceLimit, salePrice } = state.filters;
      let newMax = salePriceLimit.max,
          newMin = salePriceLimit.min;
      let maxSalePriceInvoice = Invoice.findOne({
          status: { '$in': statuses }
        }, {
          sort: { salePrice: -1 }
        });

      let minSalePriceInvoice = Invoice.findOne({
          status: { '$in': statuses }
        }, {
          sort: { salePrice: 1 }
        });

      if (maxSalePriceInvoice) {
        newMax = maxSalePriceInvoice.salePrice;
      }
      if (minSalePriceInvoice) {
        newMin = minSalePriceInvoice.salePrice;
      }
      newMax = Math.ceil(newMax);
      newMin = Math.floor(newMin);
      if (newMin === newMax) {
        newMin = 0;
      }

      if (salePriceLimit.min !== newMin || salePriceLimit.max !== newMax) {
        if (salePrice.min < 0 || salePrice.max < 0 || salePrice.min < newMin || salePrice.max > newMax) {
          state.updateSalePriceMinMax(newMin, newMax);
        }

        state.updateSalePriceMinMaxRange(newMin, newMax);
      }
    }
  }

  return {
    loading: !handle.ready() || !bidsHandler.ready(),
    invoices,
    currencies,
    invoicesCount,
    minSalePriceInvoice: minSalePrice ? Math.floor(minSalePrice.salePrice) : 0,
    maxSalePriceInvoice: maxSalePrice ? Math.ceil(maxSalePrice.salePrice) : 1,
  };
});

export default compose(reduxData, meteorData)(Invoices);
