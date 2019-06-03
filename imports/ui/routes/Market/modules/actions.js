import { Meteor } from 'meteor/meteor';
import { toastr } from 'react-redux-toastr';

import {
  INVOICE_RESET_FILTERS,
  INVOICE_SET_FILTERS,
  INVOICE_TOGGLE_FILTERS,
  INVOICE_SET_QUICK_FILTERS,
  INVOICE_SET_PAGE_COUNT,
  INVOICE_LOAD_MORE_INVOICES,
  INVOICE_SET_INVOICES,
  INVOICE_LOAD_COMPLETE,
  INVOICE_SET_BASE_CURRENCY,
  INVOICE_UPDATE_MIN_MAX_RANGE,
  INVOICE_UPDATE_SALE_PRICE,
  INVOICE_EXHANGE_PREVIEW,
  INVOICE_TOGGLE_PREVIEW_MODE,
  INVOICE_TOGGLE_PREVIEW_MODE_TOOLTIP,
  initialFilters, MARKET_SET_SORT_COLUMN, MARKET_SET_SORT_ORDER, MARKET_SET_TEXT_SEARCH, MARKET_INCREMENT_CURRENT_PAGE
} from './index';

export function toggleFilters() {
  return {
    type: INVOICE_TOGGLE_FILTERS
  };
}

export function setFilters(filters) {
  return {
    type: INVOICE_SET_FILTERS,
    payload: filters
  };
}

export function saveFilters(filters) {
  return (dispatch, getState) => {
    const {currentUser} = getState().app;
    const {previewMode} = getState().invoiceMarket;
    filters.previewMode = previewMode;
    currentUser.callMethod('saveFilters', 'marketFilter', filters, (error) => {
      if (error) {
        return toastr.error(error.reason);
      }
    });
  }
}

export function resetFilters() {
  return {type: INVOICE_RESET_FILTERS};
}

export function incrementCurrentPage() {
  return {
    type: MARKET_INCREMENT_CURRENT_PAGE,
  };
}

export function setBaseCurrency(baseCurrency) {
  return {
    type: INVOICE_SET_BASE_CURRENCY,
    payload: {
      baseCurrency,
    }
  };
}

export function updateSalePriceMinMaxRange(newMin, newMax) {
  return {
    type: INVOICE_UPDATE_MIN_MAX_RANGE,
    payload: {
      min: newMin,
      max: newMax
    }
  };
}

export function previewExhanceForInvoice(_id) {
  return {
    type: INVOICE_EXHANGE_PREVIEW,
    payload: {
      _id
    }
  };
}

export function togglePreviewMode() {
  return {
    type: INVOICE_TOGGLE_PREVIEW_MODE
  };
};

export function togglePreviewModeTooltip() {
  return {
    type: INVOICE_TOGGLE_PREVIEW_MODE_TOOLTIP
  };
};

export function setTextSearch(text){
  return {
    type: MARKET_SET_TEXT_SEARCH,
    payload:{
      value: text,
    }
  }
}

export function setSortColumn(sortColumn){
  return {
    type: MARKET_SET_SORT_COLUMN,
    payload:{
      value: sortColumn,
    }
  }
}

export function setSortOrder(sortOrder){
  return {
    type: MARKET_SET_SORT_ORDER,
    payload:{
      value: sortOrder,
    }
  }
}

export default {
  toggleFilters,
  saveFilters,
  setFilters,
  resetFilters,
  setBaseCurrency,
  updateSalePriceMinMaxRange,
  previewExhanceForInvoice,
  togglePreviewMode,
  togglePreviewModeTooltip,
};
