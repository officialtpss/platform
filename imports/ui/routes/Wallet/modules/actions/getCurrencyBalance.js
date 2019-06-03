import {
  GET_CURRENCY_BALANCE,
} from '../index';

const getCurrencyBalance = (currencies) => {

  return (dispatch, getState) => {
    const { currentUser } = getState().app;

    currentUser.callMethod('getCurrencyBalance', currencies, (error ,response) => {
      if(!error) {
         dispatch({type: GET_CURRENCY_BALANCE, payload: {balance: response}});
      }
    });
  }
};

export default getCurrencyBalance;
