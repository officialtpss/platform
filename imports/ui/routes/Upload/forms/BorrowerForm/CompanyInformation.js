import React from 'react';
import styled from 'styled-components'
import Scrollchor from 'react-scrollchor';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { renderInputReactstrap } from '../../../../form-helpers/renderInputTextFields';
import { renderCountrySelector, renderEmployeeNumberSelector } from '../../../../form-helpers/renderSelectFields';
import renderDropzoneInput from '../../../../form-helpers/renderDropzoneInput';
import { CustomCheckbox } from '../../../../components/styled-components/Forms/CustomCheckbox';
import {CompanyInformationValidateBorrower} from '../KYCValidation';
import {PrimaryButton} from '../../../../components/styled-components/Buttons';
import { H2, P, LinkText } from '../../../../components/styled-components/Typography';
import RequirementsModal from "../../../Settings/components/RequirementsModal";

const initialState = {
  isOpenRequirementsModal: false,
  currentStep: 0
};

class BorrowerFormCompanyInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    }
  }

  componentWillMount() {
    if (this.props.hashMissingKYCPart === '#bankStatements') {
      this.setState({currentStep: 1});
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleRequirementsModal= () => {
    this.setState({isOpenRequirementsModal: !this.state.isOpenRequirementsModal});
  };

  incrementStep = () => {
    this.saveCurrentProgress();
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  };

  saveCurrentProgress = () => {
    const {pristine, saveCurrentProgress} = this.props;

    if (!pristine) {
      saveCurrentProgress(false);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentStep !== prevState.currentStep && this.state.currentStep !== 0 ) {
      this.scrollchor.simulateClick();
    }

    if (this.props.valuesReduxForm && prevProps.valuesReduxForm && this.props.valuesReduxForm.country === 'GB' && prevProps.valuesReduxForm.country !== 'GB') {
      this.props.clearFields(formName, false, false, 'companyName', 'companyDescription', 'addressLine1', 'addressLine2', 'city', 'postcode')
    }
  }

  previous = (e) => {
    e.preventDefault();
    const {currentStep} = this.state;

    if (currentStep === 0) {
      return this.props.previousPage();
    }

    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1,
      });
    }
  };


  getCurrentScollTo = () => {
    let {currentStep} = this.state;
    let toScrollId;

    if (currentStep > 0) {
      toScrollId = '#bankStatements';
    }

    return toScrollId;
  };

  checkAccessToNext = () => {
    const {valuesReduxForm} = this.props;

    if (valuesReduxForm && valuesReduxForm.country === 'GB') {
      return valuesReduxForm.companyNumber &&
        valuesReduxForm.employeeNumber;
    }

    return valuesReduxForm &&
      valuesReduxForm.companyName &&
      valuesReduxForm.companyNumber &&
      valuesReduxForm.companyDescription &&
      valuesReduxForm.employeeNumber &&
      valuesReduxForm.country &&
      valuesReduxForm.addressLine1 &&
      valuesReduxForm.city &&
      valuesReduxForm.postcode;
  };

  shouldShow = () => {
    const { valuesReduxForm } = this.props;
    return valuesReduxForm && valuesReduxForm.country !== 'GB';
  }

  render() {
    const {handleSubmit, currentUser, onBack, className, onlyAccountConfirmation} = this.props;
    const {currentStep} = this.state;
    const isUploadedBankStatements = this.props.valuesReduxForm && this.props.valuesReduxForm.bankStatements &&
      this.props.valuesReduxForm.bankStatements.length;
    const isShow = this.shouldShow();
    
    return (
      <form className={`${className} form multi`} onSubmit={handleSubmit}>
        <H2 className="text-center m-b-30">
          Company
        </H2>

        <Row>
          <Col xs={12} md={3}>
            <Field name="country" component={renderCountrySelector}/>
          </Col>

          <Col xs={12} md={{size: 8, offset: 1}}>
            <Row>
              <Col md={4}>
                <Field
                  name="companyNumber"
                  type="text"
                  component={renderInputReactstrap}
                  label="Company Number"
                  placeholder={''}
                  tooltipContent={'Number assigned to your company by the institution that conducted its registration'}
                  tooltipStyle={{position: 'absolute', right: '10px', marginTop: '10px'}}
                  tooltipPlacement="top-end"
                />
              </Col>
              <Col md={8} style={{display: isShow ? '' : 'none'}}>
                <Field
                  name="companyName"
                  type="text"
                  component={renderInputReactstrap}
                  label="Company Name"
                  placeholder={''}
                />
              </Col>
              <Col md={4} style={{display: isShow ? 'none' : ''}}>
                <Field name="employeeNumber" component={renderEmployeeNumberSelector}/>
              </Col>
            </Row>
            <Row style={{display: isShow ? '' : 'none'}}>
              <Col md={4}>
                <Field name="employeeNumber" component={renderEmployeeNumberSelector}/>
              </Col>
              <Col md={8}>
                <Field
                  name="companyDescription"
                  type="textarea"
                  component={renderInputReactstrap}
                  label="Company Description"
                  placeholder={''}
                  style={{resize: 'none', height: '42px'}}
                />
              </Col>
            </Row>
            <Field
              name="addressLine1"
              type="text"
              component={renderInputReactstrap}
              label={isShow ? "Company Address" : ""}
              placeholder={'Building number and street'}
              className="m-b-0"
              style={{display: isShow ? '' : 'none'}}
            />
            <Field
              name="addressLine2"
              type="text"
              component={renderInputReactstrap}
              label=""
              placeholder={'Office, floor, etc.(optional)'}
              style={{display: isShow ? '' : 'none'}}
            />
            <Row  style={{display: isShow ? '' : 'none'}}>
              <Col md={8}>
                <Field
                  name="city"
                  type="text"
                  component={renderInputReactstrap}
                  label="City"
                  placeholder={''}
                />
              </Col>
              <Col md={4}>
                <Field
                  name="postcode"
                  type="text"
                  component={renderInputReactstrap}
                  label="Postcode"
                  placeholder={''}
                />
              </Col>
            </Row>
          </Col>
        </Row>


        <Row id="bankStatements" className='m-t-40' style={{display: currentStep > 0 ? 'flex' : 'none'}}>
          <Col xs={12} className="text-center">
            <P>Please upload the latest company's bank statement</P>
            <div>
              We recommend to read our <LinkText inline onClick={this.toggleRequirementsModal}>requirements to uploaded files</LinkText>
            </div>
            <div className="flex-row m-t-30 m-b-30 justify-content-center align-content-center">
              <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
                <img src="/img/icons/ico-info.png" alt="Info"
                     style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
              </div>
              <P className="m-b-0 text-left">
                Bank statement must: <br/>
                - be valid for the last three months. <br/>
                - clearly state your business name and your business address. <br/>
                - be combined into one file if containing multiple pages.<br/>
              </P>
            </div>
          </Col>

          <Col xs={{size: 12}} md={{size: 6, offset: 3}}>
            <Field
              name="bankStatements"
              component={renderDropzoneInput}
              acceptedFiles=".pdf, .jpg, .jpeg, .png"
              uploadFileTypeDesc=""
              maxSize={3000000}
              minSize={15000}
            />
            <div className="text-center confirmationBlock m-l-40 m-t-20">
              <Field
                name="onlyAccountConfirmation"
                label={'I confirm that there are no other accounts connected to this company.'}
                component={CustomCheckbox}
                checked={!!onlyAccountConfirmation}
              />
            </div>
          </Col>
        </Row>

        <Row className={`${this.props.className} p-t-40`}>
          <Col xs={12} className="m-b-40 text-center">
            {currentStep < 1 &&
            <PrimaryButton type="button" onClick={this.incrementStep} disabled={!this.checkAccessToNext()} >
              Done
            </PrimaryButton>
            }
          </Col>
          <Col xs={12} className="m-b-40 d-flex justify-content-center">
            <PrimaryButton outline block className="previous m-r-20" onClick={this.previous}>
              Previous
            </PrimaryButton>
            <PrimaryButton block type="submit" className="next p-t-20 p-b-20" disabled={!onlyAccountConfirmation || currentStep < 1
              || !this.checkAccessToNext() || !isUploadedBankStatements} onClick={this.saveCurrentProgress}>
              Next
            </PrimaryButton>
          </Col>

          {this.getCurrentScollTo() &&
            <Scrollchor ref={ref => (this.scrollchor = ref)} to={this.getCurrentScollTo()} />
          }
          <RequirementsModal isOpen={this.state.isOpenRequirementsModal} toggle={this.toggleRequirementsModal} />
        </Row>
      </form>
    );
  }
}

const StyledBorrowerFormCompanyInformation = styled(BorrowerFormCompanyInformation)`
  .confirmationBlock, .buttonsBlock{
    display: flex;
    justify-content: center;
  }

  .confirmationBlock{
    .custom-checkbox{
      margin-top: 10px;
    }
    label{
      text-align: left;
    }
  }
`;
const formName = 'kycwizard';
const selector = formValueSelector(formName);

BorrowerFormCompanyInformation = reduxForm({
  form: formName, // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: CompanyInformationValidateBorrower,
  enableReinitialize: true,
})(StyledBorrowerFormCompanyInformation);

// Ensure that the prop is NOT "initialValues"
// https://github.com/erikras/redux-form/issues/916
BorrowerFormCompanyInformation = connect((state, ownProps) => ({
  onlyAccountConfirmation: selector(state, 'onlyAccountConfirmation'),
}))(BorrowerFormCompanyInformation);

export default connect((state, ownProps) => ({
  initialValues: ownProps.initialValuesReduxForm,
}))(BorrowerFormCompanyInformation);
