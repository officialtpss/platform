import { toastr } from 'react-redux-toastr';

import store from "../../../../../store/index";
import {
  RESET_INVOICE_DETAIL
} from '../../modules';
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';

let closeAuction = (invoice) => {
  return (dispatch) => {
    invoice.callMethod('closeAuction',
      (error) => {
        if (error) {
          return toastr.error(error.reason);
        }
        store.dispatch({ type: RESET_INVOICE_DETAIL });
        toastr.success('Auction successfully closed');
    });
  }
};
closeAuction = requireConfirmation(closeAuction, {
  text: 'Are you sure that you are going close Auction?'
});

export default closeAuction;