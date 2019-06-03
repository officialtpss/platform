import UserSubscription from "../model";
import {populousEvents,userSubscriptionTypes} from 'meteor/populous:constants';


UserSubscription.extend({
  meteorMethods: {
  }
});

/**
 *  Migration from first version to second
 *  Renamed `eventType` field to `type`
 */

UserSubscription.update({
    eventType: populousEvents.auctionOpenForNewInvoices,
    type: {$exists: false}
  },
  {
    $set: {type: userSubscriptionTypes.borrower}
  },
  {
    multi: true
  });
