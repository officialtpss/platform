import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { statuses } from 'meteor/populous:constants';

import ExchangeRate from "../model";

// Publish all user data
Meteor.publish('exchangeRates', function () {

  if (!Meteor.userId()) {
    return;
  }

  return ExchangeRate.find({});
});

