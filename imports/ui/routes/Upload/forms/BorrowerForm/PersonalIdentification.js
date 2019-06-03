import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import Scrollchor from 'react-scrollchor';
import {Field, reduxForm} from 'redux-form';
import renderDropzoneInput from '../../../../form-helpers/renderDropzoneInput';
import {renderInputReactstrap} from '../../../../form-helpers/renderInputTextFields';
import {renderDateTimeField} from '../../../../form-helpers/renderDateTimeField';
import renderDropzoneLivePhoto from '../../../../form-helpers/renderDropzoneLivePhoto';
import {
  renderCountrySelector,
  renderGenderSelector
} from '../../../../form-helpers/renderSelectFields';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import {PersonalIdentificationValidate} from '../KYCValidation';
import {H2, LABEL, P} from '../../../../components/styled-components/Typography';
import {DocumentsRadio} from '../../../../components/styled-components/Forms/DocumentsRadio';
import {connect} from "react-redux";
import KycInfograph from "../../components/KycInfograph";


class BorrowerFormPersonalIdentification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propsPersonalIdentification: null,
    }
  }

  componentWillMount() {
    const {hashMissingKYCPart, setStep} = this.props;
    let currentStep = 0;
    if (hashMissingKYCPart) {
      if (hashMissingKYCPart === '#personalIdentification') {
        currentStep = 2;
      } else if (hashMissingKYCPart === '#residentalAddress') {
        currentStep = 3;
      } else if (hashMissingKYCPart === '#addressIdentification') {
        currentStep = 4;
      } else if (hashMissingKYCPart === '#livePhoto') {
        currentStep = 5;
      } else if (hashMissingKYCPart === '#companyInfo') {
        currentStep = 6;
      } else {
        currentStep = 1;
      }

      setStep(currentStep);
    }
  }

  previous = (e) => {
    e.preventDefault();
    const {currentStep, setStep} = this.props;

    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };

  setPropsPersonalIdentification = (props) => {
    this.setState({propsPersonalIdentification: props});
  };

  incrementStep = () => {
    const {currentUser, toggleConfirmPhoneModal, currentStep, setStep} = this.props;

    if (toggleConfirmPhoneModal()) {
      if (currentUser.isVerifiedKyc() && currentStep === 0) {
        this.saveCurrentProgress();
        setStep(2);
      } else {
        if (currentStep !== 1) {
          this.saveCurrentProgress();
        }
        setStep(currentStep + 1);
      }
    }
  };

  saveCurrentProgress = () => {
    const {saveCurrentProgress, pristine} = this.props;

    if (!pristine) {
      saveCurrentProgress(false);
    }
  };

  onChangePhoneNumber = () => {
    if (this.props.currentStep > 0) {
      this.props.onChangePhoneNumber(true);
    }
  };

  componentDidUpdate(prevProps) {
    const {isConfirmedPhoneNumber, saveCurrentProgress, currentStep, setStep} = this.props;
    if (currentStep !== prevProps.currentStep) {
      this.scrollchor.simulateClick();
    }

    if (isConfirmedPhoneNumber &&
      isConfirmedPhoneNumber !== prevProps.isConfirmedPhoneNumber &&
      currentStep === 0
    ) {
      if (currentStep !== 1) {
        saveCurrentProgress(false);
      }
      setStep(currentStep + 1);
    }
  }

  getCurrentScollTo = () => {
    let {currentStep} = this.props;
    let toScrollId;

    if (currentStep === 1) {
      toScrollId = '#kycInfograph';
    } else if (currentStep === 2) {
      toScrollId = '#personalIdentification';
    } else if (currentStep === 3) {
      toScrollId = '#residentalAddress';
    } else if (currentStep === 4) {
      toScrollId = '#addressIdentification';
    } else if (currentStep === 5) {
      toScrollId = '#livePhoto';
    } else {
      toScrollId = '#personalIdentification';
    }

    return toScrollId;
  };

  checkAccessToNext = () => {
    const {valuesReduxForm, currentUser, currentStep} = this.props;
    const isKycVerified = currentUser.isVerifiedKyc();

    const isUploadedPersonalIdentification = valuesReduxForm && valuesReduxForm.bankStatements &&
      valuesReduxForm.personalIdentification.length;
    const isUploadedAddressIdentification = valuesReduxForm && valuesReduxForm.addressIdentification &&
      valuesReduxForm.addressIdentification.length;
    const isUploadedLivePhoto = valuesReduxForm && valuesReduxForm.livePhoto &&
      valuesReduxForm.livePhoto.length;

    let isAllowed;
    const isAllowedPersonalData = (
      valuesReduxForm &&
      valuesReduxForm.firstName &&
      valuesReduxForm.lastName &&
      valuesReduxForm.titlePosition &&
      valuesReduxForm.dateOfBirth &&
      valuesReduxForm.gender &&
      valuesReduxForm.residentalCountry &&
      valuesReduxForm.phoneAreaCode &&
      valuesReduxForm.phoneNumber
    );

    const isAllowedpPersonalIdentification = (
      isAllowedPersonalData &&
      valuesReduxForm.idDocumentType &&
      isUploadedPersonalIdentification
    );

    const isAllowedPresidentalAddress = (
      isAllowedPersonalData &&
      isAllowedpPersonalIdentification &&
      valuesReduxForm.residentalAddressLine1 &&
      valuesReduxForm.residentalAddressLine2 &&
      valuesReduxForm.residentalCity &&
      valuesReduxForm.residentalPostcode
    );

    const isAllowedAddressIdentification = (
      isAllowedPersonalData &&
      isAllowedpPersonalIdentification &&
      isAllowedPresidentalAddress &&
      isUploadedAddressIdentification
    );

    const isAllowedLivePhoto = (
      isAllowedPersonalData &&
      isAllowedpPersonalIdentification &&
      isAllowedPresidentalAddress &&
      isAllowedAddressIdentification &&
      isUploadedLivePhoto
    );

    if (currentStep === 0 || currentStep === 1) {
      isAllowed = isAllowedPersonalData;
    } else if (currentStep === 2) {
      isAllowed = isAllowedpPersonalIdentification;
    } else if (currentStep === 3) {
      isAllowed = isAllowedPresidentalAddress;
    } else if (currentStep === 4) {
      isAllowed = isAllowedAddressIdentification;
    } else if (!isKycVerified && currentStep === 5) {
      isAllowed = isAllowedLivePhoto;
    }

    if (isAllowed) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {handleSubmit, selectedResidentalCountry, onCountrySelect, supportedDocuments,
      submitting, currentUser, toggleConfirmPhoneModal, currentStep} = this.props;
    const isKycVerified = currentUser.isVerifiedKyc();

    return (
      <form className="form multi" onSubmit={(e) => {
        e.preventDefault();
        if (toggleConfirmPhoneModal()) {
          handleSubmit(e);
        }
      }}
      >
        <H2 className="text-center m-b-30">
          Company Contact Person
        </H2>

        <Row className="m-b-40">
          <Col xs={12} md={{size: 8, offset: 2}}>
            <Row id="personalData">
              <Col xs={12} md={6}>
                <Field
                  name="firstName"
                  type="text"
                  component={renderInputReactstrap}
                  label="First Name"
                  placeholder={''}
                  disabled={isKycVerified}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  name="lastName"
                  type="text"
                  component={renderInputReactstrap}
                  label="Last Name"
                  placeholder={''}
                  disabled={isKycVerified}
                />
              </Col>
              <Col xs={12} md={12}>
                <Field
                  name="titlePosition"
                  type="text"
                  component={renderInputReactstrap}
                  label="Title/Position"
                  placeholder={''}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder='dd/mm/yyyy'
                  component={renderDateTimeField}
                  enableOutsideRange={true}
                  className={'customDatepicker'}
                  disabled={isKycVerified}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  name="gender"
                  label="Gender"
                  component={renderGenderSelector}
                  disabled={isKycVerified}
                />
              </Col>

              <Col xs={12} md={12}>
                <Field name="residentalCountry" onChange={onCountrySelect} component={renderCountrySelector}
                       disabled={isKycVerified}/>
              </Col>
              <Col xs={12} md={4}>
                <Field
                  name="phoneAreaCode"
                  type="text"
                  label="Code"
                  style={{backgroundColor: 'transparent'}}
                  component={renderInputReactstrap}
                  placeholder={''}
                  onChange={this.onChangePhoneNumber}
                />
              </Col>
              <Col xs={12} md={8}>
                <Field
                  name="phoneNumber"
                  type="text"
                  component={renderInputReactstrap}
                  label="Phone Number"
                  placeholder={''}
                  onChange={this.onChangePhoneNumber}
                />
              </Col>

              {selectedResidentalCountry === 'CA' &&
              <Fragment>
                <Col xs={12} md={6}>
                  <Field
                    name="socialInsuranceNumber"
                    type="text"
                    component={renderInputReactstrap}
                    label="Social insurance number"
                    placeholder={''}
                    className="m-b-0"
                    disabled={isKycVerified}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Field
                    name="passport"
                    type="text"
                    component={renderInputReactstrap}
                    label="Passport"
                    placeholder={''}
                    disabled={isKycVerified}
                  />
                </Col>
              </Fragment>
              }
            </Row>
          </Col>
        </Row>
        {!isKycVerified &&
        <Row id="kycInfograph" style={{display: currentStep > 0 ? 'flex' : 'none'}}>
          <KycInfograph/>
        </Row>
        }
        <Row className="m-b-40">
          <Col xs={12} md={{size: 8, offset: 2}}>
            <div id="personalIdentification" className=" m-t-40" style={{display: currentStep > 1 ? 'block' : 'none'}}>
              {isKycVerified
                ? <LABEL>Identity card</LABEL>
                : <React.Fragment>
                  <P>Select a type and upload a copy of your identity document.</P>
                  <div className="flex-row m-t-30 m-b-30 justify-content-center align-content-center">
                    <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
                      <img src="/img/icons/ico-info.png" alt="Info"
                           style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
                    </div>
                    <P className="m-b-0 ">
                      When submitting a copy of the national identity card, both sides of the document should be
                      submitted.
                      Each side or spread must be in a separate file
                    </P>
                  </div>
                  <div>
                    <Field
                      name="idDocumentType"
                      type="radio"
                      component={DocumentsRadio}
                      documents={supportedDocuments}
                      placeholder={''}
                      disabled={isKycVerified}
                    />
                  </div>
                </React.Fragment>
              }
              <div className="m-t-30">
                <Field
                  name="personalIdentification"
                  component={renderDropzoneInput}
                  acceptedFiles=".png, .jpg, .jpeg"
                  detail="personalIdentification"
                  hideDropzone={isKycVerified}
                  disabled={!supportedDocuments || isKycVerified}
                  setPropsPersonalIdentification={this.setPropsPersonalIdentification}
                  maxSize={3000000}
                  minSize={15000}
                />
              </div>
            </div>

            <Row id="residentalAddress" className='m-t-60' style={{display: currentStep > 2 ? 'flex' : 'none'}}>
              <Col xs={12}>
                <Field
                  name="residentalAddressLine1"
                  type="text"
                  component={renderInputReactstrap}
                  label="Residental Address"
                  placeholder={'Building number and street'}
                  className="m-b-0"
                />
                <Field
                  name="residentalAddressLine2"
                  type="text"
                  component={renderInputReactstrap}
                  label=""
                  placeholder={'Office, floor, etc'}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  name="residentalCity"
                  type="text"
                  component={renderInputReactstrap}
                  label="City"
                  placeholder={''}
                />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  name="residentalPostcode"
                  type="text"
                  component={renderInputReactstrap}
                  label="Postcode"
                  placeholder={''}
                />
              </Col>
            </Row>


            <Row id="addressIdentification" className='m-t-40' style={{display: currentStep > 3 ? 'flex' : 'none'}}>
              <Col xs={12}>
                <P>Please upload a copy of a document that shows your current residental address.</P>
                <div className="flex-row m-t-30 m-b-30 justify-content-center align-content-center">
                  <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
                    <img src="/img/icons/ico-info.png" alt="Info"
                         style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
                  </div>
                  <P className="m-b-0">
                    It can be your latest bank statement or utility bill. Must be valid for the last three months.
                  </P>
                </div>
              </Col>
              <Col xs={12}>
                <Field
                  name="addressIdentification"
                  component={renderDropzoneInput}
                  acceptedFiles=".pdf, .png, .jpg, .jpeg"
                  propsPersonalIdentification={this.state.propsPersonalIdentification}
                />
              </Col>
            </Row>

            <div id="livePhoto" className='m-t-40' style={{display: currentStep > 4 ? 'block' : 'none'}}>
              <div className='text-center'>
                {isKycVerified
                  ? <P>
                    Personal photo
                  </P>
                  : <React.Fragment>
                    <P>Upload a photo of yourself</P>
                    <div className="flex-row m-t-30 m-b-30 justify-content-center align-content-center">
                      <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
                        <img src="/img/icons/ico-info.png" alt="Info"
                             style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
                      </div>
                      <P className="m-b-0 text-left">
                        Your photo will be used only for faster indentity verification and will not be published
                        anywhere.
                      </P>
                    </div>
                  </React.Fragment>
                }
              </div>
              <div>
                <Field
                  name="livePhoto"
                  component={renderDropzoneLivePhoto}
                  acceptedFiles=".png, .jpg, .jpeg"
                  initialPhoto={this.props.initialLivePhoto}
                  disabled={isKycVerified}
                />
              </div>
            </div>
          </Col>
        </Row>


        <Row className={`${this.props.className}`}>
          <Col xs={12} className="m-b-40 text-center">
            {currentStep < 5 &&
            <PrimaryButton type="button" onClick={this.incrementStep} disabled={!this.checkAccessToNext()}>
              Done
            </PrimaryButton>
            }
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <PrimaryButton outline block className="previous m-r-20" onClick={this.previous} disabled={currentStep === 0}>
              Previous
            </PrimaryButton>
            <PrimaryButton block type="submit" className="next m-l-5"
                           disabled={ submitting || currentStep < 5 || !this.checkAccessToNext()}
                           onClick={this.saveCurrentProgress}>
              Next
            </PrimaryButton>
          </Col>
        </Row>

        <Scrollchor ref={ref => (this.scrollchor = ref)} to={this.getCurrentScollTo()}/>
      </form>
    );
  }
}


BorrowerFormPersonalIdentification = reduxForm({
  form: 'kycwizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: PersonalIdentificationValidate,
  enableReinitialize: true,
})(BorrowerFormPersonalIdentification);

export default connect((state, ownProps) => ({
  initialValues: ownProps.initialValuesReduxForm,
}))(BorrowerFormPersonalIdentification);
