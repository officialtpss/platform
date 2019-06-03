import React, { Component } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Fade, Row, Col } from 'reactstrap';
import {statuses as kycStatuses, averageInvoiceValues, averageInvoiceVolumes } from 'meteor/populous:constants';

import BorrowerFormCompanyInformation from './BorrowerForm/CompanyInformation';
import BorrowerFormTradingVolume from './BorrowerForm/TradingVolume';
import BorrowerFormPersonalIdentification from "./BorrowerForm/PersonalIdentification";
import BorrowerFormReviewPage from "./BorrowerForm/ReviewPage";
import BorrowerFormSteps from "./BorrowerForm/Steps";
import InvestorFormPersonalIdentification from "./InvestorForm/PersonalIdentification";
import InvestorFormReviewPage from "./InvestorForm/ReviewPage";
import InvestorFormSteps from "./InvestorForm/Steps";
import { LinkButton } from "../../../components/styled-components/Buttons";
import countriesTelephoneCodes from '../CountriesTelephoneCodes';
import ConfirmPhoneModal from './ConfirmPhoneModal';
import {Link} from "react-router-dom";

class KYCWizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      isOpenConfirmPhoneModal: false,
      changedPhoneNumber: false,
    };
  }

  componentWillMount() {
    const {currentUser, pageMissingKYCPart} = this.props;
    if (currentUser.residentalCountry) {
      this.props.getSupportedDocuments(currentUser.residentalCountry);
    }

    if (pageMissingKYCPart) {
      this.setState({page: pageMissingKYCPart});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isConfirmedPhoneNumber && this.props.isConfirmedPhoneNumber !== prevProps.isConfirmedPhoneNumber) {
      this.setState({
        isOpenConfirmPhoneModal: false,
        changedPhoneNumber: false,
      });
    }
  }

  onChangePhoneNumber = (bool) => {
    const savedPhoneNumber = this.props.currentUser.getPhoneNumber();
    const currentPhoneNumber = this.props.kycwizard.values.phoneAreaCode + this.props.kycwizard.values.phoneNumber;

    if (savedPhoneNumber !== currentPhoneNumber) {
      this.setState({
        changedPhoneNumber: bool,
      });
    }
  };

  toggleConfirmPhoneModal = () => {
    const savedPhoneNumber = this.props.currentUser.getPhoneNumber();
    const currentPhoneNumber = this.props.kycwizard.values.phoneAreaCode + this.props.kycwizard.values.phoneNumber;
    const {confirmedPhoneNumber} = this.props;

    if (savedPhoneNumber !== currentPhoneNumber && confirmedPhoneNumber !== currentPhoneNumber) {
      if (!this.state.isOpenConfirmPhoneModal) {
        this.props.confirmPhoneNumber(currentPhoneNumber);
      }
      this.setState({isOpenConfirmPhoneModal: !this.state.isOpenConfirmPhoneModal});
    } else {
      return true;
    }
  };

  confirmPhoneNumber = () => {
    const currentPhoneNumber = this.props.kycwizard.values.phoneAreaCode + this.props.kycwizard.values.phoneNumber;
    this.props.confirmPhoneNumber(currentPhoneNumber);
  };

  verifySmsCode = (smsCode) => {
    const {kycwizard} = this.props;
    const currentPhoneNumber = kycwizard && kycwizard.values && kycwizard.values.phoneAreaCode + kycwizard.values.phoneNumber;
    this.props.verifySmsCode(smsCode, currentPhoneNumber);
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getKeyByValue(object, value) {
    if(typeof object === 'object' && !Array.isArray(object)) {
      return Object.keys(object).find(key => object[key] === value);
    }
  }

  onCountrySelect = (e) => {
    this.props.getSupportedDocuments(e.target.value);
    this.props.kycwizard.values.phoneAreaCode = countriesTelephoneCodes[e.target.value];
  };

  render() {
    const { currentUser, onSubmit, saveForm, bankStatements, personalIdentification, addressIdentification,
      goToSettings, kycwizard, className, supportedDocuments, initialLivePhoto, livePhotoDocument, setStep, currentStep } = this.props;

    const { page } = this.state;

    // Restructure info from currentUser we need for CompanyInformationForm
    // ALEX: currentUser has prototype of Class vs Object, what's the deal with that.
    const {
      addressLine1,
      addressLine2,
      city,
      employeeNumber,
      companyDescription,
      companyName,
      companyNumber,
      country,
      firstName,
      lastName,
      postcode,
      preferredCurrency,
      averageInvoiceValue,
      averageInvoiceVolume,
      titlePosition,
      phoneNumber,
      phoneAreaCode,
      gender,
      dateOfBirth,
      residentalAddressLine1,
      residentalAddressLine2,
      residentalCity,
      residentalPostcode,
      residentalCountry,
      socialInsuranceNumber,
      passport,
      idDocumentType
    } = currentUser;


    const averageInvoiceValueIndex = this.getKeyByValue(averageInvoiceValues, averageInvoiceValue);
    const averageInvoiceVolumeIndex = this.getKeyByValue(averageInvoiceVolumes, averageInvoiceVolume);

    const kycFormInitialValues = {
      addressLine1,
      addressLine2,
      city,
      employeeNumber,
      companyDescription,
      companyName,
      companyNumber,
      country,
      firstName,
      lastName,
      postcode,
      averageInvoiceValue: averageInvoiceValueIndex || 2 ,
      averageInvoiceVolume: averageInvoiceVolumeIndex|| 2,
      currencySelector: preferredCurrency,
      bankStatements,
      personalIdentification,
      addressIdentification,
      onlyAccountConfirmation: currentUser.KYCStatus !== kycStatuses.unverified,
      titlePosition,
      phoneNumber,
      phoneAreaCode,
      gender,
      dateOfBirth,
      residentalAddressLine1,
      residentalAddressLine2,
      residentalCity,
      residentalPostcode,
      residentalCountry,
      socialInsuranceNumber,
      passport,
      idDocumentType,
      livePhoto: livePhotoDocument,
    };

    const bankStatementsLoaded = (!currentUser.bankStatementDocumentIds ||
      (Array.isArray(currentUser.bankStatementDocumentIds)
        && currentUser.bankStatementDocumentIds.length === bankStatements.length));

    const personalIdentificationLoaded = (!currentUser.idDocumentIds ||
      (Array.isArray(currentUser.idDocumentIds)
        && currentUser.idDocumentIds.length === personalIdentification.length));

    const addressIdentificationLoaded = (!currentUser.addressDocumentIds ||
      (Array.isArray(currentUser.addressDocumentIds)
        && currentUser.addressDocumentIds.length === addressIdentification.length));

    return (
      <div className="m-t-50">
        {currentUser.isBorrower() &&
          <Row>
            <Col xs={{ size: '12', offset: 0 }} lg={{ size: '10', offset: 1 }}>
              <Fade in={page === 1}>
                {(page === 1 && personalIdentificationLoaded) &&
                  <BorrowerFormPersonalIdentification
                  initialValuesReduxForm={kycFormInitialValues}
                  currentUser={currentUser} // Just for validation to not break
                  onSubmit={this.nextPage}
                  selectedResidentalCountry={residentalCountry || null}
                  valuesReduxForm={kycwizard ? kycwizard.values : null}
                  onCountrySelect={this.onCountrySelect}
                  supportedDocuments={supportedDocuments}
                  className={className}
                  toggleConfirmPhoneModal={this.toggleConfirmPhoneModal}
                  isConfirmedPhoneNumber={this.props.isConfirmedPhoneNumber}
                  onChangePhoneNumber={this.onChangePhoneNumber}
                  changedPhoneNumber={this.state.changedPhoneNumber}
                  initialLivePhoto={initialLivePhoto}
                  saveCurrentProgress={saveForm}
                  hashMissingKYCPart={this.props.hashMissingKYCPart}
                  currentStep={currentStep}
                  setStep={setStep}
                  />
                }
              </Fade>
              <Fade in={page === 2}>
                {(page === 2 && bankStatementsLoaded) &&
                <BorrowerFormCompanyInformation
                  initialValuesReduxForm={kycFormInitialValues}
                  previousPage={this.previousPage}
                  valuesReduxForm={kycwizard ? kycwizard.values : null}
                  currentUser={currentUser}
                  onSubmit={this.nextPage}
                  onBack={goToSettings}
                  className={className}
                  saveCurrentProgress={saveForm}
                  hashMissingKYCPart={this.props.hashMissingKYCPart}
                />
                  }
              </Fade>
              <Fade in={page === 3}>
                {page === 3  &&
                <BorrowerFormTradingVolume
                  currentUser={currentUser} // Just for validation to not break
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  className={className}
                  valuesReduxForm={kycwizard ? kycwizard.values : null}
                  initialValuesReduxForm={kycFormInitialValues}
                  saveCurrentProgress={saveForm}
                />
                  }
              </Fade>
              <Fade in={page === 4}>
                {page === 4 &&
                  <BorrowerFormReviewPage
                    currentUser={currentUser} // Just for validation to not break
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                    initialValuesReduxForm={kycFormInitialValues}
                  />}
              </Fade>
              <Row className="m-t-30">
                <Col xs={'12'} md={{ size: '10', offset: 1 }}  xl={{ size: '8', offset: 2 }}>
                  <BorrowerFormSteps page={page-1} currentUser={currentUser}/>
                </Col>
              </Row>
              {page !== 4 &&
                <Row className="m-t-30">
                  <Col xs={12} className="text-center">
                    <LinkButton onClick={saveForm}>
                    {page === 1 ? 'Complete The Profile Later' : 'Save Progress and Complete Later'}
                    </LinkButton>
                  </Col>
                </Row>
              }
            </Col>
          </Row>}
        {!currentUser.isBorrower() &&
          <Row>
            <Col xs={{ size: '12', offset: 0 }} lg={{ size: '10', offset: 1 }}>
              <Fade in={page === 1}>
                {(page === 1 && addressIdentificationLoaded && personalIdentificationLoaded) &&
                  <InvestorFormPersonalIdentification
                    initialValuesReduxForm={kycFormInitialValues}
                    currentUser={currentUser} // Just for validation to not break
                    onSubmit={this.nextPage}
                    onBack={goToSettings}
                    selectedResidentalCountry={kycwizard ? kycwizard.values.residentalCountry : null}
                    valuesReduxForm={kycwizard ? kycwizard.values : null}
                    onCountrySelect={this.onCountrySelect}
                    className={className}
                    supportedDocuments={supportedDocuments}
                    toggleConfirmPhoneModal={this.toggleConfirmPhoneModal}
                    isConfirmedPhoneNumber={this.props.isConfirmedPhoneNumber}
                    onChangePhoneNumber={this.onChangePhoneNumber}
                    changedPhoneNumber={this.state.changedPhoneNumber}
                    initialLivePhoto={initialLivePhoto}
                    saveCurrentProgress={saveForm}
                    hashMissingKYCPart={this.props.hashMissingKYCPart}
                    currentStep={currentStep}
                    setStep={setStep}
                  />}
              </Fade>
              <Fade in={page === 2}>
                {page === 2 &&
                  <InvestorFormReviewPage
                    currentUser={currentUser} // Just for validation to not break
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                    initialValuesReduxForm={kycFormInitialValues}
                  />}
              </Fade>
              <Row className="m-t-30">
                <Col xs={'12'} md={{ size: '10', offset: 1 }}  xl={{ size: '8', offset: 2 }}>
                  <InvestorFormSteps page={page-1} currentUser={currentUser}/>
                </Col>
              </Row>
              {page === 1 &&
              <Row className="m-t-30">
                <Col xs={12} className="text-center">
                  <Link onClick={saveForm} to={'/'} className={'text-uppercase'}>
                    Complete The Profile Later
                  </Link>
                </Col>
              </Row>
              }
            </Col>
          </Row>}

        <ConfirmPhoneModal
          isOpen={this.state.isOpenConfirmPhoneModal}
          toggle={this.toggleConfirmPhoneModal}
          confirmPhoneNumber={this.confirmPhoneNumber}
          verifySmsCode={this.verifySmsCode}
        />
      </div>
    );
  }
}

KYCWizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default styled(KYCWizardForm)`
   .next, .previous {
     max-width: 143px;
   }
`;
