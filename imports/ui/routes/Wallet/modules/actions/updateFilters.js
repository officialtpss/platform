import { UPDATE_TRANSACTION_HISTORY_FILTERS } from '../index';

const updateFilters = (filters) => {

  return (dispatch) => {
    dispatch({
      type: UPDATE_TRANSACTION_HISTORY_FILTERS,
      payload: {filters}
    });
  }

};

export default updateFilters;
