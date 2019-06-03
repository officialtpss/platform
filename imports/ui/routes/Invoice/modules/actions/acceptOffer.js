import { toastr } from 'react-redux-toastr';
import store from "../../../../../store/index";
import requireConfirmation from '../../../../components/ConfirmModal/modules/actions';
import {
  RESET_INVOICE_DETAIL
} from '../../modules';

let acceptOffer = (crowdsale, bid) => {
  return (dispatch) => {
    crowdsale.callMethod('acceptOffer', bid,
      (error) => {
        if (error) {
          return toastr.error(error.reason)
        }
        store.dispatch({type: RESET_INVOICE_DETAIL});
        return toastr.success('Offer Accepted');
      });
  }
};

acceptOffer = requireConfirmation(acceptOffer, {
  text: 'Are you sure that you are going accept offer?'
});

export default acceptOffer;