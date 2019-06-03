import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { ACCOUNTS_USER_SUB, USER_LOGOUT } from '../';
import { stopSubscription } from 'meteor-redux-middlewares';

const logout = () => {
  return dispatch =>
    Meteor.logout(err => {
      if (err) {
        toastr.error('Error logging out', err.reason);
      } else {
        dispatch(stopSubscription(ACCOUNTS_USER_SUB));
        dispatch({type: USER_LOGOUT});
        dispatch(push('/login'));
      }
    });
};

export default logout;
