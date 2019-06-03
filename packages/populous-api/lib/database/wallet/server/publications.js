import { Meteor } from 'meteor/meteor';
import Wallet from "../model";


Meteor.publish('wallet.all', function () {
  return Wallet.find({});
});
