import {invoiceDocumentTypes} from 'meteor/populous:constants';
import {formatDebtor} from "../../../form-helpers/valueFormatters";

export const SET_CURRENT_INVOICE = 'ADD_INVOICE/SET_CURRENT_INVOICE';
export const SET_REJECTED_FILE = 'ADD_INVOICE/SET_REJECTED_FILE';
export const FILE_LOADING = 'ADD_INVOICE/FILE_LOADING';
export const SET_SAVED_FILE = 'ADD_INVOICE/SET_SAVED_FILE';
export const SET_SAVED_FILE_ID = 'ADD_INVOICE/SET_SAVED_FILE_ID';
export const UPDATE_CURRENT_AMOUNT = 'ADD_INVOICE/UPDATE_CURRENT_AMOUNT';
export const RESET_ADD_INVOICE = 'ADD_INVOICE/RESET_ADD_INVOICE';
export const COMPLETE_CONTRACT_DOWNLOAD = 'ADD_CONTRACT/COMPLETE_CONTRACT_DOWNLOAD';
export const SET_SUGGESTIONS_COUNT = 'ADD_INVOICE/SET_SUGGESTIONS_COUNT';
export const SELECT_DEBTOR = 'ADD_INVOICE/SELECT_DEBTOR';
export const SELECTED_DEBTOR_CLEARED = 'SELECTED_DEBTOR_CLEARED';
export const REMOVE_FILE = 'ADD_INVOICE/REMOVE_FILE';
export const RESET_FORM_FIELDS = 'ADD_INVOICE/RESET_FORM_FIELDS';


const initialState = {
  showContactDownload: false,
  currentInvoice: null,
  currentAmount: 0,
  suggestionsDebtorCount: -1,
  selectedDebtor: null,
  clearSelectedDebtor: false,
  shouldClearFields: false,
  initialValues: {},
};

Object.values(invoiceDocumentTypes).forEach((documentType) => {
  initialState[documentType] = {
    rejectedFile: null,
    fileLoading: false,
    downloadedContract: false,
    savedFile: null,
    savedFileId: null,
  };
});

const addInvoice = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_AMOUNT:
      return { ...state, currentAmount: action.amount };

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

    //-------------

    case RESET_ADD_INVOICE:
      const newState = {
        ...initialState,
        clearSelectedDebtor: true,
      };

      if (action.payload) {
        if (Object.keys(state.initialValues).length) {
          newState.initialValues = state.initialValues;
          newState[invoiceDocumentTypes.invoice] = state[invoiceDocumentTypes.invoice];
          newState.selectedDebtor = state.selectedDebtor;
        }

        if (state.currentInvoice) {
          const currentInvoice = {...state.currentInvoice};

          newState.initialValues = {
            Amount: currentInvoice.amount,
            DebtorName: formatDebtor(state.selectedDebtor),
            DueDate: currentInvoice.dueDate.toISOString(),
            Invoicenumber: currentInvoice.invoiceNumber,
            SaleGoal: currentInvoice.salePrice,
            currencies: currentInvoice.currency,
          };
          newState[invoiceDocumentTypes.invoice] = state[invoiceDocumentTypes.invoice];
          newState.selectedDebtor = state.selectedDebtor;
        }
      }

      return newState;

    case SELECTED_DEBTOR_CLEARED:
      return { ...state, clearSelectedDebtor: false };

    case SET_SUGGESTIONS_COUNT:
      return { ...state, suggestionsDebtorCount: action.count };

    case SELECT_DEBTOR:
      return { ...state, selectedDebtor: action.debtor };

    case RESET_FORM_FIELDS:
      return { ...state, shouldClearFields: true};

    default:
      return state;
  }
};

export default addInvoice;
