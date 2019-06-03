import { toastr } from 'react-redux-toastr';
import { Bid } from 'meteor/populous:api';
import {reset}  from 'redux-form';
import blockBidForm from "./blockBidForm";

export default function placeBid(invoice, params, formName) {
  return dispatch => {
    dispatch(blockBidForm(true));

    setTimeout(() => {

    invoice.callMethod('bid', params, (err, res) => {
      dispatch(blockBidForm(false));

      if(err) {
        return toastr.error(err.reason);
      }

      dispatch(reset(formName));
      toastr.success('Bid successful placed');
    });

    });
  };
};
