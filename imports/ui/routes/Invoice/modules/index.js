import {invoiceDocumentTypes} from 'meteor/populous:constants';

export const BLOCK_BID_FORM     = 'INVOICE/BLOCK_BID_FORM';
export const RESET_INVOICE_DETAIL       = 'INVOICE/RESET_INVOICE_DETAIL';
export const COMPLETE_CONTRACT_DOWNLOAD = 'INVOICE/COMPLETE_CONTRACT_DOWNLOAD';
export const SET_REJECTED_FILE          = 'INVOICE/SET_REJECTED_FILE';
export const SET_CONTRACT_FILE          = 'INVOICE/SET_CONTRACT_FILE';
export const FILE_LOADING               = 'INVOICE/FILE_LOADING';
export const FILE_SAVED                 = 'INVOICE/FILE_SAVED';
export const SET_SAVED_FILE             = 'INVOICE/SET_SAVED_FILE';
export const SET_CURRENT_INVOICE        = 'INVOICE/SET_CURRENT_INVOICE';
export const SET_SUGGESTIONS_COUNT      = 'INVOICE/SET_SUGGESTIONS_COUNT';
export const UPDATE_CURRENT_AMOUNT      = 'INVOICE/UPDATE_CURRENT_AMOUNT';
export const SET_SAVED_FILE_ID          = 'INVOICE/SET_SAVED_FILE_ID';
export const SELECT_DEBTOR              = 'INVOICE/SELECT_DEBTOR';
export const SELECT_SELLER              = 'INVOICE/SELECT_SELLER';
export const REMOVE_FILE                = 'INVOICE/REMOVE_FILE';
export const RESET_FORM_FIELDS          = 'INVOICE/RESET_FORM_FIELDS';

const initialState = {
  showContactDownload: false,
  currentInvoice: null,
  currentAmount: 0,
  suggestionsSellerCount: -1,
  suggestionsDebtorCount: -1,
  selectedDebtor: null,
  selectedSeller: null,
  shouldClearFields: false,
  bidFormBlocked: false,
};
Object.values(invoiceDocumentTypes).forEach((documentType) => {
  initialState[documentType] = {
    rejectedFile: null,
    fileLoading: false,
    downloadedContract: false,
    savedFile: null,
    savedFileId: null,
    customName: '',
  };
});

const invoiceDetail = (state = initialState, action) => {

  const {payload = {}} = action;

  switch (action.type) {
    case SET_CURRENT_INVOICE:
      return { ...state, currentInvoice: action.invoice };
    // contract upload
    case COMPLETE_CONTRACT_DOWNLOAD:
      return { ...state, [action.payload.fileType]: {...state[action.payload.fileType], downloadedContract: true, }};

    case SET_REJECTED_FILE:
      return { ...state, [action.payload.fileType]: {...state[action.payload.fileType], rejectedFile: action.payload.file, } };

    case FILE_LOADING:
      return { ...state, [action.payload.fileType]: {...state[action.payload.fileType], fileLoading: action.payload.loading,  } };

    case SET_SAVED_FILE:
      return { ...state, [action.payload.fileType]: {...state[action.payload.fileType], savedFile: action.payload.file ,  }};

    case SET_SAVED_FILE_ID:
      return { ...state, [action.payload.fileType]: {...state[action.payload.fileType], savedFileId: action.payload.fileId ,  }};

    case REMOVE_FILE:
      return { ...state, [action.payload.fileType]: { ...initialState[action.payload.fileType], downloadedContract: true } };

    case BLOCK_BID_FORM:
      return {...state, bidFormBlocked: payload};

    //-------------

    case SET_SUGGESTIONS_COUNT:
      if (action.isSeller) {
        return {
          ...state,
          suggestionsSellerCount: action.count
        };
      } else {
        return {
          ...state,
          suggestionsDebtorCount: action.count
        };
      }

    case UPDATE_CURRENT_AMOUNT:
      return { ...state, currentAmount: action.amount };
    case RESET_INVOICE_DETAIL:
      return initialState;
    case SELECT_DEBTOR:
      return { ...state, selectedDebtor: action.debtor };

    case SELECT_SELLER:
      return { ...state, selectedSeller: action.seller };
    case RESET_FORM_FIELDS:
      return { ...state, shouldClearFields: true};

    default:
      return state;
  }
};

export default invoiceDetail;
