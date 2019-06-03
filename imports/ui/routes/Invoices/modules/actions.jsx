import {
  INVOICES_TOGGLE_FILTERS,
  INVOICES_UPDATE_FILTERS,
  INVOICES_RESET_FILTERS,
  INVOICES_UPDATE_QUICK_FILTERS,
  INVOICES_UPDATE_MIN_MAX_RANGE,
  INVOICES_UPDATE_SALE_PRICE,
} from './index';

const toggleFilters = () => {
  return {
    type: INVOICES_TOGGLE_FILTERS
  };
};

const updateFilters = (filters) => {
  return {
    type: INVOICES_UPDATE_FILTERS,
    payload: filters
  };
};

const searchInvoice = (filters) => {
  return (dispatch) => {
    dispatch(toggleFilters());
    dispatch(updateFilters(filters));
  };
};

const resetFilters = () => {
  return {
    type: INVOICES_RESET_FILTERS
  };
};

const updateQuickFilters = (filters) => {
  return {
    type: INVOICES_UPDATE_QUICK_FILTERS,
    payload: filters
  };
};

const updateSalePriceMinMaxRange = (newMin, newMax) => {
  let min = newMin;
  let max = newMax;
  if (min >= max) {
    min = newMax - 1;
    max = newMin + 1;
  }
  return {
    type: INVOICES_UPDATE_MIN_MAX_RANGE,
    payload: {
      min,
      max
    }
  };
}

const updateSalePriceMinMax = (min, max) => {
  return {
    type: INVOICES_UPDATE_SALE_PRICE,
    payload: {
      min,
      max
    }
  };
}

export {
  toggleFilters,
  updateFilters,
  searchInvoice,
  resetFilters,
  updateQuickFilters,
  updateSalePriceMinMaxRange,
  updateSalePriceMinMax,
};
