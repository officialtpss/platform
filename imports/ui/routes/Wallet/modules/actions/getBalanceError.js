import {
  GET_BALANCE_ERROR,
} from '../index';
import { Wallet } from 'meteor/populous:api';

const getBalanceError = () => {
  
  return (dispatch, getState) => {
    const { currentUser } = getState().app;
    
    currentUser.callMethod('getBalanceError', (error ,response) => {
      if(error) {
        dispatch({type: GET_BALANCE_ERROR, payload: {balanceError: true}});
      } else {
        dispatch({type: GET_BALANCE_ERROR, payload: {balanceError: false}});
      }
    });
  }
};

export default getBalanceError;
