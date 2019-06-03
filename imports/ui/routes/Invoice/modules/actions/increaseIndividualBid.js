import { toastr } from 'react-redux-toastr';

function increaseIndividualBid(bid, amount, successCallback) {

  bid.callMethod('increaseIndividualBid', amount,
    (error, result) => {
      if (error) {
        return toastr.error(error.reason)
      }

      toastr.success('Bid successfully updated');
      successCallback(result);
    });
}

export default increaseIndividualBid;
