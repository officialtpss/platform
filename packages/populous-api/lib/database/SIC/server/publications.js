import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { statuses } from 'meteor/populous:constants';

import SIC from "../model";

// Publish all user data
Meteor.publish('SIC', function () {
  return SIC.find({});
});
