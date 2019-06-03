import { Meteor } from 'meteor/meteor';
import GoldExchange from '../model';


Meteor.publish('goldExchange.all', function() {
  return GoldExchange.find();
});
