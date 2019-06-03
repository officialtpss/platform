import { LedgerBalance } from 'meteor/populous:api';
import { toastr } from 'react-redux-toastr';

import {
  INVOICE_SET_CHARTS,
  GET_WALLET_FUNDS,
  SET_DATES_RANGE, UPDATE_SIC_STATISTIC,
} from "./index";


export function setChartsType(filters) {
  return {
    type: INVOICE_SET_CHARTS,
    payload: filters
  };
}

export function setCurrentWallet(wallet) {
  return {
    type: GET_WALLET_FUNDS,
    payload: wallet
  };
}

export function setDatesRange(dates) {
  return {
    type: SET_DATES_RANGE,
    payload: dates
  };
}

export function updateSicStatistic(countryCode) {

  return (dispatch, getState) => {
    const { app: { currentUser } } = getState();

    currentUser.callMethod('getSicCodesWithInvoicesCount', countryCode, (error, result) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch({
        type: UPDATE_SIC_STATISTIC,
        payload: { sicCodesWithInvoicesCount: result }
      })
    });
  }
}

export default {
  setChartsType,
  setCurrentWallet,
  setDatesRange,
};
