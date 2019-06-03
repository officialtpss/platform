import { publishComposite } from 'meteor/reywood:publish-composite';
import Currency from '../model';



// Publish the data
Meteor.publish('currencies', function() {
  return Currency.find({}, {fields: {ethAddress: 0}});
});