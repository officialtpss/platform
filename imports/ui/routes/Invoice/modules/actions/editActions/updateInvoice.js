import {RESET_INVOICE_DETAIL} from "../../index";
import {toastr} from "react-redux-toastr";
import {setInvoice} from "./invoiceEdit";
import {push} from "react-router-redux";

export default function updateInvoice(values) {
  return (dispatch, getState) => {
    const {invoiceDetail: {currentInvoice: invoice}} = getState();

    invoice.callMethod('update',values, (err, newInvoice) => {
      if (err) {
        return toastr.error('Error', err.reason);
      }

      dispatch(push(`/invoice/${invoice._id}`));
      dispatch({type: RESET_INVOICE_DETAIL});
      dispatch(setInvoice(newInvoice));
    });
  }
}
