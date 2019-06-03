import {invoiceStatuses} from "meteor/populous:constants";

export const INVOICES_TOGGLE_FILTERS = 'INVOICES_TOGGLE_FILTERS';
export const INVOICES_UPDATE_FILTERS = 'INVOICES_UPDATE_FILTERS';
export const INVOICES_RESET_FILTERS = 'INVOICES_RESET_FILTERS';
export const INVOICES_UPDATE_QUICK_FILTERS = 'INVOICES_UPDATE_QUICK_FILTERS';
export const INVOICES_UPDATE_MIN_MAX_RANGE = 'INVOICES_UPDATE_MIN_MAX_RANGE';
export const INVOICES_UPDATE_SALE_PRICE = 'INVOICES_UPDATE_SALE_PRICE';

const initialState = {
  filters: {
    currencies: null,
    salePrice: { min:-1, max: -1 },
    salePriceLimit: { min: -1, max: 1 },
    dueDate: { startDate: null, endDate: null },
    statuses: {
      awaitingContract: true,
      auctionOpen: true,
      repaymentPaid: true,
      auctionClosed: true,
      repaymentPending: true,
      auctionRejected: true,
      auctionPending: true,
      auctionFailed: true,
      externalTrade: true,
    }
  },
  showFilters: false,
  quickFilters: {
    keyword: '',
    sortBy: 'updatedAtDesc',
    sortOrder: true,
  }
};

const invoices = (state = { ...initialState }, action) => {
  switch(action.type) {
    case INVOICES_TOGGLE_FILTERS:
      return { ...state, showFilters: !state.showFilters };

    case INVOICES_UPDATE_FILTERS:
      return { ...state, filters: { ...action.payload } };

    case INVOICES_RESET_FILTERS:
      return { ...initialState };

    case INVOICES_UPDATE_QUICK_FILTERS:
      return { ...state, quickFilters: action.payload };

    case INVOICES_UPDATE_MIN_MAX_RANGE:
      return {
        ...state,
        filters: {
          ...JSON.parse(JSON.stringify(state.filters)),
          salePriceLimit: { ...action.payload },
        },
      };

    case INVOICES_UPDATE_SALE_PRICE:
      return {
        ...state,
        filters: {
          ...JSON.parse(JSON.stringify(state.filters)),
          salePrice: { ...action.payload },
        },
      };

    default:
      return state;
  }
}

export default invoices;
