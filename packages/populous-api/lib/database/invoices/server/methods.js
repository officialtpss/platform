import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Invoice from "../model";

Meteor.methods({
  'invoices.remove'(ids) {
    ids.forEach((id) => {
      Invoice.findOne(id).remove();
    });
  }
});
