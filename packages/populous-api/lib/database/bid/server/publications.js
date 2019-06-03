import { publishComposite } from 'meteor/reywood:publish-composite';
import Bid from '../model';

// Publish the data
Meteor.publish('bids', function() {
  return Bid.find({});
});