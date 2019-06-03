import {Meteor} from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';
import { ExternalAddress } from 'meteor/populous:api';
import CreateKeccakHash  from 'keccak';

import { requires2FA } from '../../../../components/Requires2FA/modules/actions';
import { toggleWalletAddressEdit, toggleAddWalletAddress } from '../../modules/actions';

function validateToChecksum (newAddress) {
  let address = newAddress.toLowerCase().replace('0x', '');
  let hash = CreateKeccakHash('keccak256').update(address).digest('hex');
  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  const regex = /^0x[a-fA-F0-9]{40}$/;

  if (!regex.test(newAddress)) {
    return false;
  }

  return newAddress === ret;
}

let addWalletAddress = (address, name) => {
  return (dispatch) => {
    if (!address) {
      return toastr.error('Error', 'Wallet address is required');
    }

    if (!name) {
      return toastr.error('Error', 'Wallet name is required');
    }

    if (!validateToChecksum(address)) {
      return toastr.error('Error', 'Wallet address is not valid');
    }

    new ExternalAddress().callMethod('addAddress', address, name, (err, result) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        dispatch(toggleAddWalletAddress(false));
        toastr.success('Success', 'Your wallet address has been added');
      }
    });
  };
};

addWalletAddress = requires2FA(addWalletAddress);

let editWalletAddress = (externalAddress, newAddress, newName) => {
  return (dispatch) => {
    if (!externalAddress) {
      return;
    }

    if (!newAddress) {
      return toastr.error('Error', 'Wallet address is required');
    }

    if (!newName) {
      return toastr.error('Error', 'Wallet name is required');
    }

    if (!validateToChecksum(newAddress)) {
      return toastr.error('Error', 'Wallet address is not valid');
    }

    externalAddress.callMethod('editAddress', newAddress, newName, (err, result) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        dispatch(toggleWalletAddressEdit(false));
        toastr.success('Success', 'Your wallet address has been changed');
      }
    });
  };
};

editWalletAddress = requires2FA(editWalletAddress);

let removeWalletAddress = externalAddress => {
  return (dispatch) => {
    if (!externalAddress) {
      return;
    }

    externalAddress.callMethod('removeAddress', (err, result) => {
      if (err) {
        toastr.error('Error', err.reason);
      } else {
        toastr.success('Success', 'Your wallet address has been removed');
      }
    });
  };
};

removeWalletAddress = requires2FA(removeWalletAddress);

export {
  addWalletAddress,
  editWalletAddress,
  removeWalletAddress
};
