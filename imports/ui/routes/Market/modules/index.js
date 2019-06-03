export const INVOICE_SET_FILTERS = 'INVOICE_SET_FILTERS';
export const INVOICE_TOGGLE_FILTERS = 'INVOICE_TOGGLE_FILTERS';
export const INVOICE_RESET_FILTERS = 'INVOICE_RESET_FILTERS';
export const INVOICE_SET_QUICK_FILTERS = 'INVOICE_SET_QUICK_FILTERS';
export const INVOICE_SET_PAGE_COUNT = 'INVOICE_SET_PAGE_COUNT';
export const INVOICE_LOAD_MORE_INVOICES = 'INVOICE_LOAD_MORE_INVOICES';
export const INVOICE_LOAD_COMPLETE = 'INVOICE_LOAD_COMPLETE';
export const INVOICE_SET_INVOICES = 'INVOICE_SET_INVOICES';
export const INVOICE_SET_BASE_CURRENCY = 'INVOICE_SET_BASE_CURRENCY';
export const INVOICE_UPDATE_MIN_MAX_RANGE = 'INVOICE_UPDATE_MIN_MAX_RANGE';
export const INVOICE_EXHANGE_PREVIEW = 'INVOICE_EXHANGE_PREVIEW';
export const INVOICE_TOGGLE_PREVIEW_MODE = 'INVOICE_TOGGLE_PREVIEW_MODE';
export const INVOICE_TOGGLE_PREVIEW_MODE_TOOLTIP = 'INVOICE_TOGGLE_PREVIEW_MODE_TOOLTIP';
export const MARKET_SET_SORT_COLUMN = 'MARKET_SET_SORT_COLUMN';
export const MARKET_SET_SORT_ORDER = 'MARKET_SET_SORT_ORDER';
export const MARKET_SET_TEXT_SEARCH = 'MARKET_SET_TEXT_SEARCH';
export const MARKET_INCREMENT_CURRENT_PAGE = 'MARKET_INCREMENT_CURRENT_PAGE';

export const initialFilters = {
  currencies: null,
  salePrice: { min: 0, max: 10000 },
  dueDate: { startDate: null, endDate: null },
  returnPercentage: 'all',
  creationDate: { startDate: null, endDate: null },
  salePriceLimit: { min: 0, max: 10000 },
  sellerCompanyNumber: '',
  invoiceNumber: '',
  country: 'all',
  tradeOnPopulousWorld: true,
  addedByMe: false,
  statuses: {
    auctionPending: true,
    auctionOpen: true,
    repaymentPaid: true,
    auctionClosed: true,
    repaymentPending: true,
    auctionRejected: true,
    defaulted: true,
  },
  keyword: '',
  sortColumn: 'updatedAtDesc',
  sortOrder: true,
};

const initialState = {
  filters: JSON.parse(JSON.stringify(initialFilters)),
  showFilters: false,
  baseCurrency: 'GBP',
  previewMode: false,
  previewModeTooltip: false,
  currentPage: 2,
  exchangePreview:{},
};

const InvoiceMarket = (state = {...initialState}, action) => {
  const { type, payload } = action;

  switch (type) {
    case INVOICE_RESET_FILTERS:
      return {
        ...state,
        filters: JSON.parse(JSON.stringify(initialFilters)),
      };

    case INVOICE_TOGGLE_FILTERS:
      return { ...state, showFilters: !state.showFilters };

    case INVOICE_SET_FILTERS:
      return { ...state, filters: { ...initialFilters, ...payload},
        currentPage: initialState.currentPage,
      };

    case INVOICE_EXHANGE_PREVIEW:
      return {
        ...state,
        exchangePreview:{
          ...state.exchangePreview,
          [payload._id]: !state.exchangePreview[payload._id],
        }
      };

    case INVOICE_SET_BASE_CURRENCY:
      return { ...state, baseCurrency: payload.baseCurrency, previewMode: false };

    case INVOICE_UPDATE_MIN_MAX_RANGE:
      const salePrice = {...state.filters.salePrice};

      if (salePrice.min !== payload.min) {
        salePrice.min = payload.min;
      }

      if (salePrice.max !== payload.max) {
        salePrice.max = payload.max;
      }

      return {...state, filters: {
        ...JSON.parse(JSON.stringify(state.filters)),
        salePriceLimit: {
          ...payload
        },
          salePrice,
      }};

    case MARKET_INCREMENT_CURRENT_PAGE:
      return {...state, currentPage: ++state.currentPage};

    case MARKET_SET_TEXT_SEARCH:
      return {
        ...state,
        filters: {
          ...JSON.parse(JSON.stringify(state.filters)),
          keyword: payload.value,
        },
        currentPage: initialState.currentPage,
      };

    case MARKET_SET_SORT_COLUMN:
      return {
        ...state,
        filters: {
          ...JSON.parse(JSON.stringify(state.filters)),
          sortColumn: payload.value,
        },
        currentPage: initialState.currentPage,
      };

    case MARKET_SET_SORT_ORDER:
      return {
        ...state,
        filters: {
          ...JSON.parse(JSON.stringify(state.filters)),
          sortOrder: payload.value,
        },
        currentPage: initialState.currentPage,
      };

    case INVOICE_TOGGLE_PREVIEW_MODE:
      return { ...state, previewMode: !state.previewMode };

    case INVOICE_TOGGLE_PREVIEW_MODE_TOOLTIP:
      return { ...state, previewModeTooltip: !state.previewModeTooltip };

    default:
      return state;
  }
};


export default InvoiceMarket;
