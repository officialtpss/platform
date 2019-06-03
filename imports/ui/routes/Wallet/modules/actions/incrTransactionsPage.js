import { SET_TRANSACTIONS_CURRENT_PAGE } from '../index';

const incrementCurrentTransactionsPage = () => {

  return (dispatch, getState) => {
    let currentPage = getState().wallet.currentPage;
    dispatch({
      type: SET_TRANSACTIONS_CURRENT_PAGE,
      payload: {currentPage: ++currentPage}
    });
  }

};

export default incrementCurrentTransactionsPage;
