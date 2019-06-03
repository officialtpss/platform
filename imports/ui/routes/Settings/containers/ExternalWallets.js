import { Meteor } from 'meteor/meteor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { ExternalAddress } from 'meteor/populous:api';

import ExternalWallets from '../components/ExternalWallets';
import {toggleWalletAddressEdit, removeWalletAddress, editWalletAddress, selectExternalAddress,
  toggleAddWalletAddress, addWalletAddress
} from '../modules/actions';
import requireConfirmation from '../../../components/ConfirmModal/modules/actions';

const mapStateToProps = ({ app, profileSettings }) => ({
  currentUser: app.currentUser,
  showWalletAddressEdit: profileSettings.showWalletAddressEdit,
  showAddWalletAddress: profileSettings.showAddWalletAddress,
  selectedExternalAddressId: profileSettings.selectedExternalAddressId,
});

const mapDispatchToProps = dispatch => ({
  toggleAddWalletAddress: (open) => dispatch(toggleAddWalletAddress(open)),
  toggleWalletAddressEdit: (open) => dispatch(toggleWalletAddressEdit(open)),
  removeWalletAddress: (address) => dispatch(
    requireConfirmation(removeWalletAddress, {
      text: `Are you sure you want to delete the address ${address.address || address.newAddress} ?`
    })(address)),
  editWalletAddress: (address, newAddress, newName) => dispatch(editWalletAddress(address, newAddress, newName)),
  addWalletAddress: (address, name) => dispatch(addWalletAddress(address, name)),
  selectExternalAddress: id => dispatch(selectExternalAddress(id))
});

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

// Subscribe to the meteor db and init the store
const meteorData = withTracker((state) => {
  const userId = state.currentUser._id;
  const handler = Meteor.subscribe('externalAddress.user', userId);
  const externalsAddresses = ExternalAddress.find({userId}).fetch();

  if (externalsAddresses.length) {
    externalsAddresses.forEach((address) => {
      if (address.newAddress && address.isActive()) {
        address.callMethod('confirmationAddress');
      }
    });
  }

  let selectedAddresses = null;
  if (state.selectedExternalAddressId) {
    selectedAddresses = ExternalAddress.findOne({_id: state.selectedExternalAddressId, userId: userId});
  }

  // We have to return an object for withTracker to work
  return {
    loading: !handler.ready(),
    externalsAddresses: externalsAddresses,
    selectedAddresses: selectedAddresses
  };
});


// Let reduxData override any values set in meteorData
export default compose(reduxData, meteorData)(ExternalWallets);
