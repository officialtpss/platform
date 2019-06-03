import { Meteor } from 'meteor/meteor';
import Bank from '../model';

// Publish bank details for user
Meteor.publish('bank.user', function(userId) {
  return Bank.find({userId});
});

Meteor.publish('bank.all', function() {
  return Bank.find({});
});

Meteor.publish('bank.id', function(_id) {
  return Bank.find({_id});
});

Meteor.publish('bank.ids', function(ids) {
  return Bank.find({_id: {$in: ids}});
});

