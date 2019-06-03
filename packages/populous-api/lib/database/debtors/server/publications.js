import {Meteor} from 'meteor/meteor';
import {publishComposite} from 'meteor/reywood:publish-composite';

import Debtor from '../model';
import Invoice from "../../invoices/model";


publishComposite('debtor.user', function (userId) {
  return {
    find() {
      return Debtor.find({userId});
    },
    children: [
      {
        find({_id: debtorId,}) {
          return Invoice.find({
            $or:[
              {sellerId: debtorId, },
              {debtorId: debtorId, },
            ],
          })
        }
      }
    ]
  }
});

Meteor.publish('debtor.all', function () {
  return Debtor.find({});
});

Meteor.publish('debtor.ids', function (ids) {
  return Debtor.find({_id: {$in: ids}});
});

Meteor.publish('debtor.id', function (_id) {
  return Debtor.find({_id});
});
