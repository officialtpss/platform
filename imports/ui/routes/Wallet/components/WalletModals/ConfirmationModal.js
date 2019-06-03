import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {repaymentBankDepositDetails} from 'meteor/populous:constants';

import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import { P, Small, LABEL } from '../../../../components/styled-components/Typography';
import printSlipRepaymentBankDetails from '../../../../components/printSlipRepaymentBankDetails';

const ConfirmationModal = ({
  showConfirmationModal, toggleConfirmationModal, currency, depositAmount, currentUser
}) => {

  const bankDepositDetails = repaymentBankDepositDetails[currency] || repaymentBankDepositDetails.GBP;

  return (
    <Modal isOpen={showConfirmationModal} toggle={toggleConfirmationModal} className="custom modal-lg">
      <ModalHeader toggle={() => toggleConfirmationModal(false)}>Deposit instruction slip</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={12}>
            Please use our credentials below to deposit funds to your "Populous account".
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={6} xs={12}>
            <Small className="m-b-5">GBP receiving account, United Kingdom</Small>
            <div className="border-row p-10 p-l-20 bottomless">
              <LABEL>Bank</LABEL>
              <p>{bankDepositDetails.bank}</p>
            </div>
            <div className="border-row p-10 p-l-20 bottomless">
              <LABEL>Beneficiary Name</LABEL>
              <p>Populous Platform, LTD</p>
            </div>
            <div className="d-flex flex-row">
              <Col md={4} className="border-row bottomless rightless">
                <div className="p-t-10 p-b-10" style={{paddingLeft: 5}}>
                  <LABEL>Sort Code</LABEL>
                  <p>{bankDepositDetails.bankCode}</p>
                </div>
              </Col>
              <Col md={8} className="border-row bottomless">
                <div className="p-t-10 p-b-10" style={{paddingLeft: 5}}>
                  <LABEL>Account Number</LABEL>
                  <p>{bankDepositDetails.accNum}</p>
                </div>
              </Col>
            </div>
            <div className="border-row p-10 p-l-20 bottomless">
              <LABEL>IBAN</LABEL>
              <p>{bankDepositDetails.IBAN}</p>
            </div>
            <div className="border-row p-10 p-l-20 bottomless">
              <LABEL>BIC</LABEL>
              <p>{bankDepositDetails.BIC}</p>
            </div>
            <div className="border-row p-10 p-l-20 bottomless">
              <LABEL>Payment Description</LABEL>
              <div>
                Reference: {currentUser._id}
              </div>
            </div>
            <div className="border-row text-right grey-bg">
              <P className="text-bold" style={{padding: '16px 22px'}}>Amount: {currency} {depositAmount}</P>
            </div>
          </Col>
          <Col lg={6} xs={12} className="d-flex justify-content-center align-content-center m-t-20">
            <div className="d-flex justify-content-center align-content-center flex-column">
              <P className="text-bold">Please note!</P>
              <ul className="timeline">
                <li>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">Only BACS and FPS (UK local bank) transfers in GBP can be accepted.
                  </div>
                </li>
                <li>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">Transfers must be made from a company bank account.</div>
                </li>
                <li>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">Transfers in other currencies will be automatically rejected.</div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-center align-content-center m-t-30">
          <PrimaryButton outline onClick={() => printSlipRepaymentBankDetails({
            currency,
            depositAmount,
            userReferenceId: currentUser._id
          })}><i className="fa fa-download fa-fw"></i>Download Version For
            Print</PrimaryButton>
        </div>
      </ModalBody>
    </Modal>
)};

export default ConfirmationModal;
