import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice as InvoiceAPI, Currency,Crowdsale, Bid, LedgerBalance, File, User, Debtor } from 'meteor/populous:api';
import { invoiceStatuses, crowdsaleStatuses, invoiceDocumentTypes, } from 'meteor/populous:constants';
import Invoice from '../components/Invoice';
import {setInvoice} from "../modules/actions";

const reduxData = connect(
  state => ({ ...state.app, ...state.router, ...state.invoiceDetail }),
  dispatch => ({
    noInvoiceFound: () => dispatch(push('/')),
    setCurrentInvoice: (invoice) => dispatch(setInvoice(invoice)),
  }));

const meteorData = withTracker(({ currentUser, match: { params: { invoiceId } }, ...props }) => {
  const invoiceSubscription = Meteor.subscribe('invoices.id', invoiceId);
  const debtorHandler = Meteor.subscribe('debtor.all');
  const balanceHandler = Meteor.subscribe('ledger_balance', Meteor.userId());

  if (invoiceSubscription.ready() && balanceHandler.ready() && debtorHandler.ready() ) {

    const invoice = InvoiceAPI.findOne(invoiceId);
    const documents = {};
    const currencies = Currency.find({$and: [{isPending: false}]}).fetch();

    const balances = LedgerBalance.find({
      currency: {
        $in: currencies.map(item => {
          return item.symbol
        })
      }
    }).fetch();
    const debtors = Debtor.find({}).fetch();
    if (invoice) {
      for (const docType in invoice.documents) {
        if (invoice.documents.hasOwnProperty(docType)) {
          documents[docType] = File.findOne({_id: invoice.documents[docType]});
        }
      }

      invoice.debtor = Debtor.findOne(invoice.debtorId);
      invoice.seller = Debtor.findOne(invoice.sellerId);

      if (invoice.debtor) {
        if (!invoice.debtor.zscore) {
          invoice.debtor.callMethod('getZScore');
        }
      }

    }
    // We have to return an object for withTracker to work
    return {
      loading: false,
      invoiceDocument: invoice,
      documents,
      currencies,
      balances,
      debtors,
      borrower: invoice && invoice.borrower()
    };
  } else {
    return {
      loading: true
    };
  }
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(Invoice);
