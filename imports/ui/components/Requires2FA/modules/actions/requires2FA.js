import { fixtures } from 'meteor/populous:constants';

import {
  SHOW_2FA_CHECKER,
  RESET_2FA_CHECKER
} from '../';

const requires2FA = (child, onCancel, data) => {
  return (...args) => {
    return (dispatch, getState) => {

      const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);

      const dispatchChild = () => {
        if (typeof child === 'function') {
          dispatch(child(...args));
        } else {
          dispatch(child);
        }
      };
      const {app: {currentUser}} = getState();

      if (currentUser && defaultUsersEmails.includes(currentUser.emailAddress())) {
        dispatchChild();
        return;
      }

      dispatch({
        type: SHOW_2FA_CHECKER,
        args, // set args incase we need them
        data: data,
        onSuccess: () => {

          // Run the child thunk
          // (it might be an action creator or a action)
          dispatchChild();
          dispatch({ type: RESET_2FA_CHECKER });
        },
        onCancel: () => {

          // Call the provided onCancel function if it exists
          onCancel && onCancel();
          dispatch({ type: RESET_2FA_CHECKER });
        },
      });
    }
  }
};

export default requires2FA;
