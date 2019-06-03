import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Bank } from 'meteor/populous:api';

import AddBankAccount from '../components/AddBankAccountForm';
import { addBankDetail, toggleBankDetailsModal, selectBank, updateBankDetails } from '../modules/actions';

const mapStateToProps = ({ app, profileSettings }) => ({
  currentUser: app.currentUser,
  showBankModal: profileSettings.showBankModal,
  selectedBankId: profileSettings.selectedBankId
});

const mapDispatchToProps = dispatch => ({
  addBankDetail: (bankDetails) => dispatch(addBankDetail(bankDetails)),
  updateBankDetails: (bank, updates) => dispatch(updateBankDetails(bank, updates)),
  toggleModal: (open) => dispatch(toggleBankDetailsModal(open))
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

  let selectedBank = null, initialValues = {};
  if (state.selectedBankId) {
  	selectedBank = Bank.findOne(state.selectedBankId);
    if (state.showBankModal == 2) {
      initialValues = {
        name: selectedBank.name,
        country: selectedBank.country,
        currency: selectedBank.currency,
        sortCode: selectedBank.sortCode,
        number: selectedBank.number
      };
    }
  }

  // We have to return an object for withTracker to work
  return {
  	loading: !handler.ready(),
  	selectedBank: selectedBank,
    initialValues
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(AddBankAccount);
