import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';

let withdrawPokensAction = ({externalAddressId, amount, currency, wallet, withdrawCurrency}) => {
  return (dispatch, getState) => {
    const formName = 'ExternalForm';

    wallet.callMethod('withdrawPokens', currency, amount, externalAddressId, withdrawCurrency, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch(reset(formName));

      toastr.info('Poken withdraw request has been sent');
    });
  }
};

export default withdrawPokensAction;
