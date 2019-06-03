export const SET_ACTIVE_TAB = 'activeTab';
export const SET_BANK = 'selectedBank';
export const SELECT_BANK = 'selectedBankId';
export const SELECT_WALLET_ADDRESS = 'selectedExternalAddressId';
export const TOGGLE_GENERAL_EDIT = 'showGeneralEdit';
export const TOGGLE_TIMEZONE_EDIT = 'showTimezoneEdit';
export const TOGGLE_EMAIL_EDIT = 'showEmailEdit';
export const TOGGLE_CHANGE_PASSWORD = 'showChangePassword';
export const TOGGLE_BANK_MODAL = 'showBankModal';
export const TOGGLE_BANK_TOOLTIP = 'showBankTooltip';
export const TOGGLE_WALLET_ADDRESS_EDIT = 'showWalletAddressEdit';
export const TOGGLE_ADD_WALLET_ADDRESS = 'showAddWalletAddress';
export const TOGGLE_RECOVERY_EMAIL = 'showRecoveryEmail';

export const TAB_GENERAL_SETTING = 'TAB_GENERAL_SETTING';
export const TAB_CUSTOMER_PROFILE = 'TAB_CUSTOMER_PROFILE';
export const TAB_BANK_DETAIL = 'TAB_BANK_DETAIL';
export const TAB_EXTERNAL_WALLETS = 'TAB_EXTERNAL_WALLETS';
export const TAB_DEBTORS = 'TAB_DEBTORS';
export const TAB_AUCTIONS = 'TAB_AUCTIONS';
export const SHOW_2FA_CHECKER = 'REQUIRES_2FA/SHOW_2FA_CHECKER';

const initialState = {
  activeTab: TAB_GENERAL_SETTING,
  showGeneralEdit: false,
  showEmailEdit: false,
  showRecoveryEmail: false,
  showChangePassword: false,
  selectedBank: null,
  selectedBankId: 0,
  showBankModal: 0,
  showBankTooltip: false,
  showWalletAddressEdit: false,
  showAddWalletAddress: false,
  selectedExternalAddressId: null,
};

const profileSettings = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case TOGGLE_BANK_TOOLTIP:
      return {
        ...state,
        [type]: !payload
      };
    case SET_ACTIVE_TAB:
    case SELECT_BANK:
    case SET_BANK:
    case SELECT_WALLET_ADDRESS:
    case TOGGLE_GENERAL_EDIT:
    case TOGGLE_TIMEZONE_EDIT:
    case TOGGLE_EMAIL_EDIT:
    case TOGGLE_CHANGE_PASSWORD:
    case TOGGLE_BANK_MODAL:
    case TOGGLE_WALLET_ADDRESS_EDIT:
    case TOGGLE_ADD_WALLET_ADDRESS:
    case TOGGLE_RECOVERY_EMAIL:
      return {
        ...state,
        [type]: payload
      };
    case SHOW_2FA_CHECKER:
      return {
        ...state,
        type: TOGGLE_ADD_WALLET_ADDRESS,
      };
    default:
      return state;
  }
};

export default profileSettings;
