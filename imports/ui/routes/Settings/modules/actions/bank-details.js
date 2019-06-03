import { Bank } from 'meteor/populous:api';
import { toastr } from 'react-redux-toastr';

import { SET_CURRENT_USER } from '../../../../wrappers/PrivateApp/modules';
import { requires2FA } from '../../../../components/Requires2FA/modules/actions';
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';

// Updates bank details changes
let updateBankDetails = (bank, updates) => {
  return (dispatch, getState) => {
    bank.callMethod('updateBank', updates, (err, newBank) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your bank details have been updates');
      }
    });
  };
};
updateBankDetails = requires2FA(updateBankDetails);

let addBankDetail = details => {
  return (dispatch, getState) => {
    const bank = new Bank({
      name: details.name,
      country: details.country,
      currency: details.currency,
      sortCode: details.sortCode,
      number: details.number
    });

    bank.callMethod('create', (err, newBank) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your bank details have been saved');
      }
    });
  };
};
addBankDetail = requires2FA(addBankDetail);

let removeBankDetail = bank => {
  return (dispatch, getState) => {
    if (!bank) return;
    const bankName = bank.name;
    bank.callMethod('delete', (err, result) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your bank account "' + bankName + '" has been removed');
      }
    });
  };
};
removeBankDetail = requires2FA(removeBankDetail);
removeBankDetail = requireConfirmation(removeBankDetail, {
  text: 'Are you sure that you are going delete the bank account?'
});

export {
  updateBankDetails,
  addBankDetail,
  removeBankDetail
};
