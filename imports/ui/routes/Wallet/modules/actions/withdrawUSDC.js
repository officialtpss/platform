import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';

let withdrawUSDC = ({ externalAddressId, amount, wallet, tokenId = 1 }) => {
  return (dispatch) => {
    const formName = 'ExternalForm';

    wallet.callMethod('withdrawUSDC', amount, externalAddressId, tokenId, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch(reset(formName));

      toastr.info('USDC withdraw request has been sent');
    });
  }
};

export default withdrawUSDC;
