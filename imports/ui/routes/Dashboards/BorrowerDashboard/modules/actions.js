import {
  BORROWER_DASHBOARD_DATE_RANGE, BORROWER_DASHBOARD_DUE_DAYS,
  INVOICE_SET_BORROWER_CURRENCY
} from "./index";

export const selectCurrency = (currency) => {
  return {
    type: INVOICE_SET_BORROWER_CURRENCY,
    payload: currency
  };
};

export const setCashFlowRange = (range) => {
  return {
    type: BORROWER_DASHBOARD_DATE_RANGE,
    payload: range
  };
};
export const setDueDays = (value) => {
  return {
    type: BORROWER_DASHBOARD_DUE_DAYS,
    payload: value
  };
};

export default {
  selectCurrency,
  setCashFlowRange,
  setDueDays
};
