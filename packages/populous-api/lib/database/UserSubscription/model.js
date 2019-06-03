import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {populousEvents,userSubscriptionTypes} from 'meteor/populous:constants';


/**
 * Should be using independent from events
 * @type {Mongo.Collection}
 */

const UserSubscriptionCollection = new Mongo.Collection('user_subscriptions');

const UserSubscription = Class.create({
  name: 'UserSubscription',
  collection: UserSubscriptionCollection,
  fields: {
    userId: {
      type: String,
    },
    /**
     * Deprecated and should be removed in the future
     */

    eventType: {
      type: String,
      validation: [
        {
          type: 'choice',
          param: Object.values(populousEvents),
        }
      ],
      optional: true,
    },
    type: {
      type: String,
      validation: [
        {
          type: 'choice',
          param: Object.values(userSubscriptionTypes),
        }
      ]
    },

    data: {
      type: Object,
      optional: true,
    },
  },
  behaviors: ['timestamp'],
});

export default UserSubscription;
