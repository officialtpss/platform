import {Meteor} from 'meteor/meteor';
import ActivityLog from "../model";

Meteor.publish('activityLog.user', (userId) => {
  return ActivityLog.find({userId})
});
