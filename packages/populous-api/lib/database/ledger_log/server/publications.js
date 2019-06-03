import { publishComposite } from 'meteor/reywood:publish-composite';
import User from "../../accounts/model";
import LedgerLog from "../model";
import { Meteor } from 'meteor/meteor';

publishComposite('ledgerLogs.all', function () {
  return {
    find() {
      return LedgerLog.find({});
    },
    children:[
      {
        find(ledgerLog){
          return User.find({_id: {$in: [ledgerLog.fromUserId, ledgerLog.toUserId]}})
        }
      },
    ],
  }
});

publishComposite('ledgerLogs.ids', function (ids) {
  return {
    find() {
      return LedgerLog.find({_id: {$in: ids}});
    },
    children:[
      {
        find(ledgerLog){
          return User.find({_id: {$in: [ledgerLog.fromUserId, ledgerLog.toUserId]}})
        }
      },
    ],
  }
});

publishComposite('ledgerLogs.id', function (_id) {
  return {
    find() {
      return LedgerLog.find({_id});
    },
    children:[
      {
        find(ledgerLog){
          return User.find({_id: {$in: [ledgerLog.fromUserId, ledgerLog.toUserId]}})
        }
      },
    ],
  }
});

publishComposite('ledgerLogs.populous', function() {
  return {
    find() {
      return LedgerLog.find({fromUserId: 'Populous' });
    },
    children:[
      {
        find(ledgerLog){
          return User.find({_id: {$in: [ledgerLog.fromUserId, ledgerLog.toUserId]}})
        }
      },
    ],
  }
});

publishComposite('ledgerLogs.borrower', function(borrowerId) {
  return {
    find() {
      return LedgerLog.find({
        $or: [
          {toUserId: borrowerId},
          {fromUserId: borrowerId},
        ]
      });
    },
    children:[
      {
        find(ledgerLog){
          return User.find({_id: {$in: [ledgerLog.fromUserId, ledgerLog.toUserId]}})
        }
      },
    ],
  }
});