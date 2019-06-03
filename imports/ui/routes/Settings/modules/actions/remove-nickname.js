import { Bank } from 'meteor/populous:api';
import { toastr } from 'react-redux-toastr';

import { SET_CURRENT_USER, ACCOUNTS_USER_SUBSCRIPTION_CHANGED } from '../../../../wrappers/PrivateApp/modules';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';

let removeNickname = () => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;

    currentUser.removeNickname(function(err, user) {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        dispatch({ type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user] });
        toastr.success('Success', 'Your nickname has been deleted');
      }
    });
  };
};
removeNickname = requires2FA(removeNickname);
removeNickname = requireConfirmation(removeNickname, {
  text: 'Are you sure that you are going to delete the nickname?'
});

export default removeNickname;
