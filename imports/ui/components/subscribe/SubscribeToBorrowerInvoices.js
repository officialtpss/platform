import React from 'react';
import {Meteor} from 'meteor/meteor';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {UserSubscription,} from 'meteor/populous:api';
import {userSubscriptionTypes,} from 'meteor/populous:constants';
import {withTracker} from 'meteor/react-meteor-data';
import { toastr } from 'react-redux-toastr';

import {LinkText, Small} from "../styled-components/Typography";



const SubscribeToBorrowerInvoices = ({currentUser, isSubscribed, borrowerId}) => {
  const toggleSubscription = () => {
      currentUser.callMethod('toggleSubscription',
        userSubscriptionTypes.borrower, {borrowerId}, isSubscribed,
        (error) => {
          if (error) {
            toastr.error('Error', error.reason);
          }
        }
      );
  };

  return (
    isSubscribed
      ? <Small>
        Subscribed for new invoices <LinkText inline onClick={toggleSubscription}>
        <Small inheritColor inline>
          Unsubscribe
        </Small>
      </LinkText>
      </Small>
      : <LinkText onClick={toggleSubscription}>
        Subscribe for new invoices
      </LinkText>
  );
};

export default compose(
  connect(
    ({app}) => ({currentUser: app.currentUser})
  ),
  withTracker(({borrowerId, currentUser: {_id: userId}}) => {
    const subscriptionHandler = Meteor.subscribe('UserSubscription.forUser', userId, userSubscriptionTypes.borrower);
    let isSubscribed = true;

    if (subscriptionHandler.ready()) {
      isSubscribed =!!UserSubscription.findOne({
          userId,
          type: userSubscriptionTypes.borrower,
          'data.borrowerId': borrowerId,
        });
    }

    return {isSubscribed};
  })
)(SubscribeToBorrowerInvoices);
