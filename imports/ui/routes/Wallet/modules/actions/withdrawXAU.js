import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';

let withdrawXAUp = ({ externalAddressId, series, amount, wallet, tokenId = 1 }) => {
  return (dispatch) => {
    const formName = 'ExternalForm';

    wallet.callMethod('withdrawXAU', amount, series, externalAddressId, tokenId, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch(reset(formName));

      toastr.info('XAUp withdraw request has been sent');
    });
  }
};

export default withdrawXAUp;
