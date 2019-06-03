import { Accounts } from 'meteor/accounts-base';
import { toastr } from 'react-redux-toastr';

import { requires2FA } from '../../../../components/Requires2FA/modules/actions';

// This thunk saves the users new password
const saveNewPassword = (oldPassword, newPassword) => {
  return () => {
    Accounts.changePassword(
      oldPassword,
      newPassword,
      err => {
        if (err) {
          toastr.error('Error', err.reason);
        } else {

          // TODO: Reset form fields
          toastr.success('Success', 'Your password has been changed');
        }
      }
    );

  };
};

export default requires2FA(saveNewPassword);
