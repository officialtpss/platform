import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTracker } from 'meteor/react-meteor-data';
import { User, File } from 'meteor/populous:api';

import CustomerProfile from '../components/CustomerProfile';
import { savePersonalDetails } from '../modules/actions';

const reduxData = connect(
  state => ({ currentUser: state.app.currentUser }),
  dispatch => ({
    save: u => dispatch(savePersonalDetails(u))
  })
);

const meteorData = withTracker((state) => {
  const { currentUser } = state;
  let bankStatementDocuments = [], idDocuments = [], addressDocuments = [], livePhotoDocument = [];

  if(!currentUser) {
    return {
      loading: true
    };
  }

  const handler = Meteor.subscribe('accounts.user-kyc', currentUser._id);

  if(handler.ready()) {
    const user = User.findOne({ _id: currentUser._id });
    bankStatementDocuments = (user.bankStatementDocumentIds || []).map((id, _) => {
      return File.findOne({_id: id})
    });
    bankStatementDocuments = bankStatementDocuments.filter(file => !!file);
    idDocuments = (user.idDocumentIds || []).map((id, _) => {
      return File.findOne({_id: id})
    });
    idDocuments = idDocuments.filter(file => !!file);
    addressDocuments = (user.addressDocumentIds || []).map((id, _) => {
      return File.findOne({_id: id})
    });
    addressDocuments = addressDocuments.filter(file => !!file);
    livePhotoDocument = (user.livePhotoIds || []).map((id, _) => {
      return File.findOne({_id: id})
    });
    livePhotoDocument = livePhotoDocument.filter(file => !!file);
  }

  return {
    loading: !handler.ready(),
    bankStatementDocuments,
    idDocuments,
    addressDocuments,
    livePhotoDocument
  };
});

export default compose(reduxData, meteorData)(CustomerProfile);
