import React, {Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import {countries, statuses, employeeNumbers} from 'meteor/populous:constants';
import moment from 'moment';

import {ButtonLink} from '../../../components/styled-components/Buttons';
import {H3, P, Small, LABEL, LinkText, DangerText} from '../../../components/styled-components/Typography';
import checkTableValue from "./checkTableValue";
import RequirementsModal from "./RequirementsModal";
import {KYCProvideStatus, KYCVerifyStatus} from "./kycHelpers";

class CustomerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenRequirementsModal: false,
    };
  }

  toggleRequirementsModal= () => {
    this.setState({isOpenRequirementsModal: !this.state.isOpenRequirementsModal});
  };

  render() {
    const {currentUser: user, bankStatementDocuments, idDocuments, addressDocuments, livePhotoDocument} = this.props;


    let bankDocs = bankStatementDocuments.map((file, index) => <P className="blue" key={index}>{file.name}</P>);
    let idDocs = idDocuments.map((file, index) => <P className="blue" key={index}>{file.name}</P>);
    let photo = livePhotoDocument.map((file, index) => <P className="blue" key={index}>{file.name}</P>);
    let addressDocs = addressDocuments.map((file, index) => <P className="blue" key={index}>{file.name}</P>);
    const country = countries.filter((country) => country.key === user.country)[0];
    const residentalCountry = countries.filter((country) => country.key === user.residentalCountry)[0];

    return (
      <Fragment>
        <Row className="m-t-30">
          <Col xs={{size: 12, order: 2}} md={{size: 8, order: 1}} xl="9">
            <H3>Populous Customer Profile</H3>
            {
              (user.KYCStatus === statuses.unverified) &&
              <div className="d-flex m-t-40">
                <div>
                  <img src="/img/icons/ico-info-2.svg" alt="Info" className="m-r-10 m-t-10"/>
                </div>
                <div>
                  <div className="m-b-20">
                    We could not complete verification of the provided data
                  </div>
                  <div className="m-t-20 m-b-20">
                    Please ensure that provided data is correct and meet our
                    <LinkText inline onClick={this.toggleRequirementsModal}> requirements to uploaded files .</LinkText><br/>
                    Please contact us at <LinkText inline>info@populous.world</LinkText> if you continue facing issues.
                  </div>
                </div>
              </div>
            }
          </Col>
          <Col xs={{size: 12, order: 1}} md={{size: 4, order: 2}} xl="3">
            <Small className="m-b-15">Current profile data status:</Small>
            <Row>
              <Col xs="6" md="12">
                <P>
                  <KYCProvideStatus user={user}/>
                </P>
              </Col>

              <Col xs="6" md="12">
                <P>
                  <KYCVerifyStatus user={user}/>
                </P>
              </Col>

            </Row>
          </Col>
        </Row>
        {user.isBorrower() &&
        <Row className="table-row m-0">
          <Col className="title" xs={12}>
            <P>Company Information</P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Name</LABEL>
            <P>
              {checkTableValue(user.companyName)}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Number</LABEL>
            <P>
              {checkTableValue(user.companyNumber)}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Description</LABEL>
            <P>
              {checkTableValue(user.companyDescription)}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Number of Employees</LABEL>
            <P>
              {checkTableValue(Number.parseInt(user.employeeNumber), undefined,
                (value) => employeeNumbers[value],
                (checkValue) => typeof checkValue === 'number' && !Number.isNaN(checkValue)
              )
              }
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Company Address</LABEL>
            <P>
              {checkTableValue(user.addressLine1)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Office, floor, etc</LABEL>
            <P>
              {checkTableValue(user.addressLine2)}
            </P>
          </Col>
          <Col xs={8} sm={4}>
            <LABEL>City</LABEL>
            <P>
              {checkTableValue(user.city)}
            </P>
          </Col>
          <Col xs={4} sm={2} className="col-sep">
            <LABEL>Postal Code</LABEL>
            <P>
              {checkTableValue(user.postcode)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Country</LABEL>
            <P>
              {checkTableValue(country, undefined, value=>{
                return value.name;
              })}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Bank Statement</LABEL>
            <div>
              {checkTableValue(bankDocs)}
            </div>
          </Col>
          <Col className="title" xs={12}>
            <P>Trading volume</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Expected Monthly Volume</LABEL>
            <P>
              {checkTableValue(user.averageInvoiceVolume)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Expected Average Value</LABEL>
            <P>
              {checkTableValue(user.averageInvoiceValue)}
            </P>
          </Col>
          <Col className="title" xs={12}>
            <P>Company Contact Person</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>First Name</LABEL>
            <P>
              {checkTableValue(user.firstName)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Last Name</LABEL>
            <P>
              {checkTableValue(user.lastName)}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Title/Position</LABEL>
            <P>
              {checkTableValue(user.titlePosition)}
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Date of Birth</LABEL>
            <P>
              {checkTableValue(user.dateOfBirth, undefined, (value) => moment(value).format('DD/MM/YYYY'))}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Gender</LABEL>
            <P>
              {checkTableValue(user.gender)}
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Residental Address</LABEL>
            <P>
              {checkTableValue(user.residentalAddressLine1)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">

            <LABEL>Office, floor, etc</LABEL>
            <P>
              {checkTableValue(user.residentalAddressLine2)}
            </P>
          </Col>
          <Col xs={8} sm={4}>
            <LABEL>City</LABEL>
            <P>
              {checkTableValue(user.residentalCity)}
            </P>
          </Col>
          <Col xs={4} sm={2} className="col-sep">
            <LABEL>Postal Code</LABEL>
            <P>
              {checkTableValue(user.residentalPostcode)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Country</LABEL>
            <P>
              {checkTableValue(residentalCountry, undefined, value=>{
                return value.name;
              })}
            </P>
          </Col>
          {user.residentalCountry === 'CA' &&
          <Fragment>
            <Col xs={12} sm={6}>
              <LABEL>Social insurance number</LABEL>
              <P>
                {checkTableValue(user.socialInsuranceNumber)}
              </P>
            </Col>
            <Col xs={12} sm={6} className="col-sep">
              <LABEL>Passport</LABEL>
              <P>
                {checkTableValue(user.passport)}
              </P>
            </Col>
          </Fragment>
          }
          <Col xs={12}>
            <LABEL>Phone Number</LABEL>
            <P>
              {checkTableValue(user.phoneAreaCode + ' ' + user.phoneNumber, undefined, undefined, (value)=>{
                const codeAndNumber = value.split(' ');
                const isValidCode = codeAndNumber[0]!=='null' && codeAndNumber[0]!=='undefined';
                const isValidPhone = codeAndNumber[1]!=='null' && codeAndNumber[1]!=='undefined';

                return isValidCode && isValidPhone;
              })}
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>ID Document</LABEL>
            <P>{checkTableValue(user.idDocumentType)}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep p-t-30">
            <div>
              {checkTableValue(idDocs)}
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Address Proof Document</LABEL>
            <div>
              {checkTableValue(addressDocs)}
            </div>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Photo</LABEL>
            <div>
              {checkTableValue(photo)}
            </div>
          </Col>
        </Row>
        }
        {user.isInvestor() &&
        <Row className="table-row m-0">
          <Col className="title" xs={12}>
            <P>Company Information</P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Name</LABEL>
            <P>
              {checkTableValue(user.companyName)}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Company Number</LABEL>
            <P>
              {checkTableValue(user.companyNumber)}
            </P>
          </Col>
          <Col className="title" xs={12}>
            <P>Company contact person</P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>First Name</LABEL>
            <P>
              {checkTableValue(user.firstName)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Last Name</LABEL>
            <P>
              {checkTableValue(user.lastName)}
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Date of Birth</LABEL>
            <P>
              {checkTableValue(user.dateOfBirth, undefined, (value) => moment(user.dateOfBirth).format('DD/MM/YYYY'))}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Gender</LABEL>
            <P>
              {checkTableValue(user.gender)}
            </P>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Residental Address</LABEL>
            <P>
              {checkTableValue(user.residentalAddressLine1)}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Office, floor, etc</LABEL>
            <P>
              {checkTableValue(user.residentalAddressLine2)}
            </P>
          </Col>
          <Col xs={8} sm={4}>
            <LABEL>City</LABEL>
            <P>
              {checkTableValue(user.residentalCity)}
            </P>
          </Col>
          <Col xs={4} sm={2} className="col-sep">
            <LABEL>Postal Code</LABEL>
            <P>
              {checkTableValue(user.residentalPostcode, 'n/p')}
            </P>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Country</LABEL>
            <P>
              {checkTableValue(residentalCountry, undefined, value=>{
                return value.name;
              })}
            </P>
          </Col>
          <Col xs={12}>
            <LABEL>Phone Number</LABEL>
            <P>
              {checkTableValue(user.phoneAreaCode + ' ' + user.phoneNumber, undefined, undefined, (value)=>{
                const codeAndNumber = value.split(' ');
                const isValidCode = codeAndNumber[0]!=='null' && codeAndNumber[0]!=='undefined';
                const isValidPhone = codeAndNumber[1]!=='null' && codeAndNumber[1]!=='undefined';

                return isValidCode && isValidPhone;
              })}
            </P>
          </Col>
          {user.residentalCountry === 'CA' &&
          <Fragment>
            <Col xs={12} sm={6}>
              <LABEL>Social insurance number</LABEL>
              <P>
                {checkTableValue(user.socialInsuranceNumber)}
              </P>
            </Col>
            <Col xs={12} sm={6} className="col-sep">
              <LABEL>Passport</LABEL>
              <P>
                {checkTableValue(user.passport)}
              </P>
            </Col>
          </Fragment>
          }
          <Col xs={12} sm={6}>
            <LABEL>ID Document</LABEL>
            <P>{checkTableValue(user.idDocumentType)}</P>
          </Col>
          <Col xs={12} sm={6} className="col-sep p-t-30">
            <div>
              {checkTableValue(idDocs)}
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <LABEL>Address Proof Document</LABEL>
            <div>
              {checkTableValue(addressDocs)}
            </div>
          </Col>
          <Col xs={12} sm={6} className="col-sep">
            <LABEL>Photo</LABEL>
            <div>
              {checkTableValue(photo)}
            </div>
          </Col>
        </Row>
        }
        <Row className="m-t-30">
          <Col xs="12">
            {!user.isAbleToRequestKycVerification(true)
              ? <DangerText>
                Ability to request profile verification has been blocked. Please try tomorrow.
              </DangerText>
              : <ButtonLink to={'/update-profile'} className="m-t-10">Make changes and re-submit</ButtonLink>
            }
          </Col>
          {
            (user.KYCStatus == statuses.verified || user.KYCStatus == statuses.pending) &&
            <Col xs="12" md="10" xl="9">
              <div className="flex-row m-t-30 justify-content-center align-content-center">
                <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
                  <img src="/img/icons/ico-info.png" alt="Info"
                       style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
                </div>
                <P className="m-b-0">
                  If you make changes to your details, you should also provide updated documents where applicable.
                </P>
              </div>
            </Col>
          }
        </Row>

        <RequirementsModal isOpen={this.state.isOpenRequirementsModal} toggle={this.toggleRequirementsModal} />
      </Fragment>
    );
  }
}

export default CustomerProfile;
