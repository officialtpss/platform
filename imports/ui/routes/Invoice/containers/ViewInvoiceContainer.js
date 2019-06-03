import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withTracker} from 'meteor/react-meteor-data';
import {Currency, Crowdsale, Bid, LedgerBalance, File, User, Debtor} from 'meteor/populous:api';
import {invoiceStatuses, crowdsaleStatuses, invoiceDocumentTypes,} from 'meteor/populous:constants';

import restartAuction from "../modules/actions/restartAuction";
import closeAuction from "../modules/actions/closeAuction";
import acceptOffer from "../modules/actions/acceptOffer";
import ViewInvoice from "../components/ViewInvoice";
import withdrawInvoice from "../modules/actions/withdrawInvoice";
import {getBalanceError} from "../../Wallet/modules/actions";


const reduxData = connect(
  ({wallet}) => ({balanceError: wallet.balanceError}),
  dispatch => ({
    ...bindActionCreators({
      restartAuction,
      getBalanceError,
      closeAuction,
      acceptOffer,
      withdrawInvoice,
    }, dispatch),
  })
);

const meteorData = withTracker(({invoiceDocument: invoice, currentUser}) => {
  let bids = Bid.find({invoiceId: invoice._id}, {sort: {sortAmount: -1}}).fetch();
  invoice.currentAuctionPrice = Math.max(0, ...bids.map((bid) => bid.sortAmount));


  return {
    crowdsale: Crowdsale.findOne({invoiceId: invoice._id}),
    bids,
    usersObject: invoice.getParticipants(bids),
    alreadyBidded: !!bids.find((bid) => bid.userId === currentUser._id),
  }
});

export default compose(reduxData, meteorData)(ViewInvoice);
