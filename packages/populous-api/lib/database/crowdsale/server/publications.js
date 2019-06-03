import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import CrowdSales from '../model';
import Invoice from '../../invoices/model';
import { invoiceStatuses, crowdsaleStatuses } from 'meteor/populous:constants';

Meteor.publish('crowdsales', function() {
  return CrowdSales.find({status: crowdsaleStatuses.open});
});

Meteor.publish('crowdsalesForInEscrow', function() {
  const invoices = Invoice.find({
      status: {$in: [
        invoiceStatuses.auctionOpen,
        invoiceStatuses.auctionClosed,
        invoiceStatuses.repaymentPending,
      ]}
  }).fetch();

  const invoicesIds = invoices.map((invoice) => invoice._id);

  return CrowdSales.find({
    invoiceId: {$in: invoicesIds}
  });
});