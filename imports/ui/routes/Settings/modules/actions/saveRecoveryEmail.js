import { toastr } from 'react-redux-toastr';
import { User } from 'meteor/populous:api';
import { stopSubscription } from 'meteor-redux-middlewares';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';

const saveRecoveryEmail = email => {
  return (dispatch, getState) => {
    const { currentUser } = getState().app;
    currentUser.updateUserRecoveryEmail(email, (err, user) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your recovery email has been updated');
      }
    });
  };
};

export default requires2FA(saveRecoveryEmail);
