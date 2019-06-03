import { toastr } from 'react-redux-toastr';

import store from "../../../../../store/index";
import {
  RESET_INVOICE_DETAIL
} from '../../modules';
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';

let restartAuction = (invoice) => {
  return (dispatch) => {
    invoice.callMethod('restartAuction',
      (error) => {
        if (error) {
          return toastr.error(error.reason);
        }
        store.dispatch({ type: RESET_INVOICE_DETAIL });
        toastr.success('Auction successfully restarted');
    });
  }
}
restartAuction = requireConfirmation(restartAuction, {
  text: 'Are you sure that you are going restart Auction?'
});

export default restartAuction;
