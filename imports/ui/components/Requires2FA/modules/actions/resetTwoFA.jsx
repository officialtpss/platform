import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';
import { HIDE_2FA_CHECKER } from '../index';

const resetTwoFA = (user, data) => {
  return dispatch => {
    dispatch({ type: HIDE_2FA_CHECKER });
    if (data && data.type === 'login') {
      dispatch(push('/reset-2-fa', { user }));
    }
    else {
      dispatch(push('/settings/reset-2-fa', { user }));
    }
  };
};

export default resetTwoFA;
