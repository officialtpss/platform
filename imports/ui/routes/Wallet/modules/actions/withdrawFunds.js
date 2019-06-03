import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { Wallet } from 'meteor/populous:api';


let withdrawFunds = ({wallet, currency, bankId, amount}) => {
  return (dispatch) => {
    const formName = 'BankAccountForm';

    (wallet || new Wallet()).callMethod('withdrawBankAccount', currency, bankId, amount, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch(reset(formName));
      toastr.success('Withdraw notification sent. Please allow up to 24 hours for us to process your request.');
    })
  }
};

export default withdrawFunds;
