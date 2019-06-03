import { Meteor } from 'meteor/meteor';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { File as FileApi } from 'meteor/populous:api';
import { push } from 'react-router-redux';

import KYCWizardForm from './KYCWizardForm'
import { sendToVerifyKYCDocuments, saveTempData, getSupportedDocuments, confirmPhoneNumber, verifySmsCode,
  getInitialLifePhoto, setStep } from '../modules/actions';

const mapStateToProps = ({ app, form: {kycwizard}, uploadKYC }) => ({
  currentUser: app.currentUser,
  saving: uploadKYC.saving,
  supportedDocuments: uploadKYC.supportedDocuments,
  isConfirmedPhoneNumber: uploadKYC.isConfirmedPhoneNumber,
  confirmedPhoneNumber: uploadKYC.confirmedPhoneNumber,
  initialLivePhoto: uploadKYC.initialLivePhoto,
  currentStep: uploadKYC.currentStep,
  kycwizard : kycwizard,
});

const mapDispatchToProps = dispatch => ({
  goToSettings: () => dispatch(push('/settings')),
  ...bindActionCreators({
    getSupportedDocuments,
    confirmPhoneNumber,
    verifySmsCode,
    getInitialLifePhoto,
    setStep,
    onSubmit: sendToVerifyKYCDocuments,
    saveForm: saveTempData,
  }, dispatch),
});

const meteorData = withTracker(({currentUser: {_id, addressDocumentIds=[], bankStatementDocumentIds=[], idDocumentIds=[], livePhotoIds=[]}, ...props}) => {
  const kycFilesPublication = Meteor.subscribe('accounts.user-kyc', _id);
  let bankStatements = [];
  let personalIdentification = [];
  let addressIdentification = [];
  let livePhotoDocument = [];

  if (kycFilesPublication.ready()) {
    bankStatements = FileApi.find({_id: {$in: bankStatementDocumentIds}}).fetch();
    personalIdentification = FileApi.find({_id: {$in: idDocumentIds}}).fetch();
    addressIdentification = FileApi.find({_id: {$in: addressDocumentIds}}).fetch();
    livePhotoDocument = FileApi.find({_id: {$in: livePhotoIds}}).fetch();

    if (livePhotoDocument && livePhotoDocument.length && !props.initialLivePhoto) {
      props.getInitialLifePhoto(livePhotoDocument[0], _id);
    }
  }

  return {bankStatements, personalIdentification, addressIdentification, livePhotoDocument};
});

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), meteorData)(KYCWizardForm)
