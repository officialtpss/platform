import { toastr } from 'react-redux-toastr';

function joinOrEditGroupBid(bid, amount, isAnonymous, successCallback) {

  bid.callMethod('joinOrEditGroupBid', amount, isAnonymous,
    (error, result) => {
      if (error) {
        return toastr.error(error.reason)
      }

      toastr.success('Bid successfully updated');

      successCallback(result);

    });
}

export default joinOrEditGroupBid;