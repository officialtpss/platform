import {toastr} from "react-redux-toastr";

import requireConfirmation from "../../../../components/ConfirmModal/modules/actions";


const withdrawInvoice = requireConfirmation((invoice) => {
  return () => {
    invoice.callMethod('withdraw', (error) => {
      if (error) {
        return toastr.error('Error!', error.reason)
      }
    });
  }
}, {text: 'Please, confirm invoice withdraw'});


export default withdrawInvoice;
