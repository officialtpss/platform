export const UPDATE_CREATING_ADDRESS = 'WALLET/UPDATE_CREATING_ADDRESS';
export const GET_CURRENCY_BALANCE = 'WALLET/GET_CURRENCY_BALANCE';
export const GET_BALANCE_ERROR = 'WALLET/GET_BALANCE_ERROR';
export const CONVERSION_TO_ETH = 'CONVERSION_TO_ETH';
export const UPDATE_TRANSACTION_HISTORY_FILTERS = 'UPDATE_TRANSACTION_HISTORY_FILTERS';
export const RESET_TRANSACTION_HISTORY_FILTERS = 'RESET_TRANSACTION_HISTORY_FILTERS';
export const SET_TRANSACTIONS_CURRENT_PAGE = 'SET_TRANSACTIONS_CURRENT_PAGE';
export const SET_MAXIMUM_COLLATERAL_RETURN_AMOUNT = 'SET_MAXIMUM_COLLATERAL_RETURN_AMOUNT';

const initialState = {
  currenciesBalance: null,
  lastRates: [],
  currentPage: 1,
  balanceError: false,
  filters: {
    search: null,
    startDate: null,
    endDate: null,
    selectedWallet: null,
    transactionType: null,
  },
  maximumCollateralAmount: undefined,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {

    case GET_BALANCE_ERROR:
      return { ...state,
        balanceError: action.payload.balanceError
      }

    case GET_CURRENCY_BALANCE:
      return { ...state,
        currenciesBalance: action.payload.balance
      };

    case UPDATE_TRANSACTION_HISTORY_FILTERS:
      return { ...state, currentPage: 1, ledgerLogsList: [],
        filters: {...state.filters, ...action.payload.filters}
      };

    case RESET_TRANSACTION_HISTORY_FILTERS:
      return {...state, currentPage: 1, filters: {...initialState.filters}, ledgerLogsList: []};

    case SET_TRANSACTIONS_CURRENT_PAGE:
      return {...state, ...action.payload};

    case SET_MAXIMUM_COLLATERAL_RETURN_AMOUNT:
      return {...state, maximumCollateralReturnAmount: action.payload.maximumCollateralReturnAmount };

    return;

    default:
      return state;
  }
};

export default wallet;
