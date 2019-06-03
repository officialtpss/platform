import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {platformActionTypes, platformActionStatuses} from 'meteor/populous:constants';

const platformActionsCollection = new Mongo.Collection('platform_actions');

const PlatformAction = Class.create({
  name: 'PlatformAction',
  collection: platformActionsCollection,
  fields:{

    type: {
      type: String,

      validators: [
        {
          type: 'choice',
          param: Object.values(platformActionTypes)
        }
      ]
    },

    status: {
      type: String,
      default: platformActionStatuses.new,
      validators: [
        {
          type: 'choice',
          param: Object.values(platformActionStatuses)
        }
      ]
    },

    error: {
      type: String,
      optional:true,
    },

    /**
     * Type: Start Auction
     * {
     *    adminId,
     *    invoiceId
     * }
     *
     * Type: PPT to GBPp
     * {
     *    userId,
     *    PPTGive,
     *    GBPpGet
     * }
     *
     * Type: GBPp to PPT
     * {
     *    depositLogId
     * }
     */

    data:{
      type: Object,
      optional:true,
    }
  },
  behaviors: ['timestamp'],
});

export default PlatformAction;
