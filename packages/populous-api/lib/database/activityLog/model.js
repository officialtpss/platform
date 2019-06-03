import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {requestTypes} from 'meteor/populous:constants';

const activityLogCollection = new Mongo.Collection('activity_logs');


const ActivityLog = Class.create({
  name: 'ActivityLog',
  collection: activityLogCollection,

  fields: {
    type: {
      type: String,
    },
    userId: {
      type: String,
      index: 1,
    },
    data: {
      type: Object,
      optional: true,
    },
  },

  behaviors: ['timestamp'],

});

export default ActivityLog;
