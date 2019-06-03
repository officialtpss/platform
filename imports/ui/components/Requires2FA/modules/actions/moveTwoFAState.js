import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { User } from 'meteor/populous:api';

const moveTwoFAState = token => {
  return dispatch => {
    new User().callMethod('checkTwoFAToken', token, (err) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        Meteor.logout();
        dispatch(push('/'));
      }
    });
  };
};

export default moveTwoFAState;
