import { Meteor } from 'meteor/meteor';
import Notification from '../model';
import checkAuth from "../../helpers/checkAuth";


Meteor.methods({
  'notifications.markAsRead'(){
    const userId = checkAuth();
    const notifications = Notification.find({
      userId,
      isRead: false
    }).fetch();

    if (notifications.length) {
      notifications.forEach((notification)=> {
        notification.isRead = true;
        notification.save();
      });
    }
  }
});
