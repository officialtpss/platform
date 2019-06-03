import { Meteor } from 'meteor/meteor';
import Notification from '../model';


Meteor.publish('notifications.all', function() {
  return Notification.find({});
});

Meteor.publish('notifications.userId', function(userId) {
  return Notification.find({userId});
});
