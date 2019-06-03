import { RESET_TRANSACTION_HISTORY_FILTERS } from '../index';

const resetFilters = () => {

  return (dispatch) => {
    dispatch({type: RESET_TRANSACTION_HISTORY_FILTERS});
  }

};

export default resetFilters;