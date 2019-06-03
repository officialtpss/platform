import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const notifications = new Mongo.Collection('notifications');


const Notification = Class.create({
  name: 'Notification',
  collection: notifications,

  fields: {
    type: {
      type: String,
    },
    userId: {
      type: String,
    },
    dataId: {
      type: String,
    },
    message: {
      type: String,
    },
    isRead:{
      type: Boolean,
      default: false,
    }
  },

  behaviors: ['timestamp'],

});

export default Notification;
