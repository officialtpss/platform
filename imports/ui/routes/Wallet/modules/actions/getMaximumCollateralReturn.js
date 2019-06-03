import { toastr } from 'react-redux-toastr';

import { SET_MAXIMUM_COLLATERAL_RETURN_AMOUNT } from '../index';


export default function getMaximumCollateralReturn(currentUser) {
  return (dispatch) => {
    currentUser.callMethod('getMaximumCollateralReturn', (error, amount) => {
      if (error) {
        return toastr.error(error.reason);
      }

      dispatch({
        type: SET_MAXIMUM_COLLATERAL_RETURN_AMOUNT,
        payload: {
          maximumCollateralReturnAmount: amount,
        },
      });
    });
  }
}
