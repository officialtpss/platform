import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Notification } from 'meteor/populous:api';
import Navigation from '../components/Navigation';


const reduxData = connect(
  state => ({ ...state.app}),
  dispatch => ({})
);

const meteorData = withTracker(({}) => {
  const userId = Meteor.userId();
  const notificationsSubscription = Meteor.subscribe('notifications.userId', userId);

  let isUnreadNotifications = false, notifications = [];

  if (notificationsSubscription.ready()) {
    notifications = Notification.find({userId}, {sort: {createdAt: -1}}).fetch();
    isUnreadNotifications = !!notifications.filter((item) => !item.isRead).length;
  }

  return {
    loading: !notificationsSubscription.ready(),
    notifications,
    isUnreadNotifications
  };
});

// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(Navigation);
