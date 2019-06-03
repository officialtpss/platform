import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Bank } from 'meteor/populous:api';

import BankDetails from '../components/BankDetails';
import { removeBankDetail, toggleBankDetailsModal, toggleBankTooltip, selectBank } from '../modules/actions';

const mapStateToProps = ({ app, profileSettings }) => ({
  currentUser: app.currentUser,
  showBankModal: profileSettings.showBankModal,
  selectedBankId: profileSettings.selectedBankId,
  showBankTooltip: profileSettings.showBankTooltip
});

const mapDispatchToProps = dispatch => ({
  removeBankDetail: (id) => dispatch(removeBankDetail(id)),
  toggleModal: (open) => dispatch(toggleBankDetailsModal(open)),
  toggleTooltip: (open) => dispatch(toggleBankTooltip(open)),
  selectBank: id => dispatch(selectBank(id))
});

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker((state) => {
  const userId = state.currentUser._id;

  // Make sure the data for the current invoice is available
  const handler = Meteor.subscribe('bank.user', userId);

  const accounts = Bank.find({userId}).fetch();
  let selectedBank = null;
  if (state.selectedBankId) {
  	selectedBank = Bank.findOne(state.selectedBankId);
  }

  // We have to return an object for withTracker to work
  return {
  	loading: !handler.ready(),
  	accounts: accounts,
  	selectedBank: selectedBank
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(BankDetails);
