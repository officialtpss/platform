import { publishComposite } from 'meteor/reywood:publish-composite';
import LedgerBalance from '../model';

// Publish the data
Meteor.publish('ledger_balance', function(userId) {
  return LedgerBalance.find({userId: userId});
});

