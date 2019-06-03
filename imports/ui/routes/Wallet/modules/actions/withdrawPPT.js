import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';

let withdrawPPT = ({amount, externalAddressId, wallet}) => {
  return (dispatch) => {
    const formName = 'PPTWithdrawForm';
    wallet.callMethod('withdrawPPT', amount, externalAddressId, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }

      toastr.info('Withdraw PPT request sent');
      dispatch(reset(formName));
    });
  }
};

export default withdrawPPT;
