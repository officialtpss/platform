import { publishComposite } from 'meteor/reywood:publish-composite';
import { invoiceStatuses, crowdsaleStatuses } from 'meteor/populous:constants';

import Invoice from '../model';
import User from '../../accounts/model';
import Debtor from '../../debtors/model';
import Crowdsale from '../../crowdsale/model';
import Bid from '../../bid/model';
import EthId from '../../eth_ids/model';
import File from '../../files/model';
import Currency from '../../currencies/model';

publishComposite('invoices.all', function () {
  return {
    find() {
      return Invoice.find({});
    },
    children: [
      {
        find(invoice) {
          return Crowdsale.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          return EthId.find({ userId: invoice.borrowerId });
        }
      },
      {
        find(invoice) {
          return User.find({ _id: invoice.borrowerId });
        }
      },
      {
        find(invoice) {
          return Debtor.find({ _id: invoice.debtorId });
        }
      },
    ]
  }
});

// Publish the data for the current user
publishComposite('invoices.user', function (borrowerId) {
  return {
    find() {
      return Invoice.find({ borrowerId });
    },
    children: [
      {
        find(invoice) {
          return Crowdsale.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          return Bid.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          return Debtor.find({ _id: invoice.debtorId });
        }
      },
    ]
  }
});

// Publish invoices for investors (market)
publishComposite('invoices.search', function (queryObject = {}) {
  return {
    find() {
      return Invoice.find(
        {
          ...queryObject.query,
        }
      );
    },
    children: [
      {
        find(invoice) {
          return Crowdsale.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          return Bid.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          return User.find({ _id: invoice.borrowerId });
        }
      },
      {
        find(invoice) {
          return Debtor.find({ _id: invoice.debtorId });
        }
      },
    ]
  }
});

// Publish the data for a single invoice and it's borrower
publishComposite('invoices.id', function (_id) {
  return {
    find() {
      return Invoice.find({ _id });
    },
    children: [
      {
        find(invoice) {

          // Find the invoice borrower. Even though we only
          // want to return one record here, we use "find"
          // instead of "findOne" since this function should
          // return a cursor.
          //
          // TODO: Limit which fields we publish
          return User.find({ _id: invoice.borrowerId });
        }
      },
      {
        find(invoice) {
          // TODO: Limit which fields we publish
          return Crowdsale.find({ invoiceId: invoice._id });
        }
      },
      {
        find(invoice) {
          // TODO: Limit which fields we publish
          return Bid.find({ invoiceId: invoice._id });
        },
        children: [{
          find(bid) {
            let userIds = [];
            if (bid.names.isGroup) {
              userIds = bid.bidders.map((bidder) => bidder.userId);
            }else{
              userIds.push(bid.userId);
            }

            return User.find({_id:{$in:userIds}});
          }
        }
        ]
      },
      {
        find(invoice) {
          return Currency.find({symbol: invoice.currency});
        }
      },
      {
        find(invoice) {
          return File.find({ _id: {$in: Object.values(invoice.documents)} }).cursor;
        }
      },
      {
        find(invoice) {
          return Debtor.find({ _id: invoice.debtorId });
        }
      },
    ]
  }
});

// Publish the data for the current user
Meteor.publish('invoices.pending', function () {
  return Invoice.find({
    status: invoiceStatuses.auctionPending
  });
});

// Publish the invoices for the Investor (my invoices)
publishComposite('invoices.investor', function (investorId) {
  return {
    find() {
      const bids = Bid.find({
        $or: [
          { userId: investorId, },
          {
            bidders: {
              $elemMatch: {userId: investorId, },
            },
          },
        ]
      }, { fields: { invoiceId: 1 } }).fetch();
      const invoiceIds = bids.map(bid => bid.invoiceId);
      return Invoice.find({
        $or: [
          {_id: {$in: invoiceIds}},
          {borrowerId: investorId}
        ]
      });
    },
    children: [
      {
        find(invoice) {
          return Crowdsale.find({ invoiceId: invoice._id });
        },
        children: [
          {
            find(crowdsale) {
              return Bid.find({ crowdsaleId: crowdsale._id });
            }
          }
        ]
      },
      {
        find(invoice) {
          return User.find({_id: invoice.borrowerId});
        }
      },
      {
        find(invoice) {
          return Debtor.find({ _id: invoice.debtorId });
        }
      },
    ]
  }
});
