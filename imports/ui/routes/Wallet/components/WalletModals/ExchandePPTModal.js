import React from 'react';
import {Modal, ModalHeader, ModalBody, Col, Row} from 'reactstrap';
import {DepositLog} from 'meteor/populous:api';
import PPTDepositForm from '../WalletForms/PPTDepositForm';
import Collateral from '../WalletForms/Collateral';


const ExchandePPTModal = ({
  showExchandePPTModal,
  toggleExchandePPTModal,
  currencies = [],
  wallet,
  availablePPT,
  availableUSDC,
  depositLedgerLogs
}) => {

  return (
    <Modal isOpen={showExchandePPTModal} toggle={toggleExchandePPTModal} className="custom" style={{maxWidth: 990}}>
      <ModalHeader toggle={toggleExchandePPTModal}>Exchange for pokens</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm={12} md={4}>
            <PPTDepositForm {...{
              currencies,
              toggleExchandePPTModal,
              wallet,
              availablePPT,
              availableUSDC,
            }}
            />
          </Col>
          <Col sm={12} md={8}>
            <Collateral {...{
              depositLedgerLogs,
              currencies,
              wallet,
            }}
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ExchandePPTModal;
