import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import Maintenance from "../model";


Meteor.publish('maintenance', function () {
  const nowDate = moment().utc().toDate();

  return Maintenance.find({
    startAt: { $lte: nowDate },
    endAt: { $gte: nowDate },
    isCompleted: false,
  });
});

Meteor.publish('maintenance.completed', function () {
  return Maintenance.find({ isCompleted: true });
});

Meteor.publish('maintenance.closest', function () {
  return Maintenance.find({ isCompleted: false }, {limit: 1, sort:{startAt:1}});
});