import { File, User } from 'meteor/populous:api';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';

import savePersonalDetails from './save-personal-details';
import { updateBankDetails, removeBankDetail, addBankDetail } from './bank-details';
import { addWalletAddress, editWalletAddress, removeWalletAddress } from './wallet-external-address';
import saveNewPassword from './save-new-password';
import saveEmail from './save-email';
import saveRecoveryEmail from './saveRecoveryEmail';
import removeNickname from './remove-nickname';
import { ACCOUNTS_USER_SUBSCRIPTION_CHANGED } from '../../../../wrappers/PrivateApp/modules';
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';
import {
	SET_ACTIVE_TAB,
	TOGGLE_GENERAL_EDIT,
  TOGGLE_TIMEZONE_EDIT,
  TOGGLE_EMAIL_EDIT,
	TOGGLE_CHANGE_PASSWORD,
  TOGGLE_BANK_MODAL,
  TOGGLE_BANK_TOOLTIP,
  TOGGLE_ADD_WALLET_ADDRESS,
  TOGGLE_WALLET_ADDRESS_EDIT,
  SELECT_WALLET_ADDRESS,
	SELECT_BANK,
  TOGGLE_RECOVERY_EMAIL,
} from '../';

const setActiveTab = (activeTab) => {
	return {
		type: SET_ACTIVE_TAB,
		payload: activeTab
	};
};

const setProfilePicture = (files) => {
	return (dispatch, getState) => {
    const { app: { currentUser } } = getState();
    if(!files || files.length == 0) {
      toastr.warning('You need to upload the image!');
    } else {
      const upload = File.insert(
        {
          file: files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        },
        false
      ).on('end', (error, fileObj) => {
        if (error) {
          toastr.error('Error', 'File reading failed. Please try again');
        } else {
          currentUser.saveAvatar(fileObj._id, (err, user) => {
            if (err) {
              toastr.error('Error while saving', err.reason);
            } else {
              dispatch({ type: ACCOUNTS_USER_SUBSCRIPTION_CHANGED, payload: [user] });
              toastr.success('Your avatar is updated!');
            }
          });
        }
      }).start();
    }
  };
};

const toggleGeneralEdit = (open) => {
	return {
		type: TOGGLE_GENERAL_EDIT,
		payload: open
	};
};

const toggleTimezoneEdit = (open) => {
  return {
    type: TOGGLE_TIMEZONE_EDIT,
    payload: open
  };
};

const toggleEmailEdit = (open) => {
  return {
    type: TOGGLE_EMAIL_EDIT,
    payload: open
  };
};

const toggleRecoveryEmail = (open) => {
  return {
    type: TOGGLE_RECOVERY_EMAIL,
    payload: open
  };
};

const togglePasswordForm = (open) => {
	return {
		type: TOGGLE_CHANGE_PASSWORD,
		payload: open
	};
};

const toggleBankDetailsModal = (open) => {
	return {
		type: TOGGLE_BANK_MODAL,
		payload: open
	};
};

const toggleBankTooltip = (open) => {
	return {
		type: TOGGLE_BANK_TOOLTIP,
		payload: open
	};
};

const toggleWalletAddressEdit = (open) => {
  return {
    type: TOGGLE_WALLET_ADDRESS_EDIT,
    payload: open
  };
};

const toggleAddWalletAddress = (open) => {
  return {
    type: TOGGLE_ADD_WALLET_ADDRESS,
    payload: open
  };
};

const selectBank = id => {
	return {
		type: SELECT_BANK,
		payload: id
	};
};

const selectExternalAddress = id => {
	return {
		type: SELECT_WALLET_ADDRESS,onReset2FA,
		payload: id
	};
};

let onReset2FA = () => {
  return (dispatch, getState) => {
    dispatch(push('/settings/reset-2-fa'));
  };
};
onReset2FA = requireConfirmation(onReset2FA, {
  text: 'Are you sure that you are going to reset 2-Factor Authentication?'
});

export {
  savePersonalDetails,
  saveNewPassword,
  saveEmail,
  saveRecoveryEmail,
  setActiveTab,
  setProfilePicture,
  toggleGeneralEdit,
  toggleTimezoneEdit,
  toggleEmailEdit,
  togglePasswordForm,
  toggleBankDetailsModal,
  toggleBankTooltip,
  addBankDetail,
  updateBankDetails,
  removeBankDetail,
  selectBank,
  onReset2FA,
  toggleAddWalletAddress,
  toggleWalletAddressEdit,
  removeWalletAddress,
  editWalletAddress,
  selectExternalAddress,
  addWalletAddress,
  removeNickname,
  toggleRecoveryEmail,
};
