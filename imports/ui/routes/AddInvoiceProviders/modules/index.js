import {invoiceDocumentTypes} from 'meteor/populous:constants';
import {formatDebtor} from "../../../form-helpers/valueFormatters";

export const SET_CURRENT_INVOICE = 'ADD_INVOICE_PROVIDER/SET_CURRENT_INVOICE';
export const SET_REJECTED_FILE = 'ADD_INVOICE_PROVIDER/SET_REJECTED_FILE';
export const FILE_LOADING = 'ADD_INVOICE_PROVIDER/FILE_LOADING';
export const SET_SAVED_FILE = 'ADD_INVOICE_PROVIDER/SET_SAVED_FILE';
export const SET_SAVED_FILE_ID = 'ADD_INVOICE_PROVIDER/SET_SAVED_FILE_ID';
export const RESET_ADD_INVOICE = 'ADD_INVOICE_PROVIDER/RESET_ADD_INVOICE_PROVIDER';
export const SET_SUGGESTIONS_COUNT = 'ADD_INVOICE_PROVIDER/SET_SUGGESTIONS_COUNT';
export const SELECT_DEBTOR = 'ADD_INVOICE_PROVIDER/SELECT_DEBTOR';
export const SELECT_SELLER = 'ADD_INVOICE_PROVIDER/SELECT_SELLER';
export const REMOVE_FILE = 'ADD_INVOICE_PROVIDER/REMOVE_FILE';


const initialState = {
  showContactDownload: false,
  currentInvoice: null,
  suggestionsSellerCount: -1,
  suggestionsDebtorCount: -1,
  selectedSeller: null,
  selectedDebtor: null,
  initialValues: {},
};

Object.values(invoiceDocumentTypes).forEach((documentType) => {
  initialState[documentType] = {
    rejectedFile: null,
    fileLoading: false,
    downloadedContract: true,
    savedFile: null,
    savedFileId: null,
    customName: '',
  };
});

const addInvoiceProviders = (state = initialState, action) => {
  switch (action.type) {

    case SET_CURRENT_INVOICE:
      return { ...state, currentInvoice: action.invoice };

      // contract upload
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
      };

      if (action.payload && state.currentInvoice) {
        const currentInvoice = {...state.currentInvoice};

        newState.initialValues = {
          Amount: currentInvoice.amount,
          DebtorName: formatDebtor(state.selectedDebtor),
          SellerName: formatDebtor(state.selectedSeller),
          DueDate: currentInvoice.dueDate.toISOString(),
          Invoicenumber: currentInvoice.invoiceNumber,
          SaleGoal: currentInvoice.salePrice,
          currencies: currentInvoice.currency,
          providerFee: currentInvoice.providerFeeAmount,
        };

        newState[invoiceDocumentTypes.invoice] = state[invoiceDocumentTypes.invoice];
        newState.selectedDebtor = state.selectedDebtor;
        newState.selectedSeller = state.selectedSeller;
      }

      return newState;

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

    case SELECT_DEBTOR:
      return { ...state, selectedDebtor: action.debtor };

    case SELECT_SELLER:
      return { ...state, selectedSeller: action.seller };


    default:
      return state;
  }
};

export default addInvoiceProviders;
